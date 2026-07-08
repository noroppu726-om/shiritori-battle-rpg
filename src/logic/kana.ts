/**
 * Pure hiragana/mora utilities shared by the shiritori rules and the word
 * dictionary. Kept dependency-free (no import of ../data/words) so that
 * src/data/words.ts can use getFirstKey to index its lookup table without
 * creating a circular import with src/logic/shiritori.ts.
 */

// U+3041(ぁ)-U+3093(ん) covers hiragana. The long vowel mark 'ー' (U+30FC) is
// outside this range and is allowed explicitly (natural gairaigo spelling,
// e.g. かれー、こーひー、けーき).
const HIRAGANA_OR_CHOON = /^[ぁ-ん](?:[ぁ-ん]|ー)*$/;

/** small kana that combine with the preceding kana to form a single mora (拗音) */
const SMALL_YOON = new Set(['ゃ', 'ゅ', 'ょ']);

/** small kana with no youon role, normalized to their full-size reading for connecting */
const SMALL_TO_FULL: Record<string, string> = {
  ぁ: 'あ',
  ぃ: 'い',
  ぅ: 'う',
  ぇ: 'え',
  ぉ: 'お',
  ゎ: 'わ',
};

/** R1: word must be hiragana, optionally with the long vowel mark 'ー' (never leading) */
export function isHiragana(word: string): boolean {
  return HIRAGANA_OR_CHOON.test(word);
}

/**
 * Small 'っ' cannot end a real word and has no natural "next mora" to chain
 * from, so words ending in it are excluded from the dictionary and rejected
 * as input even if someone manages to type one.
 */
export function isInvalidEnding(word: string): boolean {
  return word.charAt(word.length - 1) === 'っ';
}

/**
 * The mora used to *start* a shiritori chain from this word: the first
 * character, or the first two characters when the second is a small
 * ゃ/ゅ/ょ (e.g. しゃもじ -> "しゃ", not "し").
 */
export function getFirstKey(word: string): string {
  const first = word.charAt(0);
  const second = word.charAt(1);
  if (second !== '' && SMALL_YOON.has(second)) {
    return first + second;
  }
  return first;
}

/**
 * The mora the *next* word must start with. Not a naive last-character
 * lookup:
 *  - a trailing long vowel mark 'ー' is dropped in favor of the mora before
 *    it (かれー -> "れ", こーひー -> "ひ", たくしー -> "し")
 *  - a trailing small ゃ/ゅ/ょ combines with the kana before it into one
 *    mora (おもちゃ -> "ちゃ", でんしゃ -> "しゃ", ちゅうしゃ -> "しゃ")
 *  - other small kana (ぁぃぅぇぉゎ) normalize to full size, matching
 *    standard shiritori play
 */
export function getLastKey(word: string): string {
  let end = word.length;
  if (end > 1 && word.charAt(end - 1) === 'ー') {
    end -= 1;
  }

  const ch = word.charAt(end - 1);
  if (end > 1 && SMALL_YOON.has(ch)) {
    return word.charAt(end - 2) + ch;
  }
  return SMALL_TO_FULL[ch] ?? ch;
}

/**
 * Trims surrounding whitespace and applies Unicode NFKC normalization, which
 * folds full-/half-width variants (e.g. half-width 'ｰ' -> 'ー') to a single
 * canonical form. Katakana is intentionally left untouched: this game does
 * not auto-convert katakana input to hiragana, so a katakana word simply
 * fails the isHiragana check and is reported as an invalid word, the same
 * as any other non-hiragana input.
 */
export function normalizeWordInput(input: string): string {
  return input.trim().normalize('NFKC');
}
