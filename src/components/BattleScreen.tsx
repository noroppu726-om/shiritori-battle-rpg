import { useMemo, useState, type FormEvent } from 'react';

import {
  computeSkillMods,
  createSkillBattleRuntime,
  getSkillDefinition,
  tryConsumeHirameki,
  type SkillId,
} from '../data/skills';
import { findWord } from '../data/words';
import { useTurnTimer } from '../hooks/useTurnTimer';
import {
  applyChanceDamage,
  applyEnemyAttack,
  applyPlayerAttack,
  applyTurnTimeout,
  createInitialBattleState,
  type BattleState,
} from '../logic/battle';
import { getLastChar, resolveEnemyTurn, validatePlayerWord, type ValidationReason } from '../logic/shiritori';
import type { Enemy } from '../types';
import { DictionaryModal } from './DictionaryModal';

interface HistoryEntry {
  speaker: 'player' | 'enemy';
  word: string;
}

export interface BattleScreenProps {
  stage: number;
  enemy: Enemy;
  playerHp?: number;
  ownedSkills?: SkillId[];
  /** enemy HP reaches 0 */
  onStageClear: (playerHp: number, usedWordCount: number) => void;
  /** player HP reaches 0 (from an enemy attack or a turn timeout) */
  onGameOver: (reason: string, usedWordCount: number, playerHp: number) => void;
  /** player's word validly ends with 'ん' */
  onDefeat: (usedWordCount: number) => void;
}

function errorMessageFor(reason: ValidationReason | undefined, lastChar: string | null): string {
  switch (reason) {
    case 'notHiragana':
      return 'ひらがなだけで入力してください';
    case 'notConnected':
      return lastChar ? `「${lastChar}」から始まる言葉を入力してください` : '言葉を入力してください';
    case 'alreadyUsed':
      return 'その言葉はもう使われています';
    case 'notInDict':
      return 'その言葉は辞書にありません';
    default:
      return '入力を確認してください';
  }
}

