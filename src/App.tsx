import { useState } from 'react';

import './App.css';
import { BattleScreen } from './components/BattleScreen';
import { DictionaryModal } from './components/DictionaryModal';
import { ENEMIES } from './data/enemies';
import { getSkillDefinition, rollSkillChoices, type SkillId } from './data/skills';
import { DEFAULT_PLAYER_MAX_HP } from './logic/battle';

export type ScreenState =
  | 'opening'
  | 'title'
  | 'battle'
  | 'stageClear'
  | 'skillSelect'
  | 'victory'
  | 'gameOver';

interface GameState {
  stage: number;
  playerHp: number;
  ownedSkills: SkillId[];
  usedWordCount: number;
  gameOverReason: string;
}

const openingText =
  'ことばの力が失われた王国。\n\n' +
  'モンスターたちは言葉を奪い、\n' +
  '世界は沈黙に包まれようとしていた。\n\n' +
  'あなたは、しりとりの力で戦う\n' +
  '最後のことば使い。\n\n' +
  '5体のモンスターを倒し、\n' +
  'ことばの王国を救え！';

const howToPlay = [
  'ひらがなで単語を入力する',
  '前の言葉の最後の文字から始める',
  '「ん」で終わると負け',
  '辞書にある単語だけ使える',
  '5体の敵を倒すとクリア',
];

function createNewGame(): GameState {
  return {
    stage: 1,
    playerHp: DEFAULT_PLAYER_MAX_HP,
    ownedSkills: [],
    usedWordCount: 0,
    gameOverReason: '',
  };
}

function OpeningScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <main className="app-screen opening-screen screen-fade" aria-labelledby="opening-heading">
      <div className="sky-decoration" aria-hidden="true">
        <span>☀️</span>
        <span>🏰</span>
        <span>✨</span>
      </div>

      <section className="story-panel">
        <p id="opening-heading" className="opening-text">
          {openingText}
        </p>
      </section>

      <div className="button-row">
        <button className="primary-button" type="button" onClick={onContinue}>
          はじめる
        </button>
        <button className="secondary-button" type="button" onClick={onContinue}>
          スキップ
        </button>
      </div>
    </main>
  );
}

