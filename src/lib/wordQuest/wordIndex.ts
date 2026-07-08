import { normalizeKana } from './normalizeKana.ts';
import type { WordEntry } from '../../data/words/wordTypes.ts';

export type WordIndex = {
  byNormalized: Map<string, WordEntry>;
  byCategory: Map<string, WordEntry[]>;
  byFirstKana: Map<string, WordEntry[]>;
  byLastKana: Map<string, WordEntry[]>;
};

function pushMapValue(map: Map<string, WordEntry[]>, key: string, word: WordEntry): void {
  const entries = map.get(key);
  if (entries) {
    entries.push(word);
  } else {
    map.set(key, [word]);
  }
}

export function createWordIndex(words: readonly WordEntry[]): WordIndex {
  const index: WordIndex = {
    byNormalized: new Map(),
    byCategory: new Map(),
    byFirstKana: new Map(),
    byLastKana: new Map(),
  };

  for (const word of words) {
    if (word.reviewStatus !== 'approved') continue;

    index.byNormalized.set(word.normalized, word);
    pushMapValue(index.byFirstKana, word.kana.first, word);
    pushMapValue(index.byLastKana, word.kana.last, word);

    const categories = new Set([word.mainCategory, ...word.categories]);
    for (const category of categories) {
      pushMapValue(index.byCategory, category, word);
    }
  }

  return index;
}

export function getRegisteredWord(index: WordIndex, input: string): WordEntry | undefined {
  return index.byNormalized.get(normalizeKana(input));
}

export function isRegisteredWord(index: WordIndex, input: string): boolean {
  return getRegisteredWord(index, input) !== undefined;
}