export function BattleScreen({
  stage,
  enemy,
  playerHp,
  ownedSkills = [],
  onStageClear,
  onGameOver,
  onDefeat,
}: BattleScreenProps) {
  const [battle, setBattle] = useState<BattleState>(() => createInitialBattleState(enemy, undefined, playerHp));
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [messages, setMessages] = useState<string[]>(['たたかいがはじまった！']);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [turnNumber, setTurnNumber] = useState(0);
  const [isOver, setIsOver] = useState(false);
  const [isDictionaryOpen, setIsDictionaryOpen] = useState(false);

  const skillMods = useMemo(() => computeSkillMods(ownedSkills), [ownedSkills]);
  const [skillRuntime] = useState(() => createSkillBattleRuntime(ownedSkills));

  const shiritoriState = useMemo(() => {
    const usedWords = new Set(history.map((entry) => entry.word));
    const lastChar = history.length > 0 ? getLastChar(history[history.length - 1].word) : null;
    return { lastChar, usedWords };
  }, [history]);

  const { remainingSeconds } = useTurnTimer({
    isPlayerTurn: !isOver,
    turnKey: turnNumber,
    isPaused: isDictionaryOpen,
    onBeforeTimeout: () => tryConsumeHirameki(skillRuntime),
    onTimeout: handleTimeout,
  });

  function handleTimeout() {
    if (isOver) {
      return;
    }

    const result = applyTurnTimeout(battle, enemy, { skills: skillMods });
    setBattle(result.state);
    setMessages(result.messages);
    setErrorMessage(null);
    setInput('');

    if (result.outcome === 'gameOver') {
      setIsOver(true);
      onGameOver('時間切れ', history.length, result.state.playerHp);
      return;
    }

    setTurnNumber((n) => n + 1);
  }

  function processWord(word: string) {
    const validation = validatePlayerWord(word, shiritoriState);

    if (!validation.ok) {
      if (validation.isGameOver) {
        setIsOver(true);
        setHistory([...history, { speaker: 'player', word }]);
        setMessages([`「${word}」は「ん」で終わってしまった…`]);
        onDefeat(history.length + 1);
        return;
      }

      setErrorMessage(errorMessageFor(validation.reason, shiritoriState.lastChar));
      return;
    }

    setErrorMessage(null);

    const entry = findWord(word);
    if (!entry) {
      // validatePlayerWord already checked the dictionary; this is unreachable in practice.
      return;
    }

    const playerResult = applyPlayerAttack(battle, entry, skillMods);
    const historyAfterPlayer: HistoryEntry[] = [...history, { speaker: 'player', word }];

    if (playerResult.outcome === 'stageClear') {
      setBattle(playerResult.state);
      setHistory(historyAfterPlayer);
      setMessages(playerResult.messages);
      setInput('');
      setIsOver(true);
      onStageClear(playerResult.state.playerHp, historyAfterPlayer.length);
      return;
    }

    const usedWordsAfterPlayer = new Set(shiritoriState.usedWords);
    usedWordsAfterPlayer.add(word);
    const enemyTurn = resolveEnemyTurn(getLastChar(word), usedWordsAfterPlayer);

    if (enemyTurn.type === 'stuck') {
      const chanceResult = applyChanceDamage(playerResult.state);
      setBattle(chanceResult.state);
      setHistory(historyAfterPlayer);
      setMessages([...playerResult.messages, ...chanceResult.messages]);
      setInput('');

      if (chanceResult.outcome === 'stageClear') {
        setIsOver(true);
        onStageClear(chanceResult.state.playerHp, historyAfterPlayer.length);
        return;
      }

      setTurnNumber((n) => n + 1);
      return;
    }

    const enemyResult = applyEnemyAttack(playerResult.state, enemy, enemyTurn.word, skillMods);
    const historyAfterEnemy: HistoryEntry[] = [...historyAfterPlayer, { speaker: 'enemy', word: enemyTurn.word }];

    setBattle(enemyResult.state);
    setHistory(historyAfterEnemy);
    setMessages([...playerResult.messages, ...enemyResult.messages]);
    setInput('');

    if (enemyResult.outcome === 'gameOver') {
      setIsOver(true);
      onGameOver('HPが0になった', historyAfterEnemy.length, enemyResult.state.playerHp);
      return;
    }

    setTurnNumber((n) => n + 1);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isOver) {
      return;
    }

    const word = input.trim();
    if (!word) {
      return;
    }

    processWord(word);
  }

  const enemyHpRatio = Math.max(0, battle.enemyHp) / battle.enemyMaxHp;
  const playerHpRatio = Math.max(0, battle.playerHp) / battle.playerMaxHp;
  const connectLetter = shiritoriState.lastChar;

  return (
    <main className="app-screen battle-screen screen-fade" aria-labelledby="battle-heading">
      <div className="battle-top-row">
        <p className="stage-label">ステージ {stage}</p>
        <button
          className="dictionary-open-button"
          type="button"
          onClick={() => setIsDictionaryOpen(true)}
          aria-label="辞書を見る"
        >
          📖 辞書
        </button>
      </div>
      <h1 id="battle-heading" className="visually-hidden">
        バトル画面
      </h1>

      <section className="battle-card" aria-label="敵の情報">
        <div className="enemy-icon" aria-hidden="true">
          {enemy.icon}
        </div>
        <div className="enemy-details">
          <h2>{enemy.name}</h2>
          <p>{enemy.description}</p>
          <div className="hp-row enemy-hp-row">
            <span className="hp-label">敵HP</span>
            <div className="hp-bar" role="progressbar" aria-valuenow={battle.enemyHp} aria-valuemin={0} aria-valuemax={battle.enemyMaxHp}>
              <div className="hp-bar-fill enemy-hp-fill" style={{ width: `${enemyHpRatio * 100}%` }} />
            </div>
            <strong className="hp-number">
              {battle.enemyHp}/{battle.enemyMaxHp}
            </strong>
          </div>
        </div>
      </section>

      <section className="hp-row player-hp-row" aria-label="プレイヤーのHP">
        <span className="hp-label">プレイヤーHP</span>
        <div className="hp-bar" role="progressbar" aria-valuenow={battle.playerHp} aria-valuemin={0} aria-valuemax={battle.playerMaxHp}>
          <div className="hp-bar-fill player-hp-fill" style={{ width: `${playerHpRatio * 100}%` }} />
        </div>
        <strong className="hp-number">
          {battle.playerHp}/{battle.playerMaxHp}
        </strong>
      </section>

      <section className="connect-letter-panel" aria-live="polite">
        {connectLetter ? (
          <p className="connect-letter">
            現在つなぐ文字：<span>{connectLetter}</span>
          </p>
        ) : (
          <p className="connect-letter">さいしょの言葉をどうぞ！</p>
        )}
      </section>

      <section className="timer-row" aria-label="残り時間">
        <span>残り時間</span>
        <strong className={remainingSeconds <= 5 ? 'timer-value timer-warning' : 'timer-value'}>
          {remainingSeconds}秒
        </strong>
      </section>

      <form className="input-row" onSubmit={handleSubmit}>
        <input
          className="input-field"
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="ひらがなで入力"
          aria-label="単語を入力"
          disabled={isOver}
        />
        <button className="submit-button" type="submit" disabled={isOver}>
          決定
        </button>
      </form>

      {errorMessage && (
        <p className="error-text" role="alert">
          {errorMessage}
        </p>
      )}

      <section className="message-panel" aria-live="polite" aria-label="直近の結果">
        {messages.map((message, index) => (
          <p key={`${index}-${message}`} className={index === 0 ? 'message-primary' : 'message-secondary'}>
            {message}
          </p>
        ))}
      </section>

      <section className="skills-panel" aria-label="所持スキル一覧">
        <h3>所持スキル</h3>
        {ownedSkills.length === 0 ? (
          <p className="skills-empty">スキルはまだ持っていない</p>
        ) : (
          <ul className="skills-list">
            {ownedSkills.map((skillId, index) => {
              const skill = getSkillDefinition(skillId);
              return (
                <li key={`${skillId}-${index}`} className="skill-chip">
                  <strong>{skill?.name ?? skillId}</strong>
                  {skill && <span>{skill.description}</span>}
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section className="history-panel" aria-label="使用済み単語">
        <h3>使用済み単語</h3>
        <ul className="history-list">
          {history.length === 0 && <li className="history-empty">まだ単語は使われていない</li>}
          {history.map((entry, index) => (
            <li key={`${index}-${entry.word}`} className={`history-item history-${entry.speaker}`}>
              <span className="history-speaker">{entry.speaker === 'player' ? 'あなた' : enemy.name}</span>
              <span className="history-word">{entry.word}</span>
            </li>
          ))}
        </ul>
      </section>

      {isDictionaryOpen && <DictionaryModal onClose={() => setIsDictionaryOpen(false)} />}
    </main>
  );
}
