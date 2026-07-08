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

/**
 * Small kana normalize to their full-size form for connecting, matching the
 * standard shiritori rule (e.g. じてんしゃ → や). No Japanese word begins with a
 * small kana, so without this a word ending in one is a dead end that soft-locks
 * the game.
 */
const SMALL_KANA_MAP: Record<string, string> = {
  ぁ: 'あ',
  ぃ: 'い',
  ぅ: 'う',
  ぇ: 'え',
  ぉ: 'お',
  ゃ: 'や',
  ゅ: 'ゆ',
  ょ: 'よ',
  っ: 'つ',
  ゎ: 'わ',
};

/** last character used for connecting; small kana are normalized to full size */
export function getLastChar(word: string): string {
  const raw = word.slice(-1);
  return SMALL_KANA_MAP[raw] ?? raw;
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
    return getWordsByInitial(getLastChar(entry.word)).some(
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
