import type { WordEntry } from '../../data/words/wordTypes.ts';

function unique(values: string[]): string[] {
  return [...new Set(values.filter((value) => value.trim() !== ''))];
}

export function generateHints(word: WordEntry, limit = 4): string[] {
  if (word.hints && word.hints.length > 0) {
    return word.hints.slice(0, limit);
  }

  const narrowCategory = word.categories.at(-1) ?? word.mainCategory;
  const factHints = word.facts.map((fact) => {
    if (fact.label.includes(narrowCategory)) return fact.label;
    return `${fact.label}${narrowCategory}`;
  });

  return unique([
    word.mainCategory,
    narrowCategory,
    ...factHints,
    `「${word.kana.first}」からはじまる`,
    `${word.kana.length}もじ`,
  ]).slice(0, limit);
}
