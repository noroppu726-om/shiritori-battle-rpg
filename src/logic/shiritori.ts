import { findWord, getWordsByInitial } from '../data/words';
import { getFirstKey, getLastKey, isHiragana, isInvalidEnding, normalizeWordInput } from './kana';

export { getFirstKey, getLastKey, isHiragana, isInvalidEnding, normalizeWordInput };

export type ValidationReason =
  | 'notHiragana'
  | 'invalidEnding'
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
  /** mora key to connect from (1 or 2 chars, see getLastKey); null means the game just started (any word allowed) */
  lastChar: string | null;
  usedWords: ReadonlySet<string>;
}

export type EnemyTurnResult =
  | { type: 'word'; word: string }
  | { type: 'stuck' };

/** R2: word's first mora must match the previous word's connecting key; no previous key means anything goes */
export function isConnected(word: string, lastKey: string | null): boolean {
  if (lastKey === null) {
    return true;
  }
  return getFirstKey(word) === lastKey;
}

/** whether nextWord may legally follow prevWord in a shiritori chain, ignoring dictionary/used-word state */
export function canConnect(prevWord: string, nextWord: string): boolean {
  return getFirstKey(nextWord) === getLastKey(prevWord);
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
  return getLastKey(word) === 'ん';
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
  if (isInvalidEnding(word)) {
    return { ok: false, reason: 'invalidEnding' };
  }

  const effectiveLastChar =
    state.lastChar &&
    getWordsByInitial(state.lastChar).some(
      (entry) => !state.usedWords.has(entry.word) && !endsWithN(entry.word),
    )
      ? state.lastChar
      : null;

  if (!isConnected(word, effectiveLastChar)) {
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

/**
 * R6: pick a random valid reply for the enemy, or null if none exists (R7).
 * Prefer replies that still leave the player at least one legal follow-up, so
 * a normal playthrough cannot be ended by an unavoidable dictionary dead end.
 */
export function pickEnemyWord(startChar: string, usedWords: ReadonlySet<string>): string | null {
  const candidates = getWordsByInitial(startChar).filter(
    (entry) => !usedWords.has(entry.word) && !endsWithN(entry.word),
  );

  if (candidates.length === 0) {
    return null;
  }

  const playableCandidates = candidates.filter((entry) => {
    const usedAfterReply = new Set(usedWords);
    usedAfterReply.add(entry.word);
    return getWordsByInitial(getLastKey(entry.word)).some(
      (nextEntry) => !usedAfterReply.has(nextEntry.word) && !endsWithN(nextEntry.word),
    );
  });
  const pool = playableCandidates.length > 0 ? playableCandidates : candidates;
  const index = Math.floor(Math.random() * pool.length);
  return pool[index].word;
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
