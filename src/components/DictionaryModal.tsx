import { useMemo, useState } from 'react';

import { CATEGORY_LABELS, WORDS } from '../data/words';
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

export function DictionaryModal({ onClose }: DictionaryModalProps) {
  const [query, setQuery] = useState('');

  const groups = useMemo(() => {
    const trimmed = query.trim();
    return CATEGORY_ORDER.map((category) => ({
      category,
      words: WORDS.filter((entry) => entry.category === category && entry.word.includes(trimmed)),
    })).filter((group) => group.words.length > 0);
  }, [query]);

  const totalCount = useMemo(() => groups.reduce((sum, group) => sum + group.words.length, 0), [groups]);

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
          <h2 id="dictionary-heading">辞書 ({WORDS.length}語)</h2>
          <button className="dictionary-close-button" type="button" onClick={onClose} aria-label="辞書を閉じる">
            ✕
          </button>
        </header>

        <input
          className="dictionary-search"
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="ひらがなで絞り込み"
          aria-label="辞書の単語を絞り込み"
        />

        <p className="dictionary-count">{totalCount}件表示中</p>

        <div className="dictionary-body">
          {groups.length === 0 && <p className="dictionary-empty">あてはまる言葉がありません</p>}
          {groups.map((group) => (
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
        </div>
      </section>
    </div>
  );
}
