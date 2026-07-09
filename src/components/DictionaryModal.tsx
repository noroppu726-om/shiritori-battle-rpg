import { useMemo, useState } from 'react';

import { approvedQuestWords } from '../data/words/questDictionary';
import type { WordEntry as QuestWordEntry } from '../data/words/wordTypes';

export interface DictionaryModalProps {
  onClose: () => void;
}

const CATEGORY_ORDER = [
  'どうぶつ',
  'むし・みずのいきもの',
  'たべもの',
  'のみもの',
  'のりもの',
  'どうぐ',
  'いえ・くらし',
  'がっこう',
  'まち・しせつ',
  'しぜん',
  'しょくぶつ',
  'てんき・きせつ',
  'からだ',
  'きもち',
  'うごき・アクション',
  'あそび',
  'スポーツ',
  'おんがく',
  'ふく・もちもの',
  'しごと・ひと',
  'いろ・かたち',
  'ぎょうじ・イベント',
  'ファンタジー・ものがたり',
  'カタカナ語',
  'そのた日常語',
];

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

  const filteredWords = useMemo(() => {
    const trimmed = query.trim();
    return approvedQuestWords.filter((entry) => matchesQuestQuery(entry, trimmed));
  }, [query]);

  const groups = useMemo(() => {
    return CATEGORY_ORDER.map((category) => ({
      category,
      words: filteredWords.filter((entry) => entry.mainCategory === category || entry.categories.includes(category)),
    })).filter((group) => group.words.length > 0);
  }, [filteredWords]);

  const totalCount = filteredWords.length;

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
          <h2 id="dictionary-heading">ゲーム辞書 ({approvedQuestWords.length}語)</h2>
          <button className="dictionary-close-button" type="button" onClick={onClose} aria-label="辞書を閉じる">
            ×
          </button>
        </header>

        <input
          className="dictionary-search"
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="単語・カテゴリ・ヒントで絞り込み"
          aria-label="辞書の単語を絞り込み"
        />

        <p className="dictionary-count">{totalCount}件表示中</p>

        <div className="dictionary-body">
          {groups.length === 0 && <p className="dictionary-empty">あてはまる言葉がありません</p>}
          {groups.map((group) => (
            <div className="dictionary-category" key={group.category}>
              <h3>
                {group.category} ({group.words.length})
              </h3>
              <ul className="dictionary-word-list">
                {group.words.map((entry) => (
                  <li className="dictionary-word-chip" key={entry.id}>
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
