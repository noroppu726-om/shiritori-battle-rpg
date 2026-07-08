// src/logic/kana.ts
var HIRAGANA_OR_CHOON = /^[ぁ-ん](?:[ぁ-ん]|ー)*$/;
var SMALL_YOON = /* @__PURE__ */ new Set(["\u3083", "\u3085", "\u3087"]);
var SMALL_TO_FULL = {
  \u3041: "\u3042",
  \u3043: "\u3044",
  \u3045: "\u3046",
  \u3047: "\u3048",
  \u3049: "\u304A",
  \u308E: "\u308F"
};
function isHiragana(word) {
  return HIRAGANA_OR_CHOON.test(word);
}
function isInvalidEnding(word) {
  return word.charAt(word.length - 1) === "\u3063";
}
function getFirstKey(word) {
  const first = word.charAt(0);
  const second = word.charAt(1);
  if (second !== "" && SMALL_YOON.has(second)) {
    return first + second;
  }
  return first;
}
function getLastKey(word) {
  let end = word.length;
  if (end > 1 && word.charAt(end - 1) === "\u30FC") {
    end -= 1;
  }
  const ch = word.charAt(end - 1);
  if (end > 1 && SMALL_YOON.has(ch)) {
    return word.charAt(end - 2) + ch;
  }
  return SMALL_TO_FULL[ch] ?? ch;
}

