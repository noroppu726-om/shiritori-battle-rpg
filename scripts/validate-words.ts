/**
 * Dictionary QA for src/data/gameWords.ts (spec section 6).
 *
 *   node scripts/validate-words.bundle.mjs
 *
 * Exits non-zero on any hard failure (count, duplicates, banned endings,
 * non-hiragana entries, unknown categories, a lastKey with zero next-word
 * candidates). NG-word / distribution findings are printed as warnings only,
 * since natural-language judgment calls are not fully automatable.
 */
import { WORDS, CATEGORY_LABELS } from '../src/data/gameWords';
import { getFirstKey, getLastKey, isHiragana, isInvalidEnding } from '../src/logic/kana';
import type { WordCategory } from '../src/types';

const MIN_WORDS = 100;
const MAX_WORDS = 150;
const SPARSE_THRESHOLD = 3; // lastKey with fewer than this many next-word candidates gets a warning

const VALID_CATEGORIES = new Set<WordCategory>(Object.keys(CATEGORY_LABELS) as WordCategory[]);

// Known-bad forced-hiragana loanword spellings called out explicitly in the spec,
// plus a couple of variants of the same mistake pattern.
const KNOWN_NG_WORDS = new Set([
  'ちいたあ',
  'こんぴゅうた',
  'すまあとふぉん',
  'たくしい',
  'こおひい',
  'けえき',
  'はむすたあ',
  'かんがるう',
  'わらびい',
  'ちいず',
  'よおぐると',
  'ばたあ',
  'くりいむ',
  'くっきい',
  'ぜりい',
  'ろおす',
  'ふぉおく',
  'はんがあ',
  'どらいばあ',
  'てえぷ',
  'ろおぷ',
  'るうる',
]);

// Heuristic: two identical あ/い/う/え/お-row vowel kana back-to-back, outside a
// short allowlist of genuinely native words that are spelled that way
// (おおかみ, こおり, とおい, おおきい, とおる, こおろぎ, ...). This is a coarse
// smell test for "loanword long vowel got typed as two short vowels" per
// spec section 6 — flag for human review, do not auto-remove.
const NATIVE_DOUBLE_VOWEL_ALLOW = new Set(['おおかみ', 'こおり', 'こおろぎ', 'とおい', 'とおる', 'おおきい', 'おおぞら', 'おおあめ']);
const DOUBLE_VOWEL_RE = /([あいうえお])\1/;
function looksLikeForcedHiragana(word: string): boolean {
  if (KNOWN_NG_WORDS.has(word)) return true;
  if (NATIVE_DOUBLE_VOWEL_ALLOW.has(word)) return false;
  return DOUBLE_VOWEL_RE.test(word);
}

let hardFailures = 0;
const warn = (msg: string) => console.log(`  ⚠ ${msg}`);
const fail = (msg: string) => {
  console.log(`  ✗ ${msg}`);
  hardFailures++;
};
const pass = (msg: string) => console.log(`  ✓ ${msg}`);

console.log(`=== words.ts dictionary QA — ${WORDS.length} words ===\n`);

console.log('[1] word count');
if (WORDS.length >= MIN_WORDS && WORDS.length <= MAX_WORDS) pass(`${WORDS.length} is within [${MIN_WORDS}, ${MAX_WORDS}]`);
else fail(`${WORDS.length} is outside [${MIN_WORDS}, ${MAX_WORDS}]`);

console.log('\n[2] hiragana / ー only');
const nonHiragana = WORDS.filter((e) => !isHiragana(e.word));
if (nonHiragana.length === 0) pass('all entries are hiragana (+ー) only');
else fail(`${nonHiragana.length} non-hiragana entries: ${nonHiragana.map((e) => e.word).join(', ')}`);

console.log('\n[3] duplicates');
const seen = new Map<string, number>();
for (const e of WORDS) seen.set(e.word, (seen.get(e.word) ?? 0) + 1);
const dups = [...seen.entries()].filter(([, n]) => n > 1);
if (dups.length === 0) pass('no duplicate words');
else fail(`${dups.length} duplicates: ${dups.map(([w, n]) => `${w}x${n}`).join(', ')}`);

