import { findWord, getWordsByInitial } from '../data/words';

// U+3041(ぁ)-U+3093(ん) covers hiragana; U+30FC (ー, long vowel mark) is
// outside this range already, but is called out explicitly per spec.
const HIRAGANA_ONLY = /^[ぁ-ん]+$/;

export type ValidationReason =
  | 'notHiragana'
  | 'notInDict'
  | 'notConnected'
  | 'alreadyUsed'
  | 'endsWithN';

export interface ValidationResult {
  ok: boolean;
  reason?: ValidationReason;
  /** true when the invalid word should end the game (R4), not just be rejected for re-input */
  isGameOver?: boolean;
}

export interface ShiritoriState {
  /** last character to connect from; null means the game just started (any word allowed) */
  lastChar: string | null;
  usedWords: ReadonlySet<string>;
}

export type EnemyTurnResult =
  | { type: 'word'; word: string }
  | { type: 'stuck' };

/** R1: only hiragana words are allowed (no katakana/kanji/alphanumerics/symbols/long vowel mark) */
export function isHiragana(word: string): boolean {
  return HIRAGANA_ONLY.test(word) && !word.includes('ー');
}

/** MVP rule: last character is simply the final character of the string */
export function getLastChar(word: string): string {
  return word.slice(-1);
}

/** R2: word must start with the previous word's last character; no previous char means anything goes */
export function isConnected(word: string, lastChar: string | null): boolean {
  if (lastChar === null) {
    return true;
  }
  return word.charAt(0) === lastChar;
}

/** R3: word must not already be in the used-words set (player + enemy combined) */
export function isWordUsed(word: string, usedWords: ReadonlySet<string>): boolean {
  return usedWords.has(word);
}

/** existing dictionary lookup */
export function isInDictionary(word: string): boolean {
  return findWord(word) !== undefined;
}

/** R4: word ends with 'ん' */
export function endsWithN(word: string): boolean {
  return getLastChar(word) === 'ん';
}

/**
 * Validates a player's submitted word against all rules in order.
 * Only a word that is otherwise valid and ends with 'ん' is a game-over;
 * all other failures are treated as re-enterable input errors.
 */
export function validatePlayerWord(word: string, state: ShiritoriState): ValidationResult {
  if (!isHiragana(word)) {
    return { ok: false, reason: 'notHiragana' };
  }
  if (!isConnected(word, state.lastChar)) {
    return { ok: false, reason: 'notConnected' };
  }
  if (isWordUsed(word, state.usedWords)) {
    return { ok: false, reason: 'alreadyUsed' };
  }
  if (!isInDictionary(word)) {
    return { ok: false, reason: 'notInDict' };
  }
  if (endsWithN(word)) {
    return { ok: false, reason: 'endsWithN', isGameOver: true };
  }
  return { ok: true };
}

/** R6: pick a random valid reply for the enemy, or null if none exists (R7) */
export function pickEnemyWord(startChar: string, usedWords: ReadonlySet<string>): string | null {
  const candidates = getWordsByInitial(startChar).filter(
    (entry) => !usedWords.has(entry.word) && !endsWithN(entry.word),
  );

  if (candidates.length === 0) {
    return null;
  }

  const index = Math.floor(Math.random() * candidates.length);
  return candidates[index].word;
}

/**
 * R7: wraps pickEnemyWord so callers can branch on a stuck enemy without
 * halting the battle loop (show "chance damage" message, then return to
 * the player's turn).
 */
export function resolveEnemyTurn(startChar: string, usedWords: ReadonlySet<string>): EnemyTurnResult {
  const word = pickEnemyWord(startChar, usedWords);
  return word ? { type: 'word', word } : { type: 'stuck' };
}