// src/data/words.ts
var CATEGORY_LABELS = {
  animal: "\u3069\u3046\u3076\u3064",
  food: "\u305F\u3079\u3082\u306E",
  nature: "\u3057\u305C\u3093",
  tool: "\u3069\u3046\u3050",
  place: "\u3070\u3057\u3087",
  body: "\u304B\u3089\u3060",
  emotion: "\u304D\u3082\u3061",
  life: "\u305B\u3044\u304B\u3064",
  normal: "\u3075\u3064\u3046"
};
var WORDS = [
  // animal (20)
  { word: "\u306D\u3053", category: "animal" },
  { word: "\u3044\u306C", category: "animal" },
  { word: "\u3046\u3055\u304E", category: "animal" },
  { word: "\u304D\u3064\u306D", category: "animal" },
  { word: "\u305F\u306C\u304D", category: "animal" },
  { word: "\u305E\u3046", category: "animal" },
  { word: "\u3068\u3089", category: "animal" },
  { word: "\u304F\u307E", category: "animal" },
  { word: "\u3055\u308B", category: "animal" },
  { word: "\u3046\u307E", category: "animal" },
  { word: "\u3046\u3057", category: "animal" },
  { word: "\u3076\u305F", category: "animal" },
  { word: "\u3068\u308A", category: "animal" },
  { word: "\u3055\u304B\u306A", category: "animal" },
  { word: "\u304B\u3081", category: "animal" },
  { word: "\u3078\u3073", category: "animal" },
  { word: "\u304B\u3048\u308B", category: "animal" },
  { word: "\u304F\u3058\u3089", category: "animal" },
  { word: "\u3044\u308B\u304B", category: "animal" },
  { word: "\u3071\u3093\u3060", category: "animal" },
  // food (20)
  { word: "\u308A\u3093\u3054", category: "food" },
  { word: "\u304B\u304D", category: "food" },
  { word: "\u3044\u3061\u3054", category: "food" },
  { word: "\u3059\u3044\u304B", category: "food" },
  { word: "\u3082\u3082", category: "food" },
  { word: "\u3076\u3069\u3046", category: "food" },
  { word: "\u3070\u306A\u306A", category: "food" },
  { word: "\u305F\u307E\u3054", category: "food" },
  { word: "\u3068\u3046\u3075", category: "food" },
  { word: "\u304A\u306B\u304E\u308A", category: "food" },
  { word: "\u3084\u3055\u3044", category: "food" },
  { word: "\u304B\u307C\u3061\u3083", category: "food" },
  { word: "\u305F\u307E\u306D\u304E", category: "food" },
  { word: "\u306D\u304E", category: "food" },
  { word: "\u306A\u3059", category: "food" },
  { word: "\u3061\u30FC\u305A", category: "food" },
  { word: "\u3051\u30FC\u304D", category: "food" },
  { word: "\u304B\u308C\u30FC", category: "food" },
  { word: "\u3053\u30FC\u3072\u30FC", category: "food" },
  { word: "\u3071\u3059\u305F", category: "food" },
  // nature (20)
  { word: "\u3084\u307E", category: "nature" },
  { word: "\u304B\u308F", category: "nature" },
  { word: "\u3046\u307F", category: "nature" },
  { word: "\u305D\u3089", category: "nature" },
  { word: "\u3082\u308A", category: "nature" },
  { word: "\u3044\u3051", category: "nature" },
  { word: "\u306F\u306A", category: "nature" },
  { word: "\u304F\u3055", category: "nature" },
  { word: "\u3042\u3081", category: "nature" },
  { word: "\u3086\u304D", category: "nature" },
  { word: "\u304B\u305C", category: "nature" },
  { word: "\u3064\u304D", category: "nature" },
  { word: "\u307B\u3057", category: "nature" },
  { word: "\u306B\u3058", category: "nature" },
  { word: "\u3044\u308F", category: "nature" },
  { word: "\u3044\u3057", category: "nature" },
  { word: "\u3059\u306A", category: "nature" },
  { word: "\u3055\u304F\u3089", category: "nature" },
  { word: "\u305F\u3044\u3088\u3046", category: "nature" },
  { word: "\u307F\u305A", category: "nature" },
  // tool (18)
  { word: "\u304B\u3055", category: "tool" },
  { word: "\u306F\u3055\u307F", category: "tool" },
  { word: "\u3048\u3093\u3074\u3064", category: "tool" },
  { word: "\u3064\u304F\u3048", category: "tool" },
  { word: "\u3044\u3059", category: "tool" },
  { word: "\u304B\u304C\u307F", category: "tool" },
  { word: "\u3068\u3051\u3044", category: "tool" },
  { word: "\u3067\u3093\u308F", category: "tool" },
  { word: "\u304F\u308B\u307E", category: "tool" },
  { word: "\u3075\u306D", category: "tool" },
  { word: "\u306A\u3079", category: "tool" },
  { word: "\u3055\u3089", category: "tool" },
  { word: "\u307E\u304F\u3089", category: "tool" },
  { word: "\u304F\u3064", category: "tool" },
  { word: "\u3081\u304C\u306D", category: "tool" },
  { word: "\u305F\u304F\u3057\u30FC", category: "tool" },
  { word: "\u3067\u3093\u3057\u3083", category: "tool" },
  { word: "\u306E\u30FC\u3068", category: "tool" },
  // emotion (18)
  { word: "\u3048\u304C\u304A", category: "emotion" },
  { word: "\u3088\u308D\u3053\u3073", category: "emotion" },
  { word: "\u304B\u306A\u3057\u307F", category: "emotion" },
  { word: "\u3044\u304B\u308A", category: "emotion" },
  { word: "\u305F\u306E\u3057\u307F", category: "emotion" },
  { word: "\u3057\u3042\u308F\u305B", category: "emotion" },
  { word: "\u304D\u307C\u3046", category: "emotion" },
  { word: "\u3086\u3046\u304D", category: "emotion" },
  { word: "\u3069\u304D\u3069\u304D", category: "emotion" },
  { word: "\u308F\u304F\u308F\u304F", category: "emotion" },
  { word: "\u3059\u304D", category: "emotion" },
  { word: "\u304D\u3089\u3044", category: "emotion" },
  { word: "\u3052\u3093\u304D", category: "emotion" },
  { word: "\u3057\u3093\u3071\u3044", category: "emotion" },
  { word: "\u3068\u304F\u3044", category: "emotion" },
  { word: "\u306B\u304C\u3066", category: "emotion" },
  { word: "\u304D\u3093\u3061\u3087\u3046", category: "emotion" },
  { word: "\u3046\u308C\u3057\u3055", category: "emotion" },
  // normal (18)
  { word: "\u304D\u3087\u3046", category: "normal" },
  { word: "\u3042\u3057\u305F", category: "normal" },
  { word: "\u306A\u307E\u3048", category: "normal" },
  { word: "\u3053\u3068\u3070", category: "normal" },
  { word: "\u3066\u304C\u307F", category: "normal" },
  { word: "\u3072\u307F\u3064", category: "normal" },
  { word: "\u305F\u304B\u3089", category: "normal" },
  { word: "\u306A\u304B\u307E", category: "normal" },
  { word: "\u307F\u3061", category: "normal" },
  { word: "\u3044\u308D", category: "normal" },
  { word: "\u304B\u305A", category: "normal" },
  { word: "\u3082\u3058", category: "normal" },
  { word: "\u3048", category: "normal" },
  { word: "\u3068\u304D", category: "normal" },
  { word: "\u3072\u3068", category: "normal" },
  { word: "\u3053\u3069\u3082", category: "normal" },
  { word: "\u3068\u3082\u3060\u3061", category: "normal" },
  { word: "\u304B\u305E\u304F", category: "normal" },
  // place (6) — kept small for future boss-gimmick category prep (see project notes)
  { word: "\u3044\u3048", category: "place" },
  { word: "\u3078\u3084", category: "place" },
  { word: "\u307E\u3061", category: "place" },
  { word: "\u304C\u3063\u3053\u3046", category: "place" },
  { word: "\u3048\u304D", category: "place" },
  { word: "\u307F\u305B", category: "place" },
  // body (6)
  { word: "\u3066", category: "body" },
  { word: "\u3042\u3057", category: "body" },
  { word: "\u3081", category: "body" },
  { word: "\u307F\u307F", category: "body" },
  { word: "\u304F\u3061", category: "body" },
  { word: "\u3053\u3053\u308D", category: "body" },
  // life (6)
  { word: "\u3042\u3055", category: "life" },
  { word: "\u3072\u308B", category: "life" },
  { word: "\u3088\u308B", category: "life" },
  { word: "\u307E\u3064\u308A", category: "life" },
  { word: "\u3042\u305D\u3073", category: "life" },
  { word: "\u3086\u3081", category: "life" }
];
var WORD_INDEX = new Map(WORDS.map((entry) => [entry.word, entry]));
var WORDS_BY_INITIAL = /* @__PURE__ */ new Map();
for (const entry of WORDS) {
  const initial = getFirstKey(entry.word);
  const candidates = WORDS_BY_INITIAL.get(initial);
  if (candidates) {
    candidates.push(entry);
  } else {
    WORDS_BY_INITIAL.set(initial, [entry]);
  }
}