function TitleScreen({ onStart }: { onStart: () => void }) {
  const [isDictionaryOpen, setIsDictionaryOpen] = useState(false);

  return (
    <main className="app-screen title-screen screen-fade" aria-labelledby="title-heading">
      <div className="title-crown" aria-hidden="true">
        📖⚔️
      </div>
      <h1 id="title-heading">ことばクエスト</h1>
      <p className="title-copy">
        しりとりでモンスターに立ち向かう、ことばの王国の小さな冒険。
      </p>

      <button className="primary-button start-button" type="button" onClick={onStart}>
        はじめから
      </button>

      <button className="secondary-button" type="button" onClick={() => setIsDictionaryOpen(true)}>
        📖 辞書を見る
      </button>

      <details className="how-to-play" open>
        <summary>あそびかた</summary>
        <ul>
          {howToPlay.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </details>

      <p className="credit">制作: ことばクエスト開発チーム / Emoji & CSS Edition</p>

      {isDictionaryOpen && <DictionaryModal onClose={() => setIsDictionaryOpen(false)} />}
    </main>
  );
}

const gameClearMessage =
  'ことばドラゴンを倒した！\n\n' +
  '王国にことばの力が戻り、\n' +
  '世界はふたたび声で満たされた。\n\n' +
  'あなたは伝説のことば使いとなった！';

function GameOverScreen({
  reason,
  reachedStage,
  usedWordCount,
  onPlayAgain,
  onBackToTitle,
}: {
  reason: string;
  reachedStage: number;
  usedWordCount: number;
  onPlayAgain: () => void;
  onBackToTitle: () => void;
}) {
  return (
    <main
      className="app-screen result-screen screen-fade"
      aria-labelledby="game-over-heading"
      data-testid="game-over-screen"
    >
      <h1 id="game-over-heading">ゲームオーバー</h1>
      <p className="title-copy" data-testid="game-over-reason">
        <strong>ゲームオーバー理由:</strong> {reason}
      </p>

      <dl className="result-stats" aria-label="ゲーム結果">
        <div>
          <dt>到達ステージ番号</dt>
          <dd data-testid="reached-stage">{reachedStage}</dd>
        </div>
        <div>
          <dt>使用した単語数</dt>
          <dd data-testid="used-word-count">{usedWordCount}</dd>
        </div>
      </dl>

      <div className="button-row">
        <button className="primary-button" type="button" onClick={onPlayAgain} data-testid="play-again-button">
          もう一度遊ぶ
        </button>
        <button className="secondary-button" type="button" onClick={onBackToTitle} data-testid="back-to-title-button">
          タイトルへ戻る
        </button>
      </div>
    </main>
  );
}

function GameClearScreen({
  usedWordCount,
  playerHp,
  ownedSkills,
  onPlayAgain,
  onBackToTitle,
}: {
  usedWordCount: number;
  playerHp: number;
  ownedSkills: SkillId[];
  onPlayAgain: () => void;
  onBackToTitle: () => void;
}) {
  return (
    <main
      className="app-screen result-screen screen-fade"
      aria-labelledby="game-clear-heading"
      data-testid="game-clear-screen"
    >
      <h1 id="game-clear-heading">ゲームクリア！</h1>
      <p className="title-copy result-message" data-testid="game-clear-message">{gameClearMessage}</p>

      <dl className="result-stats" aria-label="クリア結果">
        <div>
          <dt>使用した単語数</dt>
          <dd data-testid="clear-used-word-count">{usedWordCount}</dd>
        </div>
        <div>
          <dt>残りプレイヤーHP</dt>
          <dd data-testid="remaining-player-hp">{playerHp}</dd>
        </div>
      </dl>

      <section className="skills-panel result-skills" aria-label="取得したスキル一覧" data-testid="owned-skills-list">
        <h3>取得したスキル</h3>
        {ownedSkills.length === 0 ? (
          <p className="skills-empty">スキルは取得していない</p>
        ) : (
          <ul className="skills-list">
            {ownedSkills.map((skillId, index) => {
              const skill = getSkillDefinition(skillId);

              return (
                <li key={skillId + '-' + index} className="skill-chip">
                  <strong>{skill?.name ?? skillId}</strong>
                  {skill && <span>{skill.description}</span>}
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <div className="button-row">
        <button className="primary-button" type="button" onClick={onPlayAgain} data-testid="clear-play-again-button">
          もう一度遊ぶ
        </button>
        <button className="secondary-button" type="button" onClick={onBackToTitle} data-testid="clear-back-to-title-button">
          タイトルへ戻る
        </button>
      </div>
    </main>
  );
}

function StageClearScreen({
  enemyName,
  onContinue,
}: {
  enemyName: string;
  onContinue: () => void;
}) {
  return (
    <main className="app-screen result-screen screen-fade" aria-labelledby="stage-clear-heading">
      <h1 id="stage-clear-heading">ステージクリア！</h1>
      <p className="title-copy">{enemyName}を倒した！ことばの力が少し戻ってきた！</p>
      <button className="primary-button" type="button" onClick={onContinue}>
        スキルを選ぶ
      </button>
    </main>
  );
}

function SkillSelectScreen({
  ownedSkills,
  onAcquire,
  onNextStage,
}: {
  ownedSkills: SkillId[];
  onAcquire: (skillId: SkillId) => void;
  onNextStage: () => void;
}) {
  const [choices] = useState<SkillId[]>(() => rollSkillChoices());
  const [selectedSkill, setSelectedSkill] = useState<SkillId | null>(null);

  function handleSelect(skillId: SkillId) {
    if (selectedSkill) {
      return;
    }

    setSelectedSkill(skillId);
    onAcquire(skillId);
  }

  return (
    <main className="app-screen skill-select-screen screen-fade" aria-labelledby="skill-select-heading">
      <p className="stage-label">スキル獲得</p>
      <h1 id="skill-select-heading">力をひとつ選ぼう</h1>

      <section className="skill-choice-panel" aria-label="スキル候補">
        {choices.map((skillId) => {
          const skill = getSkillDefinition(skillId);
          const isSelected = selectedSkill === skillId;

          return (
            <button
              key={skillId}
              className={isSelected ? 'skill-choice skill-choice-selected' : 'skill-choice'}
              type="button"
              onClick={() => handleSelect(skillId)}
              disabled={selectedSkill !== null}
            >
              <strong>{skill?.name ?? skillId}</strong>
              <span>{skill?.description ?? ''}</span>
            </button>
          );
        })}
      </section>

      <section className="skills-panel skill-select-owned" aria-label="取得済みスキル一覧">
        <h3>取得済みスキル</h3>
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

      {selectedSkill && (
        <button className="primary-button start-button" type="button" onClick={onNextStage}>
          次のステージへ
        </button>
      )}
    </main>
  );
}

export default function App() {
  const [screen, setScreen] = useState<ScreenState>('opening');
  const [game, setGame] = useState<GameState>(() => createNewGame());

  function showTitle() {
    setScreen('title');
  }

  function startNewGame() {
    setGame(createNewGame());
    setScreen('battle');
  }

  function handleStageClear(playerHp: number, battleWordCount: number) {
    setGame((current) => ({
      ...current,
      playerHp,
      usedWordCount: current.usedWordCount + battleWordCount,
      gameOverReason: '',
    }));

    if (game.stage >= ENEMIES.length) {
      setScreen('victory');
    } else {
      setScreen('stageClear');
    }
  }

  function handleGameOver(reason: string, battleWordCount: number, playerHp: number) {
    setGame((current) => ({
      ...current,
      playerHp,
      usedWordCount: current.usedWordCount + battleWordCount,
      gameOverReason: reason,
    }));
    setScreen('gameOver');
  }

  function handleDefeat(battleWordCount: number) {
    setGame((current) => ({
      ...current,
      usedWordCount: current.usedWordCount + battleWordCount,
      gameOverReason: '「ん」で終わる単語を使った',
    }));
    setScreen('gameOver');
  }

  function advanceToNextStage() {
    setGame((current) => ({ ...current, stage: current.stage + 1 }));
    setScreen('battle');
  }

  function acquireSkill(skillId: SkillId) {
    setGame((current) => ({
      ...current,
      ownedSkills: [...current.ownedSkills, skillId],
    }));
  }

  if (screen === 'opening') {
    return <OpeningScreen onContinue={showTitle} />;
  }

  if (screen === 'title') {
    return <TitleScreen onStart={startNewGame} />;
  }

  if (screen === 'stageClear') {
    return (
      <StageClearScreen
        enemyName={ENEMIES[game.stage - 1].name}
        onContinue={() => setScreen('skillSelect')}
      />
    );
  }

  if (screen === 'skillSelect') {
    return (
      <SkillSelectScreen
        ownedSkills={game.ownedSkills}
        onAcquire={acquireSkill}
        onNextStage={advanceToNextStage}
      />
    );
  }

  if (screen === 'victory') {
    return (
      <GameClearScreen
        usedWordCount={game.usedWordCount}
        playerHp={game.playerHp}
        ownedSkills={game.ownedSkills}
        onPlayAgain={startNewGame}
        onBackToTitle={showTitle}
      />
    );
  }

  if (screen === 'gameOver') {
    return (
      <GameOverScreen
        reason={game.gameOverReason || 'HPが0になった'}
        reachedStage={game.stage}
        usedWordCount={game.usedWordCount}
        onPlayAgain={startNewGame}
        onBackToTitle={showTitle}
      />
    );
  }


  return (
    <BattleScreen
      key={game.stage}
      stage={game.stage}
      enemy={ENEMIES[game.stage - 1]}
      playerHp={game.playerHp}
      ownedSkills={game.ownedSkills}
      onStageClear={handleStageClear}
      onGameOver={handleGameOver}
      onDefeat={handleDefeat}
    />
  );
}
