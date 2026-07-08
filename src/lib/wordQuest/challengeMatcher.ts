import type { AnswerPoolBand, Challenge, WordEntry } from '../../data/words/wordTypes.ts';

function hasCategory(word: WordEntry, category: string): boolean {
  return word.mainCategory === category || word.categories.includes(category);
}

function hasFact(word: WordEntry, fact: { key: string; value: string }): boolean {
  return word.facts.some((wordFact) => wordFact.key === fact.key && wordFact.value === fact.value);
}

export function matchesChallenge(word: WordEntry, challenge: Challenge): boolean {
  const { categories, facts, kana } = challenge.conditions;

  if (word.reviewStatus !== 'approved') return false;
  if (categories?.some((category) => !hasCategory(word, category))) return false;
  if (facts?.some((fact) => !hasFact(word, fact))) return false;
  if (kana?.first !== undefined && word.kana.first !== kana.first) return false;
  if (kana?.last !== undefined && word.kana.last !== kana.last) return false;
  if (kana?.length !== undefined && word.kana.length !== kana.length) return false;

  return true;
}

export function getChallengeAnswers(words: readonly WordEntry[], challenge: Challenge): WordEntry[] {
  return words.filter((word) => matchesChallenge(word, challenge));
}

export function getAnswerPoolBand(answerCount: number): AnswerPoolBand {
  if (answerCount >= 300) return 'very_large';
  if (answerCount >= 100) return 'large';
  if (answerCount >= 30) return 'medium';
  if (answerCount >= 10) return 'small';
  return 'tiny';
}

export function withAnswerCount(challenge: Challenge, words: readonly WordEntry[]): Challenge {
  const answerCount = getChallengeAnswers(words, challenge).length;
  return {
    ...challenge,
    answerCount,
    answerPoolBand: getAnswerPoolBand(answerCount),
  };
}