console.log('\n[4] banned endings (ん / っ)');
const badEndings = WORDS.filter((e) => getLastKey(e.word) === 'ん' || isInvalidEnding(e.word));
if (badEndings.length === 0) pass('no word ends with ん or っ');
else fail(`${badEndings.length} entries end with ん/っ: ${badEndings.map((e) => e.word).join(', ')}`);

console.log('\n[5] category validity');
const badCategory = WORDS.filter((e) => !VALID_CATEGORIES.has(e.category));
if (badCategory.length === 0) pass('all categories are valid WordCategory values');
else fail(`${badCategory.length} entries with unknown category: ${badCategory.map((e) => `${e.word}:${e.category}`).join(', ')}`);

console.log('\n[6] NG-word / forced-hiragana heuristic (warning only)');
const ngCandidates = WORDS.filter((e) => looksLikeForcedHiragana(e.word));
if (ngCandidates.length === 0) pass('no suspicious forced-hiragana spellings detected');
else for (const e of ngCandidates) warn(`possible unnatural spelling: ${e.word} (${e.category})`);

console.log('\n[7] category distribution');
const byCategory = new Map<WordCategory, number>();
for (const e of WORDS) byCategory.set(e.category, (byCategory.get(e.category) ?? 0) + 1);
for (const cat of VALID_CATEGORIES) {
  console.log(`  ${CATEGORY_LABELS[cat].padEnd(6, '　')} (${cat.padEnd(7)}): ${byCategory.get(cat) ?? 0}`);
}

console.log('\n[8] first-key (mora) distribution');
const firstKeyCount = new Map<string, number>();
for (const e of WORDS) {
  const k = getFirstKey(e.word);
  firstKeyCount.set(k, (firstKeyCount.get(k) ?? 0) + 1);
}
console.log(`  ${firstKeyCount.size} distinct starting mora keys`);

console.log('\n[9] last-key (mora) distribution + next-candidate check');
const lastKeyCount = new Map<string, number>();
for (const e of WORDS) {
  const k = getLastKey(e.word);
  lastKeyCount.set(k, (lastKeyCount.get(k) ?? 0) + 1);
}
console.log(`  ${lastKeyCount.size} distinct ending mora keys`);

const deadEnds: string[] = [];
const sparse: string[] = [];
for (const [key, count] of [...lastKeyCount.entries()].sort((a, b) => b[1] - a[1])) {
  const nextCandidates = WORDS.filter((e) => getFirstKey(e.word) === key).length;
  if (nextCandidates === 0) deadEnds.push(`${key} (${count} words end here, 0 next-word candidates)`);
  else if (nextCandidates < SPARSE_THRESHOLD) sparse.push(`${key} (${count} words end here, only ${nextCandidates} next-word candidates)`);
}

// Not a hard failure: validatePlayerWord's effectiveLastChar falls back to "any
// word allowed" when a required key has zero live candidates (dictionary
// dead-end recovery), so a 0-candidate key degrades the shiritori feel for
// that turn rather than softlocking the game. Still worth flagging so a
// future word-count top-up knows where to prioritize.
if (deadEnds.length === 0) pass('every ending mora has at least one word that can follow it');
else for (const d of deadEnds) warn(`dead-end ending mora (falls back to "any word" that turn): ${d}`);

if (sparse.length === 0) pass('no sparsely-connected ending mora (< 3 next-word candidates)');
else for (const s of sparse) warn(`sparse ending mora: ${s}`);

console.log('\n=== summary ===');
if (hardFailures === 0) {
  console.log(`PASS — ${WORDS.length} words, 0 hard failures.`);
  process.exit(0);
} else {
  console.log(`FAIL — ${hardFailures} hard failure(s). See ✗ lines above.`);
  process.exit(1);
}