// scripts/validate-words.ts
var MIN_WORDS = 100;
var MAX_WORDS = 150;
var SPARSE_THRESHOLD = 3;
var VALID_CATEGORIES = new Set(Object.keys(CATEGORY_LABELS));
var KNOWN_NG_WORDS = /* @__PURE__ */ new Set([
  "\u3061\u3044\u305F\u3042",
  "\u3053\u3093\u3074\u3085\u3046\u305F",
  "\u3059\u307E\u3042\u3068\u3075\u3049\u3093",
  "\u305F\u304F\u3057\u3044",
  "\u3053\u304A\u3072\u3044",
  "\u3051\u3048\u304D",
  "\u306F\u3080\u3059\u305F\u3042",
  "\u304B\u3093\u304C\u308B\u3046",
  "\u308F\u3089\u3073\u3044",
  "\u3061\u3044\u305A",
  "\u3088\u304A\u3050\u308B\u3068",
  "\u3070\u305F\u3042",
  "\u304F\u308A\u3044\u3080",
  "\u304F\u3063\u304D\u3044",
  "\u305C\u308A\u3044",
  "\u308D\u304A\u3059",
  "\u3075\u3049\u304A\u304F",
  "\u306F\u3093\u304C\u3042",
  "\u3069\u3089\u3044\u3070\u3042",
  "\u3066\u3048\u3077",
  "\u308D\u304A\u3077",
  "\u308B\u3046\u308B"
]);
var NATIVE_DOUBLE_VOWEL_ALLOW = /* @__PURE__ */ new Set(["\u304A\u304A\u304B\u307F", "\u3053\u304A\u308A", "\u3053\u304A\u308D\u304E", "\u3068\u304A\u3044", "\u3068\u304A\u308B", "\u304A\u304A\u304D\u3044", "\u304A\u304A\u305E\u3089", "\u304A\u304A\u3042\u3081"]);
var DOUBLE_VOWEL_RE = /([あいうえお])\1/;
function looksLikeForcedHiragana(word) {
  if (KNOWN_NG_WORDS.has(word)) return true;
  if (NATIVE_DOUBLE_VOWEL_ALLOW.has(word)) return false;
  return DOUBLE_VOWEL_RE.test(word);
}
var hardFailures = 0;
var warn = (msg) => console.log(`  \u26A0 ${msg}`);
var fail = (msg) => {
  console.log(`  \u2717 ${msg}`);
  hardFailures++;
};
var pass = (msg) => console.log(`  \u2713 ${msg}`);
console.log(`=== words.ts dictionary QA \u2014 ${WORDS.length} words ===
`);
console.log("[1] word count");
if (WORDS.length >= MIN_WORDS && WORDS.length <= MAX_WORDS) pass(`${WORDS.length} is within [${MIN_WORDS}, ${MAX_WORDS}]`);
else fail(`${WORDS.length} is outside [${MIN_WORDS}, ${MAX_WORDS}]`);
console.log("\n[2] hiragana / \u30FC only");
var nonHiragana = WORDS.filter((e) => !isHiragana(e.word));
if (nonHiragana.length === 0) pass("all entries are hiragana (+\u30FC) only");
else fail(`${nonHiragana.length} non-hiragana entries: ${nonHiragana.map((e) => e.word).join(", ")}`);
console.log("\n[3] duplicates");
var seen = /* @__PURE__ */ new Map();
for (const e of WORDS) seen.set(e.word, (seen.get(e.word) ?? 0) + 1);
var dups = [...seen.entries()].filter(([, n]) => n > 1);
if (dups.length === 0) pass("no duplicate words");
else fail(`${dups.length} duplicates: ${dups.map(([w, n]) => `${w}x${n}`).join(", ")}`);
console.log("\n[4] banned endings (\u3093 / \u3063)");
var badEndings = WORDS.filter((e) => getLastKey(e.word) === "\u3093" || isInvalidEnding(e.word));
if (badEndings.length === 0) pass("no word ends with \u3093 or \u3063");
else fail(`${badEndings.length} entries end with \u3093/\u3063: ${badEndings.map((e) => e.word).join(", ")}`);
console.log("\n[5] category validity");
var badCategory = WORDS.filter((e) => !VALID_CATEGORIES.has(e.category));
if (badCategory.length === 0) pass("all categories are valid WordCategory values");
else fail(`${badCategory.length} entries with unknown category: ${badCategory.map((e) => `${e.word}:${e.category}`).join(", ")}`);
console.log("\n[6] NG-word / forced-hiragana heuristic (warning only)");
var ngCandidates = WORDS.filter((e) => looksLikeForcedHiragana(e.word));
if (ngCandidates.length === 0) pass("no suspicious forced-hiragana spellings detected");
else for (const e of ngCandidates) warn(`possible unnatural spelling: ${e.word} (${e.category})`);
console.log("\n[7] category distribution");
var byCategory = /* @__PURE__ */ new Map();
for (const e of WORDS) byCategory.set(e.category, (byCategory.get(e.category) ?? 0) + 1);
for (const cat of VALID_CATEGORIES) {
  console.log(`  ${CATEGORY_LABELS[cat].padEnd(6, "\u3000")} (${cat.padEnd(7)}): ${byCategory.get(cat) ?? 0}`);
}
console.log("\n[8] first-key (mora) distribution");
var firstKeyCount = /* @__PURE__ */ new Map();
for (const e of WORDS) {
  const k = getFirstKey(e.word);
  firstKeyCount.set(k, (firstKeyCount.get(k) ?? 0) + 1);
}
console.log(`  ${firstKeyCount.size} distinct starting mora keys`);
console.log("\n[9] last-key (mora) distribution + next-candidate check");
var lastKeyCount = /* @__PURE__ */ new Map();
for (const e of WORDS) {
  const k = getLastKey(e.word);
  lastKeyCount.set(k, (lastKeyCount.get(k) ?? 0) + 1);
}
console.log(`  ${lastKeyCount.size} distinct ending mora keys`);
var deadEnds = [];
var sparse = [];
for (const [key, count] of [...lastKeyCount.entries()].sort((a, b) => b[1] - a[1])) {
  const nextCandidates = WORDS.filter((e) => getFirstKey(e.word) === key).length;
  if (nextCandidates === 0) deadEnds.push(`${key} (${count} words end here, 0 next-word candidates)`);
  else if (nextCandidates < SPARSE_THRESHOLD) sparse.push(`${key} (${count} words end here, only ${nextCandidates} next-word candidates)`);
}
if (deadEnds.length === 0) pass("every ending mora has at least one word that can follow it");
else for (const d of deadEnds) warn(`dead-end ending mora (falls back to "any word" that turn): ${d}`);
if (sparse.length === 0) pass("no sparsely-connected ending mora (< 3 next-word candidates)");
else for (const s of sparse) warn(`sparse ending mora: ${s}`);
console.log("\n=== summary ===");
if (hardFailures === 0) {
  console.log(`PASS \u2014 ${WORDS.length} words, 0 hard failures.`);
  process.exit(0);
} else {
  console.log(`FAIL \u2014 ${hardFailures} hard failure(s). See \u2717 lines above.`);
  process.exit(1);
}
