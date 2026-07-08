import { useMemo, useState } from 'react';

import { CATEGORY_LABELS, WORDS } from '../data/gameWords';
import { approvedQuestWords } from '../data/words/questDictionary';
import type { WordEntry as QuestWordEntry } from '../data/words/wordTypes';
import type { WordCategory } from '../types';

export interface DictionaryModalProps {
  onClose: () => void;
}

const CATEGORY_ORDER: WordCategory[] = [
  'animal',
  'food',
  'nature',
  'tool',
  'place',
  'body',
  'emotion',
  'life',
  'normal',
];

type DictionaryMode = 'game' | 'registered';

function matchesQuestQuery(entry: QuestWordEntry, query: string): boolean {
  if (query === '') return true;

  return [
    entry.word,
    entry.reading,
    entry.normalized,
    entry.mainCategory,
    ...entry.categories,
    ...entry.facts.flatMap((fact) => [fact.key, fact.value, fact.label]),
    ...(entry.hints ?? []),
  ].some((value) => value.includes(query));
}

export function DictionaryModal({ onClose }: DictionaryModalProps) {
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState<DictionaryMode>('game');

  const gameGroups = useMemo(() => {
    const trimmed = query.trim();
    return CATEGORY_ORDER.map((category) => ({
      category,
      words: WORDS.filter((entry) => entry.category === category && entry.word.includes(trimmed)),
    })).filter((group) => group.words.length > 0);
  }, [query]);

  const registeredGroups = useMemo(() => {
    const trimmed = query.trim();
    const grouped = new Map<string, QuestWordEntry[]>();

    for (const entry of approvedQuestWords) {
      if (!matchesQuestQuery(entry, trimmed)) continue;
      const words = grouped.get(entry.mainCategory);
      if (words) {
        words.push(entry);
      } else {
        grouped.set(entry.mainCategory, [entry]);
      }
    }

    return [...grouped.entries()].map(([category, words]) => ({ category, words }));
  }, [query]);

  const gameTotalCount = useMemo(() => gameGroups.reduce((sum, group) => sum + group.words.length, 0), [gameGroups]);
  const registeredTotalCount = useMemo(
    () => registeredGroups.reduce((sum, group) => sum + group.words.length, 0),
    [registeredGroups],
  );
  const totalCount = mode === 'game' ? gameTotalCount : registeredTotalCount;

  return (
    <div className="dictionary-overlay" role="presentation" onClick={onClose}>
      <section
        className="dictionary-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dictionary-heading"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="dictionary-header">
          <h2 id="dictionary-heading">
            {mode === 'game' ? `辞書 (${WORDS.length}語)` : `登録辞書 (${approvedQuestWords.length}語)`}
          </h2>
          <button className="dictionary-close-button" type="button" onClick={onClose} aria-label="辞書を閉じる">
            ×
          </button>
        </header>

        <div className="dictionary-tabs" role="tablist" aria-label="辞書の種類">
          <button
            className={mode === 'game' ? 'dictionary-tab dictionary-tab-active' : 'dictionary-tab'}
            type="button"
            role="tab"
            aria-selected={mode === 'game'}
            onClick={() => setMode('game')}
          >
            ゲーム辞書
          </button>
          <button
            className={mode === 'registered' ? 'dictionary-tab dictionary-tab-active' : 'dictionary-tab'}
            type="button"
            role="tab"
            aria-selected={mode === 'registered'}
            onClick={() => setMode('registered')}
          >
            登録辞書
          </button>
        </div>

        <input
          className="dictionary-search"
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={mode === 'game' ? 'ひらがなで絞り込み' : '単語・カテゴリ・factで絞り込み'}
          aria-label="辞書の単語を絞り込み"
        />

        <p className="dictionary-count">{totalCount}件表示中</p>

        <div className="dictionary-body">
          {mode === 'game' ? (
            <>
              {gameGroups.length === 0 && <p className="dictionary-empty">あてはまる言葉がありません</p>}
              {gameGroups.map((group) => (
                <div className="dictionary-category" key={group.category}>
                  <h3>
                    {CATEGORY_LABELS[group.category]} ({group.words.length})
                  </h3>
                  <ul className="dictionary-word-list">
                    {group.words.map((entry) => (
                      <li className="dictionary-word-chip" key={entry.word}>
                        {entry.word}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </>
          ) : (
            <>
              {registeredGroups.length === 0 && <p className="dictionary-empty">あてはまる登録語がありません</p>}
              {registeredGroups.map((group) => (
                <div className="dictionary-category" key={group.category}>
                  <h3>
                    {group.category} ({group.words.length})
                  </h3>
                  <ul className="registered-word-list">
                    {group.words.map((entry) => (
                      <li className="registered-word-item" key={entry.id}>
                        <div className="registered-word-main">
                          <strong>{entry.word}</strong>
                          <span>{entry.reading}</span>
                        </div>
                        <div className="registered-word-meta">
                          {entry.categories.map((category) => (
                            <span key={category}>{category}</span>
                          ))}
                        </div>
                        {entry.facts.length > 0 && (
                          <dl className="registered-word-facts">
                            {entry.facts.map((fact) => (
                              <div key={`${entry.id}-${fact.key}-${fact.value}`}>
                                <dt>{fact.key}</dt>
                                <dd>{fact.label}</dd>
                              </div>
                            ))}
                          </dl>
                        )}
                        {entry.hints && entry.hints.length > 0 && (
                          <p className="registered-word-hints">ヒント: {entry.hints.join(' / ')}</p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
