// src/data/enemies.ts
var STAGE_1_ENEMY = {
  name: "\u3053\u3068\u3070\u30B9\u30E9\u30A4\u30E0",
  maxHp: 20,
  attack: 3,
  description: "\u6700\u521D\u306B\u51FA\u4F1A\u3046\u5C0F\u3055\u306A\u3053\u3068\u3070\u30E2\u30F3\u30B9\u30BF\u30FC",
  icon: "\u{1F7E2}"
};
var ENEMIES = [
  STAGE_1_ENEMY,
  {
    name: "\u3082\u3058\u30B4\u30D6\u30EA\u30F3",
    maxHp: 30,
    attack: 4,
    description: "\u77ED\u3044\u8A00\u8449\u3067\u653B\u3081\u3066\u304F\u308B\u3044\u305F\u305A\u3089\u597D\u304D",
    icon: "\u{1F47A}"
  },
  {
    name: "\u304B\u306A\u30C9\u30E9\u30AD\u30FC",
    maxHp: 40,
    attack: 5,
    description: "\u7A7A\u304B\u3089\u8A00\u8449\u3092\u596A\u3046\u3059\u3070\u3057\u3063\u3053\u3044\u6575",
    icon: "\u{1F987}"
  },
  {
    name: "\u3057\u308A\u3068\u308A\u30CA\u30A4\u30C8",
    maxHp: 55,
    attack: 6,
    description: "\u3057\u308A\u3068\u308A\u306E\u639F\u3092\u5B88\u308B\u5F37\u6575",
    icon: "\u{1F6E1}\uFE0F"
  },
  {
    name: "\u3053\u3068\u3070\u30C9\u30E9\u30B4\u30F3",
    maxHp: 75,
    attack: 8,
    description: "\u3053\u3068\u3070\u306E\u738B\u56FD\u3092\u6C88\u9ED9\u3055\u305B\u305F\u6700\u5F8C\u306E\u30DC\u30B9",
    icon: "\u{1F409}"
  }
];

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
var WORDS = [
  // animal
  { word: "\u306D\u3053", category: "animal" },
  { word: "\u3044\u306C", category: "animal" },
  { word: "\u3046\u3055\u304E", category: "animal" },
  { word: "\u304D\u3064\u306D", category: "animal" },
  { word: "\u305F\u306C\u304D", category: "animal" },
  { word: "\u3053\u3042\u3089", category: "animal" },
  { word: "\u3089\u304F\u3060", category: "animal" },
  { word: "\u3054\u308A\u3089", category: "animal" },
  { word: "\u3057\u307E\u3046\u307E", category: "animal" },
  { word: "\u304B\u3048\u308B", category: "animal" },
  { word: "\u3068\u304B\u3052", category: "animal" },
  { word: "\u304F\u3058\u3089", category: "animal" },
  { word: "\u3044\u308B\u304B", category: "animal" },
  { word: "\u3081\u3060\u304B", category: "animal" },
  { word: "\u3072\u3064\u3058", category: "animal" },
  { word: "\u3084\u304E", category: "animal" },
  { word: "\u3059\u305A\u3081", category: "animal" },
  { word: "\u3064\u3070\u3081", category: "animal" },
  { word: "\u3042\u308A", category: "animal" },
  { word: "\u307B\u305F\u308B", category: "animal" },
  { word: "\u308D\u3070", category: "animal" },
  { word: "\u3046\u307E", category: "animal" },
  { word: "\u3046\u3057", category: "animal" },
  { word: "\u3076\u305F", category: "animal" },
  { word: "\u306B\u308F\u3068\u308A", category: "animal" },
  { word: "\u304B\u3082", category: "animal" },
  { word: "\u3042\u3072\u308B", category: "animal" },
  { word: "\u304B\u3089\u3059", category: "animal" },
  { word: "\u306F\u3068", category: "animal" },
  { word: "\u308F\u3057", category: "animal" },
  { word: "\u305F\u304B", category: "animal" },
  { word: "\u3075\u304F\u308D\u3046", category: "animal" },
  { word: "\u304B\u3082\u3081", category: "animal" },
  { word: "\u3055\u304E", category: "animal" },
  { word: "\u3064\u308B", category: "animal" },
  { word: "\u304D\u3058", category: "animal" },
  { word: "\u3046\u3050\u3044\u3059", category: "animal" },
  { word: "\u3072\u3070\u308A", category: "animal" },
  { word: "\u3068\u3093\u3073", category: "animal" },
  { word: "\u3053\u3046\u3082\u308A", category: "animal" },
  { word: "\u306D\u305A\u307F", category: "animal" },
  { word: "\u308A\u3059", category: "animal" },
  { word: "\u3057\u304B", category: "animal" },
  { word: "\u304F\u307E", category: "animal" },
  { word: "\u3055\u308B", category: "animal" },
  { word: "\u3044\u306E\u3057\u3057", category: "animal" },
  { word: "\u304A\u304A\u304B\u307F", category: "animal" },
  { word: "\u3044\u305F\u3061", category: "animal" },
  { word: "\u304B\u308F\u3046\u305D", category: "animal" },
  { word: "\u3042\u3089\u3044\u3050\u307E", category: "animal" },
  { word: "\u306F\u3080\u3059\u305F\u30FC", category: "animal" },
  { word: "\u3082\u308B\u3082\u3063\u3068", category: "animal" },
  { word: "\u3082\u3050\u3089", category: "animal" },
  { word: "\u306F\u308A\u306D\u305A\u307F", category: "animal" },
  { word: "\u304B\u3070", category: "animal" },
  { word: "\u3055\u3044", category: "animal" },
  { word: "\u305E\u3046", category: "animal" },
  { word: "\u3072\u3087\u3046", category: "animal" },
  { word: "\u3068\u3089", category: "animal" },
  { word: "\u3061\u30FC\u305F\u30FC", category: "animal" },
  { word: "\u3084\u307E\u3042\u3089\u3057", category: "animal" },
  { word: "\u304A\u3053\u3058\u3087", category: "animal" },
  { word: "\u306A\u307E\u3051\u3082\u306E", category: "animal" },
  { word: "\u3042\u308B\u3071\u304B", category: "animal" },
  { word: "\u304B\u3093\u304C\u308B\u30FC", category: "animal" },
  { word: "\u308F\u3089\u3073\u30FC", category: "animal" },
  { word: "\u304A\u3063\u3068\u305B\u3044", category: "animal" },
  { word: "\u3042\u3056\u3089\u3057", category: "animal" },
  { word: "\u3042\u3057\u304B", category: "animal" },
  { word: "\u3089\u3063\u3053", category: "animal" },
  { word: "\u304B\u3082\u306E\u306F\u3057", category: "animal" },
  { word: "\u306F\u304F\u3061\u3087\u3046", category: "animal" },
  { word: "\u3042\u307E\u304C\u3048\u308B", category: "animal" },
  { word: "\u3044\u3082\u308A", category: "animal" },
  { word: "\u3084\u3082\u308A", category: "animal" },
  { word: "\u3078\u3073", category: "animal" },
  { word: "\u308F\u306B", category: "animal" },
  { word: "\u304B\u3081", category: "animal" },
  { word: "\u3048\u3073", category: "animal" },
  { word: "\u304B\u306B", category: "animal" },
  { word: "\u3044\u304B", category: "animal" },
  { word: "\u305F\u3053", category: "animal" },
  { word: "\u3042\u3055\u308A", category: "animal" },
  { word: "\u3057\u3058\u307F", category: "animal" },
  { word: "\u304F\u3089\u3052", category: "animal" },
  { word: "\u3072\u3068\u3067", category: "animal" },
  { word: "\u3046\u306B", category: "animal" },
  { word: "\u3055\u3093\u3054", category: "animal" },
  { word: "\u306E\u307F", category: "animal" },
  { word: "\u3057\u3089\u307F", category: "animal" },
  { word: "\u3060\u306B", category: "animal" },
  { word: "\u304B", category: "animal" },
  { word: "\u306F\u3048", category: "animal" },
  { word: "\u3042\u3076", category: "animal" },
  { word: "\u306F\u3061", category: "animal" },
  { word: "\u305B\u307F", category: "animal" },
  { word: "\u3070\u3063\u305F", category: "animal" },
  { word: "\u3053\u304A\u308D\u304E", category: "animal" },
  { word: "\u304B\u307E\u304D\u308A", category: "animal" },
  { word: "\u3068\u3093\u307C", category: "animal" },
  { word: "\u3061\u3087\u3046", category: "animal" },
  { word: "\u304C", category: "animal" },
  { word: "\u3042\u3052\u306F", category: "animal" },
  { word: "\u3057\u3058\u3085\u3046\u304B\u3089", category: "animal" },
  { word: "\u3081\u3058\u308D", category: "animal" },
  { word: "\u3055\u304B\u306A", category: "animal" },
  { word: "\u3071\u3093\u3060", category: "animal" },
  { word: "\u3075\u3050", category: "animal" },
  { word: "\u3055\u3081", category: "animal" },
  { word: "\u3075\u306A", category: "animal" },
  { word: "\u3069\u3058\u3087\u3046", category: "animal" },
  { word: "\u306A\u307E\u305A", category: "animal" },
  { word: "\u3068\u3069", category: "animal" },
  { word: "\u3044\u3050\u3042\u306A", category: "animal" },
  { word: "\u3066\u3093\u3068\u3046\u3080\u3057", category: "animal" },
  { word: "\u3042\u3081\u3093\u307C", category: "animal" },
  { word: "\u304F\u308F\u304C\u305F", category: "animal" },
  { word: "\u304B\u3076\u3068\u3080\u3057", category: "animal" },
  { word: "\u304D\u3093\u304E\u3087", category: "animal" },
  { word: "\u3072\u3088\u3053", category: "animal" },
  { word: "\u3068\u308A", category: "animal" },
  { word: "\u3080\u3057", category: "animal" },
  { word: "\u3084\u3054", category: "animal" },
  { word: "\u3044\u3093\u3053", category: "animal" },
  { word: "\u304A\u3046\u3080", category: "animal" },
  { word: "\u3053\u307E\u3069\u308A", category: "animal" },
  { word: "\u3058\u3085\u3046\u3057\u307E\u3064", category: "animal" },
  // food
  { word: "\u308A\u3093\u3054", category: "food" },
  { word: "\u304B\u304D", category: "food" },
  { word: "\u3044\u3061\u3054", category: "food" },
  { word: "\u3059\u3044\u304B", category: "food" },
  { word: "\u3082\u3082", category: "food" },
  { word: "\u306A\u3057", category: "food" },
  { word: "\u3076\u3069\u3046", category: "food" },
  { word: "\u3070\u306A\u306A", category: "food" },
  { word: "\u305F\u307E\u3054", category: "food" },
  { word: "\u3068\u3046\u3075", category: "food" },
  { word: "\u304A\u3053\u3081", category: "food" },
  { word: "\u304A\u3059\u3057", category: "food" },
  { word: "\u305D\u3070", category: "food" },
  { word: "\u3082\u3061", category: "food" },
  { word: "\u304A\u306B\u304E\u308A", category: "food" },
  { word: "\u305B\u3093\u3079\u3044", category: "food" },
  { word: "\u308C\u305F\u3059", category: "food" },
  { word: "\u304D\u3085\u3046\u308A", category: "food" },
  { word: "\u3068\u307E\u3068", category: "food" },
  { word: "\u3057\u3044\u305F\u3051", category: "food" },
  { word: "\u304E\u3085\u3046\u306B\u3085\u3046", category: "food" },
  { word: "\u3079\u3093\u3068\u3046", category: "food" },
  { word: "\u3073\u308F", category: "food" },
  { word: "\u307F\u305D", category: "food" },
  { word: "\u3057\u3087\u3046\u3086", category: "food" },
  { word: "\u3057\u304A", category: "food" },
  { word: "\u3055\u3068\u3046", category: "food" },
  { word: "\u3059", category: "food" },
  { word: "\u3042\u3076\u3089", category: "food" },
  { word: "\u3054\u307E", category: "food" },
  { word: "\u306E\u308A", category: "food" },
  { word: "\u308F\u304B\u3081", category: "food" },
  { word: "\u3053\u3093\u3076", category: "food" },
  { word: "\u3072\u3058\u304D", category: "food" },
  { word: "\u3060\u3044\u305A", category: "food" },
  { word: "\u3042\u305A\u304D", category: "food" },
  { word: "\u3048\u3060\u307E\u3081", category: "food" },
  { word: "\u306A\u3063\u3068\u3046", category: "food" },
  { word: "\u304A\u304B\u3086", category: "food" },
  { word: "\u305E\u3046\u3059\u3044", category: "food" },
  { word: "\u3061\u3083\u3065\u3051", category: "food" },
  { word: "\u307F\u305D\u3057\u308B", category: "food" },
  { word: "\u3059\u304D\u3084\u304D", category: "food" },
  { word: "\u3057\u3083\u3076\u3057\u3083\u3076", category: "food" },
  { word: "\u3066\u3093\u3077\u3089", category: "food" },
  { word: "\u304B\u3089\u3042\u3052", category: "food" },
  { word: "\u3084\u304D\u3068\u308A", category: "food" },
  { word: "\u3055\u3057\u307F", category: "food" },
  { word: "\u306B\u3082\u306E", category: "food" },
  { word: "\u3064\u3051\u3082\u306E", category: "food" },
  { word: "\u3084\u3055\u3044", category: "food" },
  { word: "\u304F\u3060\u3082\u306E", category: "food" },
  { word: "\u3054\u307C\u3046", category: "food" },
  { word: "\u304B\u307C\u3061\u3083", category: "food" },
  { word: "\u3058\u3083\u304C\u3044\u3082", category: "food" },
  { word: "\u3055\u3064\u307E\u3044\u3082", category: "food" },
  { word: "\u3055\u3068\u3044\u3082", category: "food" },
  { word: "\u306A\u304C\u3044\u3082", category: "food" },
  { word: "\u3084\u307E\u3044\u3082", category: "food" },
  { word: "\u305F\u307E\u306D\u304E", category: "food" },
  { word: "\u306D\u304E", category: "food" },
  { word: "\u306A\u3059", category: "food" },
  { word: "\u304D\u3083\u3079\u3064", category: "food" },
  { word: "\u306F\u304F\u3055\u3044", category: "food" },
  { word: "\u3053\u307E\u3064\u306A", category: "food" },
  { word: "\u307B\u3046\u308C\u3093\u305D\u3046", category: "food" },
  { word: "\u3068\u3046\u3082\u308D\u3053\u3057", category: "food" },
  { word: "\u3048\u3093\u3069\u3046", category: "food" },
  { word: "\u305D\u3089\u307E\u3081", category: "food" },
  { word: "\u304A\u304F\u3089", category: "food" },
  { word: "\u3057\u305D", category: "food" },
  { word: "\u307F\u3087\u3046\u304C", category: "food" },
  { word: "\u3057\u3087\u3046\u304C", category: "food" },
  { word: "\u306B\u3089", category: "food" },
  { word: "\u3071\u305B\u308A", category: "food" },
  { word: "\u305B\u308D\u308A", category: "food" },
  { word: "\u3070\u3058\u308B", category: "food" },
  { word: "\u3061\u30FC\u305A", category: "food" },
  { word: "\u3088\u30FC\u3050\u308B\u3068", category: "food" },
  { word: "\u3070\u305F\u30FC", category: "food" },
  { word: "\u304F\u308A\u30FC\u3080", category: "food" },
  { word: "\u3042\u3044\u3059", category: "food" },
  { word: "\u3051\u30FC\u304D", category: "food" },
  { word: "\u304F\u3063\u304D\u30FC", category: "food" },
  { word: "\u3060\u3093\u3054", category: "food" },
  { word: "\u3046\u3081\u307C\u3057", category: "food" },
  { word: "\u304C\u3093\u3082\u3069\u304D", category: "food" },
  { word: "\u3050\u307F", category: "food" },
  { word: "\u3052\u305D", category: "food" },
  { word: "\u305A\u3093\u3060\u3082\u3061", category: "food" },
  { word: "\u305C\u308A\u30FC", category: "food" },
  { word: "\u3067\u3093\u304C\u304F", category: "food" },
  { word: "\u3069\u3089\u3084\u304D", category: "food" },
  { word: "\u306C\u304B\u3065\u3051", category: "food" },
  { word: "\u3075\u308A\u304B\u3051", category: "food" },
  { word: "\u3077\u3089\u3080", category: "food" },
  { word: "\u307E\u3050\u308D", category: "food" },
  { word: "\u3080\u304E\u3081\u3057", category: "food" },
  { word: "\u3081\u304B\u3076", category: "food" },
  { word: "\u3089\u3063\u304D\u3087\u3046", category: "food" },
  { word: "\u308B\u3044\u3079", category: "food" },
  { word: "\u308D\u30FC\u3059", category: "food" },
  { word: "\u3086\u3070", category: "food" },
  { word: "\u307C\u305F\u3082\u3061", category: "food" },
  { word: "\u307D\u3066\u3068", category: "food" },
  { word: "\u304B\u308C\u30FC", category: "food" },
  { word: "\u3053\u30FC\u3072\u30FC", category: "food" },
  { word: "\u3044\u308F\u3057", category: "food" },
  { word: "\u3055\u3093\u307E", category: "food" },
  { word: "\u3055\u3051", category: "food" },
  { word: "\u3042\u3058", category: "food" },
  { word: "\u305F\u3044", category: "food" },
  { word: "\u3072\u3089\u3081", category: "food" },
  { word: "\u307E\u3059", category: "food" },
  { word: "\u3046\u306A\u304E", category: "food" },
  { word: "\u3061\u3083", category: "food" },
  { word: "\u3058\u3085\u30FC\u3059", category: "food" },
  { word: "\u304E\u3085\u3046\u306B\u304F", category: "food" },
  { word: "\u3076\u305F\u306B\u304F", category: "food" },
  { word: "\u3068\u308A\u306B\u304F", category: "food" },
  { word: "\u306F\u3093\u3070\u30FC\u3050", category: "food" },
  { word: "\u304E\u3087\u3046\u3056", category: "food" },
  { word: "\u3084\u304D\u305D\u3070", category: "food" },
  { word: "\u304F\u308A", category: "food" },
  { word: "\u304F\u308B\u307F", category: "food" },
  { word: "\u3061\u3087\u3053", category: "food" },
  { word: "\u3055\u3089\u3060", category: "food" },
  { word: "\u3059\u30FC\u3077", category: "food" },
  { word: "\u3071\u3059\u305F", category: "food" },
  { word: "\u3074\u3056", category: "food" },
  { word: "\u305F\u307E\u3054\u3084\u304D", category: "food" },
  { word: "\u305F\u3044\u3084\u304D", category: "food" },
  { word: "\u305F\u3053\u3084\u304D", category: "food" },
  { word: "\u304A\u3053\u306E\u307F\u3084\u304D", category: "food" },
  // nature
  { word: "\u3084\u307E", category: "nature" },
  { word: "\u304B\u308F", category: "nature" },
  { word: "\u3046\u307F", category: "nature" },
  { word: "\u305D\u3089", category: "nature" },
  { word: "\u3082\u308A", category: "nature" },
  { word: "\u306F\u3084\u3057", category: "nature" },
  { word: "\u3044\u3051", category: "nature" },
  { word: "\u305F\u304D", category: "nature" },
  { word: "\u3057\u307E", category: "nature" },
  { word: "\u306F\u306A", category: "nature" },
  { word: "\u304F\u3055", category: "nature" },
  { word: "\u304D\u308A", category: "nature" },
  { word: "\u3042\u3081", category: "nature" },
  { word: "\u3086\u304D", category: "nature" },
  { word: "\u304B\u305C", category: "nature" },
  { word: "\u3064\u304D", category: "nature" },
  { word: "\u307B\u3057", category: "nature" },
  { word: "\u3072\u304B\u308A", category: "nature" },
  { word: "\u3053\u304B\u3052", category: "nature" },
  { word: "\u3042\u3055\u3072", category: "nature" },
  { word: "\u306C\u307E", category: "nature" },
  { word: "\u3061\u304D\u3085\u3046", category: "nature" },
  { word: "\u307F\u306A\u3068", category: "nature" },
  { word: "\u305F\u3044\u3088\u3046", category: "nature" },
  { word: "\u304F\u3082", category: "nature" },
  { word: "\u306B\u3058", category: "nature" },
  { word: "\u3044\u308F", category: "nature" },
  { word: "\u3044\u3057", category: "nature" },
  { word: "\u3059\u306A", category: "nature" },
  { word: "\u3064\u3061", category: "nature" },
  { word: "\u3069\u308D", category: "nature" },
  { word: "\u305F\u306B", category: "nature" },
  { word: "\u304A\u304B", category: "nature" },
  { word: "\u307F\u306D", category: "nature" },
  { word: "\u3075\u3082\u3068", category: "nature" },
  { word: "\u306E\u306F\u3089", category: "nature" },
  { word: "\u3055\u3070\u304F", category: "nature" },
  { word: "\u307F\u305A\u3046\u307F", category: "nature" },
  { word: "\u305B\u305B\u3089\u304E", category: "nature" },
  { word: "\u306A\u304E\u3055", category: "nature" },
  { word: "\u306F\u307E", category: "nature" },
  { word: "\u307F\u3055\u304D", category: "nature" },
  { word: "\u3046\u3089", category: "nature" },
  { word: "\u3044\u308A\u3048", category: "nature" },
  { word: "\u304A\u304D", category: "nature" },
  { word: "\u306A\u307F", category: "nature" },
  { word: "\u3046\u305A", category: "nature" },
  { word: "\u3057\u3076\u304D", category: "nature" },
  { word: "\u3042\u3089\u3057", category: "nature" },
  { word: "\u304B\u307F\u306A\u308A", category: "nature" },
  { word: "\u3044\u306A\u305A\u307E", category: "nature" },
  { word: "\u3064\u3086", category: "nature" },
  { word: "\u3057\u3082", category: "nature" },
  { word: "\u3053\u304A\u308A", category: "nature" },
  { word: "\u3042\u3089\u308C", category: "nature" },
  { word: "\u304B\u3059\u307F", category: "nature" },
  { word: "\u3082\u3084", category: "nature" },
  { word: "\u3042\u3055\u3084\u3051", category: "nature" },
  { word: "\u3086\u3046\u3084\u3051", category: "nature" },
  { word: "\u3088\u305E\u3089", category: "nature" },
  { word: "\u3042\u304A\u305E\u3089", category: "nature" },
  { word: "\u304F\u3082\u308A", category: "nature" },
  { word: "\u306F\u308C", category: "nature" },
  { word: "\u3057\u3093\u308A\u3087\u304F", category: "nature" },
  { word: "\u3082\u307F\u3058", category: "nature" },
  { word: "\u308F\u304B\u3070", category: "nature" },
  { word: "\u3053\u306E\u306F", category: "nature" },
  { word: "\u304A\u3061\u3070", category: "nature" },
  { word: "\u3053\u3048\u3060", category: "nature" },
  { word: "\u3048\u3060", category: "nature" },
  { word: "\u307F\u304D", category: "nature" },
  { word: "\u306D", category: "nature" },
  { word: "\u305F\u306D", category: "nature" },
  { word: "\u3081", category: "nature" },
  { word: "\u3064\u307C\u307F", category: "nature" },
  { word: "\u3055\u304F\u3089", category: "nature" },
  { word: "\u3046\u3081", category: "nature" },
  { word: "\u307E\u3064", category: "nature" },
  { word: "\u3059\u304E", category: "nature" },
  { word: "\u3072\u306E\u304D", category: "nature" },
  { word: "\u305F\u3051", category: "nature" },
  { word: "\u3055\u3055", category: "nature" },
  { word: "\u3053\u3051", category: "nature" },
  { word: "\u3057\u3060", category: "nature" },
  { word: "\u3064\u305F", category: "nature" },
  { word: "\u3075\u3058", category: "nature" },
  { word: "\u3059\u3059\u304D", category: "nature" },
  { word: "\u3088\u3082\u304E", category: "nature" },
  { word: "\u305F\u3093\u307D\u307D", category: "nature" },
  { word: "\u3059\u307F\u308C", category: "nature" },
  { word: "\u3072\u307E\u308F\u308A", category: "nature" },
  { word: "\u3042\u3058\u3055\u3044", category: "nature" },
  { word: "\u3042\u3084\u3081", category: "nature" },
  { word: "\u3064\u3070\u304D", category: "nature" },
  { word: "\u304D\u304F", category: "nature" },
  { word: "\u3086\u308A", category: "nature" },
  { word: "\u3070\u3089", category: "nature" },
  { word: "\u306F\u3059", category: "nature" },
  { word: "\u308C\u3093\u3052", category: "nature" },
  { word: "\u306A\u306E\u306F\u306A", category: "nature" },
  { word: "\u306A\u305A\u306A", category: "nature" },
  { word: "\u3064\u304F\u3057", category: "nature" },
  { word: "\u3055\u3056\u306A\u307F", category: "nature" },
  { word: "\u3053\u3082\u308C\u3073", category: "nature" },
  { word: "\u3057\u3089\u306A\u307F", category: "nature" },
  { word: "\u307F\u305A", category: "nature" },
  { word: "\u3072", category: "nature" },
  { word: "\u3044\u3069", category: "nature" },
  { word: "\u305F\u3044\u3075\u3046", category: "nature" },
  { word: "\u307F\u305E\u308C", category: "nature" },
  { word: "\u3057\u305A\u304F", category: "nature" },
  { word: "\u3060\u3044\u3061", category: "nature" },
  { word: "\u308A\u304F", category: "nature" },
  { word: "\u3072\u306A\u305F", category: "nature" },
  { word: "\u304B\u3052", category: "nature" },
  { word: "\u307B\u3057\u305E\u3089", category: "nature" },
  { word: "\u307F\u305A\u305F\u307E\u308A", category: "nature" },
  { word: "\u3042\u3055\u304C\u304A", category: "nature" },
  { word: "\u3044\u3061\u3087\u3046", category: "nature" },
  { word: "\u304B\u3048\u3067", category: "nature" },
  { word: "\u3069\u3093\u3050\u308A", category: "nature" },
  { word: "\u307E\u3064\u307C\u3063\u304F\u308A", category: "nature" },
  { word: "\u304D\u306E\u3053", category: "nature" },
  { word: "\u304E\u3093\u304C", category: "nature" },
  // tool
  { word: "\u304B\u3055", category: "tool" },
  { word: "\u306F\u3055\u307F", category: "tool" },
  { word: "\u3048\u3093\u3074\u3064", category: "tool" },
  { word: "\u3051\u3057\u3054\u3080", category: "tool" },
  { word: "\u3082\u306E\u3055\u3057", category: "tool" },
  { word: "\u3064\u304F\u3048", category: "tool" },
  { word: "\u3044\u3059", category: "tool" },
  { word: "\u304B\u304C\u307F", category: "tool" },
  { word: "\u3068\u3051\u3044", category: "tool" },
  { word: "\u3067\u3093\u308F", category: "tool" },
  { word: "\u304F\u308B\u307E", category: "tool" },
  { word: "\u3075\u306D", category: "tool" },
  { word: "\u3058\u3066\u3093\u3057\u3083", category: "tool" },
  { word: "\u307B\u3046\u304D", category: "tool" },
  { word: "\u3084\u3059\u308A", category: "tool" },
  { word: "\u306A\u3079", category: "tool" },
  { word: "\u3055\u3089", category: "tool" },
  { word: "\u307E\u304F\u3089", category: "tool" },
  { word: "\u3053\u305F\u3064", category: "tool" },
  { word: "\u304B\u306A\u3065\u3061", category: "tool" },
  { word: "\u3052\u305F", category: "tool" },
  { word: "\u305C\u3093\u307E\u3044", category: "tool" },
  { word: "\u306F\u3057", category: "tool" },
  { word: "\u3075\u3049\u30FC\u304F", category: "tool" },
  { word: "\u306A\u3044\u3075", category: "tool" },
  { word: "\u304D\u3085\u3046\u3059", category: "tool" },
  { word: "\u304A\u305F\u307E", category: "tool" },
  { word: "\u3057\u3083\u3082\u3058", category: "tool" },
  { word: "\u307E\u306A\u3044\u305F", category: "tool" },
  { word: "\u307B\u3046\u3061\u3087\u3046", category: "tool" },
  { word: "\u3056\u308B", category: "tool" },
  { word: "\u307C\u3046\u308B", category: "tool" },
  { word: "\u304A\u308D\u3057\u304C\u306D", category: "tool" },
  { word: "\u3059\u308A\u3070\u3061", category: "tool" },
  { word: "\u3059\u308A\u3053\u304E", category: "tool" },
  { word: "\u305F\u308F\u3057", category: "tool" },
  { word: "\u3070\u3051\u3064", category: "tool" },
  { word: "\u3061\u308A\u3068\u308A", category: "tool" },
  { word: "\u3054\u307F\u3070\u3053", category: "tool" },
  { word: "\u305B\u3093\u305F\u304F\u3070\u3055\u307F", category: "tool" },
  { word: "\u3082\u306E\u307B\u3057", category: "tool" },
  { word: "\u306F\u3093\u304C\u30FC", category: "tool" },
  { word: "\u304B\u304E", category: "tool" },
  { word: "\u3058\u3087\u3046\u304E", category: "tool" },
  { word: "\u3076\u3093\u3069\u304D", category: "tool" },
  { word: "\u3053\u3093\u3071\u3059", category: "tool" },
  { word: "\u306E\u3053\u304E\u308A", category: "tool" },
  { word: "\u304B\u3093\u306A", category: "tool" },
  { word: "\u304F\u304E", category: "tool" },
  { word: "\u306D\u3058", category: "tool" },
  { word: "\u3068\u3093\u304B\u3061", category: "tool" },
  { word: "\u3069\u3089\u3044\u3070\u30FC", category: "tool" },
  { word: "\u307A\u3093\u3061", category: "tool" },
  { word: "\u3059\u3071\u306A", category: "tool" },
  { word: "\u308C\u3093\u3061", category: "tool" },
  { word: "\u304A\u306E", category: "tool" },
  { word: "\u306A\u305F", category: "tool" },
  { word: "\u304F\u308F", category: "tool" },
  { word: "\u3059\u3053\u3063\u3077", category: "tool" },
  { word: "\u3058\u3087\u3046\u308D", category: "tool" },
  { word: "\u304B\u307E", category: "tool" },
  { word: "\u306F\u305F\u304D", category: "tool" },
  { word: "\u3082\u3063\u3077", category: "tool" },
  { word: "\u3076\u3089\u3057", category: "tool" },
  { word: "\u304F\u3057", category: "tool" },
  { word: "\u304B\u307F\u305D\u308A", category: "tool" },
  { word: "\u306F\u3076\u3089\u3057", category: "tool" },
  { word: "\u305F\u304A\u308B", category: "tool" },
  { word: "\u3066\u306C\u3050\u3044", category: "tool" },
  { word: "\u3075\u308D\u3057\u304D", category: "tool" },
  { word: "\u3075\u3067", category: "tool" },
  { word: "\u3059\u307F", category: "tool" },
  { word: "\u3048\u306E\u3050", category: "tool" },
  { word: "\u3071\u308C\u3063\u3068", category: "tool" },
  { word: "\u3066\u30FC\u3077", category: "tool" },
  { word: "\u304B\u3081\u3089", category: "tool" },
  { word: "\u3089\u3058\u304A", category: "tool" },
  { word: "\u3066\u308C\u3073", category: "tool" },
  { word: "\u308A\u3085\u3063\u304F", category: "tool" },
  { word: "\u3055\u3044\u3075", category: "tool" },
  { word: "\u3067\u3093\u3061", category: "tool" },
  { word: "\u3089\u3044\u3068", category: "tool" },
  { word: "\u3089\u3093\u3077", category: "tool" },
  { word: "\u307E\u3063\u3061", category: "tool" },
  { word: "\u308D\u3046\u305D\u304F", category: "tool" },
  { word: "\u306F\u3057\u3054", category: "tool" },
  { word: "\u308D\u30FC\u3077", category: "tool" },
  { word: "\u3064\u3048", category: "tool" },
  { word: "\u304F\u3064", category: "tool" },
  { word: "\u306A\u304C\u3050\u3064", category: "tool" },
  { word: "\u307C\u3046\u3057", category: "tool" },
  { word: "\u3081\u304C\u306D", category: "tool" },
  { word: "\u307E\u3059\u304F", category: "tool" },
  { word: "\u3066\u3076\u304F\u308D", category: "tool" },
  { word: "\u3046\u3061\u308F", category: "tool" },
  { word: "\u305B\u3093\u3059", category: "tool" },
  { word: "\u3075\u3048", category: "tool" },
  { word: "\u305F\u3044\u3053", category: "tool" },
  { word: "\u3064\u3065\u307F", category: "tool" },
  { word: "\u3053\u3065\u3061", category: "tool" },
  { word: "\u3082\u306E\u304A\u304D", category: "tool" },
  { word: "\u304B\u306A\u3070\u3055\u307F", category: "tool" },
  { word: "\u3081\u3056\u307E\u3057", category: "tool" },
  { word: "\u3066\u304A\u3051", category: "tool" },
  { word: "\u3072\u3057\u3083\u304F", category: "tool" },
  { word: "\u305F\u304F\u3057\u30FC", category: "tool" },
  { word: "\u3067\u3093\u3057\u3083", category: "tool" },
  { word: "\u3070\u3059", category: "tool" },
  { word: "\u3072\u3053\u3046\u304D", category: "tool" },
  { word: "\u3068\u3089\u3063\u304F", category: "tool" },
  { word: "\u308D\u3051\u3063\u3068", category: "tool" },
  { word: "\u3051\u3044\u305F\u3044", category: "tool" },
  { word: "\u3059\u307E\u307B", category: "tool" },
  { word: "\u3067\u3093\u304D\u3085\u3046", category: "tool" },
  { word: "\u305B\u3093\u3077\u3046\u304D", category: "tool" },
  { word: "\u308C\u3044\u305E\u3046\u3053", category: "tool" },
  { word: "\u305B\u3093\u305F\u304F\u304D", category: "tool" },
  { word: "\u3059\u3044\u306F\u3093\u304D", category: "tool" },
  { word: "\u306E\u30FC\u3068", category: "tool" },
  { word: "\u3044\u308D\u3048\u3093\u3074\u3064", category: "tool" },
  { word: "\u3057\u305F\u3058\u304D", category: "tool" },
  { word: "\u3089\u3093\u3069\u305B\u308B", category: "tool" },
  { word: "\u3075\u3067\u3070\u3053", category: "tool" },
  { word: "\u3053\u3093\u3074\u3085\u30FC\u305F\u30FC", category: "tool" },
  { word: "\u3057\u3093\u3054\u3046", category: "tool" },
  { word: "\u305D\u3046\u3058\u304D", category: "tool" },
  { word: "\u3073\u30FC\u3060\u307E", category: "tool" },
  // place
  { word: "\u3044\u3048", category: "place" },
  { word: "\u3078\u3084", category: "place" },
  { word: "\u307E\u3061", category: "place" },
  { word: "\u3080\u3089", category: "place" },
  { word: "\u306B\u308F", category: "place" },
  { word: "\u3070\u3057\u3087", category: "place" },
  { word: "\u3068\u3053\u308D", category: "place" },
  { word: "\u3072\u308D\u3070", category: "place" },
  { word: "\u304C\u3063\u3053\u3046", category: "place" },
  { word: "\u307F\u305B", category: "place" },
  { word: "\u3048\u304D", category: "place" },
  { word: "\u3086\u3046\u3048\u3093\u3061", category: "place" },
  { word: "\u304D\u3087\u3046\u3057\u3064", category: "place" },
  { word: "\u3053\u3046\u3066\u3044", category: "place" },
  { word: "\u3060\u3044\u3069\u3053\u308D", category: "place" },
  { word: "\u304A\u3075\u308D", category: "place" },
  { word: "\u3068\u3044\u308C", category: "place" },
  { word: "\u3057\u3093\u3057\u3064", category: "place" },
  { word: "\u304A\u304F\u3058\u3087\u3046", category: "place" },
  { word: "\u308D\u3046\u304B", category: "place" },
  { word: "\u3086\u3046\u3073\u3093\u304D\u3087\u304F", category: "place" },
  { word: "\u3059\u30FC\u3071\u30FC", category: "place" },
  { word: "\u3084\u304A\u3084", category: "place" },
  { word: "\u3071\u3093\u3084", category: "place" },
  { word: "\u307B\u3093\u3084", category: "place" },
  { word: "\u306F\u306A\u3084", category: "place" },
  { word: "\u304F\u3059\u308A\u3084", category: "place" },
  { word: "\u3053\u3046\u3058\u3087\u3046", category: "place" },
  { word: "\u306E\u3046\u3058\u3087\u3046", category: "place" },
  { word: "\u307C\u304F\u3058\u3087\u3046", category: "place" },
  { word: "\u304F\u3046\u3053\u3046", category: "place" },
  { word: "\u3058\u3093\u3058\u3083", category: "place" },
  { word: "\u304A\u3066\u3089", category: "place" },
  { word: "\u304D\u3087\u3046\u304B\u3044", category: "place" },
  { word: "\u3057\u3084\u304F\u3057\u3087", category: "place" },
  { word: "\u3057\u3087\u3046\u307C\u3046\u3057\u3087", category: "place" },
  { word: "\u308D\u3058", category: "place" },
  { word: "\u307B\u3069\u3046", category: "place" },
  { word: "\u3070\u3059\u3066\u3044", category: "place" },
  { word: "\u3057\u3087\u304F\u3069\u3046", category: "place" },
  { word: "\u3046\u3093\u3069\u3046\u3058\u3087\u3046", category: "place" },
  { word: "\u3061\u3085\u3046\u3057\u3083\u3058\u3087\u3046", category: "place" },
  { word: "\u3057\u3087\u3046\u3066\u3093\u304C\u3044", category: "place" },
  { word: "\u3079\u3089\u3093\u3060", category: "place" },
  { word: "\u3046\u3089\u306B\u308F", category: "place" },
  { word: "\u304E\u3093\u3053\u3046", category: "place" },
  // body
  { word: "\u3053\u3053\u308D", category: "body" },
  { word: "\u304B\u3089\u3060", category: "body" },
  { word: "\u3042\u305F\u307E", category: "body" },
  { word: "\u3066", category: "body" },
  { word: "\u3042\u3057", category: "body" },
  { word: "\u307F\u307F", category: "body" },
  { word: "\u304F\u3061", category: "body" },
  { word: "\u306F\u3089", category: "body" },
  { word: "\u305B\u306A\u304B", category: "body" },
  { word: "\u304B\u305F", category: "body" },
  { word: "\u3046\u3067", category: "body" },
  { word: "\u3086\u3073", category: "body" },
  { word: "\u3064\u3081", category: "body" },
  { word: "\u3072\u3056", category: "body" },
  { word: "\u3053\u3057", category: "body" },
  { word: "\u306E\u3069", category: "body" },
  { word: "\u307B\u304A", category: "body" },
  { word: "\u307E\u3086", category: "body" },
  { word: "\u307E\u3076\u305F", category: "body" },
  { word: "\u304B\u307F", category: "body" },
  { word: "\u3080\u306D", category: "body" },
  { word: "\u3042\u3054", category: "body" },
  { word: "\u304F\u3073", category: "body" },
  { word: "\u3072\u305F\u3044", category: "body" },
  { word: "\u3072\u3058", category: "body" },
  { word: "\u304B\u304B\u3068", category: "body" },
  { word: "\u3064\u307E\u3055\u304D", category: "body" },
  { word: "\u307E\u3064\u3052", category: "body" },
  { word: "\u306F\u3060", category: "body" },
  { word: "\u307B\u306D", category: "body" },
  { word: "\u3061", category: "body" },
  { word: "\u3059\u306D", category: "body" },
  { word: "\u304F\u3061\u3073\u308B", category: "body" },
  // emotion
  { word: "\u3048\u304C\u304A", category: "emotion" },
  { word: "\u3088\u308D\u3053\u3073", category: "emotion" },
  { word: "\u304B\u306A\u3057\u307F", category: "emotion" },
  { word: "\u3044\u304B\u308A", category: "emotion" },
  { word: "\u304A\u3069\u308D\u304D", category: "emotion" },
  { word: "\u305F\u306E\u3057\u307F", category: "emotion" },
  { word: "\u3057\u3042\u308F\u305B", category: "emotion" },
  { word: "\u305F\u3081\u3089\u3044", category: "emotion" },
  { word: "\u304D\u307C\u3046", category: "emotion" },
  { word: "\u3086\u3046\u304D", category: "emotion" },
  { word: "\u304A\u3060\u3084\u304B", category: "emotion" },
  { word: "\u3069\u304D\u3069\u304D", category: "emotion" },
  { word: "\u308F\u304F\u308F\u304F", category: "emotion" },
  { word: "\u3046\u3063\u3068\u308A", category: "emotion" },
  { word: "\u3055\u3073\u3057\u3055", category: "emotion" },
  { word: "\u3084\u3055\u3057\u3055", category: "emotion" },
  { word: "\u3042\u3053\u304C\u308C", category: "emotion" },
  { word: "\u307B\u3053\u308A", category: "emotion" },
  { word: "\u306A\u3054\u307F", category: "emotion" },
  { word: "\u3068\u304D\u3081\u304D", category: "emotion" },
  { word: "\u3042\u305B\u308A", category: "emotion" },
  { word: "\u3044\u3089\u3060\u3061", category: "emotion" },
  { word: "\u304F\u3084\u3057\u3055", category: "emotion" },
  { word: "\u305B\u3064\u306A\u3055", category: "emotion" },
  { word: "\u3046\u308C\u3057\u3055", category: "emotion" },
  { word: "\u305F\u306E\u3057\u3055", category: "emotion" },
  { word: "\u304A\u304B\u3057\u307F", category: "emotion" },
  { word: "\u304A\u305D\u308C", category: "emotion" },
  { word: "\u3053\u308F\u3055", category: "emotion" },
  { word: "\u304A\u3073\u3048", category: "emotion" },
  { word: "\u306F\u3058\u3089\u3044", category: "emotion" },
  { word: "\u3066\u308C", category: "emotion" },
  { word: "\u307E\u3088\u3044", category: "emotion" },
  { word: "\u306A\u3084\u307F", category: "emotion" },
  { word: "\u304D\u3065\u304B\u3044", category: "emotion" },
  { word: "\u304A\u3082\u3044\u3084\u308A", category: "emotion" },
  { word: "\u3044\u305F\u308F\u308A", category: "emotion" },
  { word: "\u3042\u3044", category: "emotion" },
  { word: "\u3053\u3044", category: "emotion" },
  { word: "\u3059\u304D", category: "emotion" },
  { word: "\u304D\u3089\u3044", category: "emotion" },
  { word: "\u3044\u3084\u3051", category: "emotion" },
  { word: "\u3080\u306A\u3057\u3055", category: "emotion" },
  { word: "\u3080\u306D\u3055\u308F\u304E", category: "emotion" },
  { word: "\u304B\u3093\u3052\u304D", category: "emotion" },
  { word: "\u304B\u3093\u3069\u3046", category: "emotion" },
  { word: "\u307E\u3093\u305E\u304F", category: "emotion" },
  { word: "\u305F\u3044\u304F\u3064", category: "emotion" },
  { word: "\u305F\u3044\u305B\u3064", category: "emotion" },
  { word: "\u3057\u3093\u3071\u3044", category: "emotion" },
  { word: "\u3051\u3044\u304B\u3044", category: "emotion" },
  { word: "\u3057\u3087\u3046\u304D", category: "emotion" },
  { word: "\u3052\u3093\u304D", category: "emotion" },
  { word: "\u304D\u3089\u3081\u304D", category: "emotion" },
  { word: "\u3072\u3089\u3081\u304D", category: "emotion" },
  { word: "\u3042\u304D\u3089\u3081", category: "emotion" },
  { word: "\u306D\u305F\u307F", category: "emotion" },
  { word: "\u305D\u306D\u307F", category: "emotion" },
  { word: "\u3046\u3089\u307F", category: "emotion" },
  { word: "\u306F\u3052\u307F", category: "emotion" },
  { word: "\u306F\u305A\u307F", category: "emotion" },
  { word: "\u3086\u3068\u308A", category: "emotion" },
  { word: "\u3084\u308B\u304D", category: "emotion" },
  { word: "\u306C\u304F\u3082\u308A", category: "emotion" },
  { word: "\u3042\u305F\u305F\u304B\u307F", category: "emotion" },
  { word: "\u3057\u305F\u3057\u307F", category: "emotion" },
  { word: "\u3055\u307F\u3057\u3055", category: "emotion" },
  { word: "\u3059\u306A\u304A", category: "emotion" },
  { word: "\u307E\u3058\u3081", category: "emotion" },
  { word: "\u3088\u304F\u3070\u308A", category: "emotion" },
  { word: "\u3042\u307E\u3048", category: "emotion" },
  { word: "\u3044\u3058\u308F\u308B", category: "emotion" },
  { word: "\u308F\u3073\u3057\u3055", category: "emotion" },
  { word: "\u304B\u306A\u3057\u3055", category: "emotion" },
  { word: "\u3051\u3060\u308B\u3055", category: "emotion" },
  { word: "\u3053\u3053\u3061\u3088\u3055", category: "emotion" },
  { word: "\u304D\u307E\u305A\u3055", category: "emotion" },
  { word: "\u304D\u3065\u307E\u308A", category: "emotion" },
  { word: "\u3082\u3069\u304B\u3057\u3055", category: "emotion" },
  { word: "\u306F\u305A\u304B\u3057\u3055", category: "emotion" },
  { word: "\u3059\u304C\u3059\u304C\u3057\u3055", category: "emotion" },
  { word: "\u3055\u308F\u3084\u304B", category: "emotion" },
  { word: "\u307B\u304C\u3089\u304B", category: "emotion" },
  { word: "\u306B\u3053\u3084\u304B", category: "emotion" },
  { word: "\u3057\u305A\u3051\u3055", category: "emotion" },
  { word: "\u3084\u3059\u3089\u304E", category: "emotion" },
  { word: "\u3044\u304D\u304C\u3044", category: "emotion" },
  { word: "\u306A\u3064\u304B\u3057\u3055", category: "emotion" },
  { word: "\u3042\u308F\u308C\u307F", category: "emotion" },
  { word: "\u3081\u3050\u307F", category: "emotion" },
  { word: "\u304B\u3093\u3057\u3083", category: "emotion" },
  { word: "\u3057\u3063\u3068", category: "emotion" },
  { word: "\u3042\u304D\u308C", category: "emotion" },
  { word: "\u3042\u308F\u308C", category: "emotion" },
  { word: "\u307B\u307B\u3048\u307F", category: "emotion" },
  { word: "\u3080\u3058\u3083\u304D", category: "emotion" },
  { word: "\u3044\u3068\u3057\u3055", category: "emotion" },
  { word: "\u3046\u3057\u308D\u3081\u305F\u3055", category: "emotion" },
  { word: "\u3046\u3089\u3084\u307E\u3057\u3055", category: "emotion" },
  { word: "\u3053\u3053\u308D\u3065\u3088\u3055", category: "emotion" },
  { word: "\u3053\u3053\u308D\u307C\u305D\u3055", category: "emotion" },
  { word: "\u3046\u308C\u3044", category: "emotion" },
  { word: "\u3068\u307E\u3069\u3044", category: "emotion" },
  { word: "\u306F\u308C\u3070\u308C", category: "emotion" },
  { word: "\u304D\u3093\u3061\u3087\u3046", category: "emotion" },
  { word: "\u3068\u304F\u3044", category: "emotion" },
  { word: "\u306B\u304C\u3066", category: "emotion" },
  { word: "\u3073\u3063\u304F\u308A", category: "emotion" },
  // life
  { word: "\u3042\u3055", category: "life" },
  { word: "\u3072\u308B", category: "life" },
  { word: "\u3088\u308B", category: "life" },
  { word: "\u307E\u3064\u308A", category: "life" },
  { word: "\u3042\u305D\u3073", category: "life" },
  { word: "\u3046\u305F", category: "life" },
  { word: "\u304A\u3069\u308A", category: "life" },
  { word: "\u305F\u3073", category: "life" },
  { word: "\u3057\u3054\u3068", category: "life" },
  { word: "\u3084\u3059\u307F", category: "life" },
  { word: "\u304F\u3089\u3057", category: "life" },
  { word: "\u3086\u3081", category: "life" },
  { word: "\u3079\u3093\u304D\u3087\u3046", category: "life" },
  { word: "\u3042\u3044\u3055\u3064", category: "life" },
  { word: "\u3084\u304F\u305D\u304F", category: "life" },
  { word: "\u3051\u3044\u3053", category: "life" },
  { word: "\u308C\u3093\u3057\u3085\u3046", category: "life" },
  { word: "\u3058\u3085\u3093\u3073", category: "life" },
  { word: "\u306D\u3080\u308A", category: "life" },
  { word: "\u3048\u3093\u305D\u304F", category: "life" },
  { word: "\u3046\u3093\u3069\u3046\u304B\u3044", category: "life" },
  { word: "\u305F\u3093\u3058\u3087\u3046\u3073", category: "life" },
  { word: "\u304A\u3044\u308F\u3044", category: "life" },
  { word: "\u3057\u3085\u304F\u3060\u3044", category: "life" },
  { word: "\u3066\u3059\u3068", category: "life" },
  { word: "\u304D\u3085\u3046\u3051\u3044", category: "life" },
  { word: "\u305D\u3046\u3058", category: "life" },
  { word: "\u304D\u3085\u3046\u3057\u3087\u304F", category: "life" },
  { word: "\u3068\u3046\u3053\u3046", category: "life" },
  { word: "\u3052\u3053\u3046", category: "life" },
  { word: "\u304A\u3067\u304B\u3051", category: "life" },
  { word: "\u308A\u3087\u3053\u3046", category: "life" },
  { word: "\u304B\u3044\u3082\u306E", category: "life" },
  { word: "\u304A\u3072\u308B\u306D", category: "life" },
  { word: "\u304A\u3066\u3064\u3060\u3044", category: "life" },
  { word: "\u3072\u308B\u3084\u3059\u307F", category: "life" },
  { word: "\u306A\u3064\u3084\u3059\u307F", category: "life" },
  { word: "\u3075\u3086\u3084\u3059\u307F", category: "life" },
  { word: "\u306F\u308B\u3084\u3059\u307F", category: "life" },
  // normal
  { word: "\u304D\u3087\u3046", category: "normal" },
  { word: "\u3042\u3057\u305F", category: "normal" },
  { word: "\u3080\u304B\u3057", category: "normal" },
  { word: "\u306A\u307E\u3048", category: "normal" },
  { word: "\u3053\u3068\u3070", category: "normal" },
  { word: "\u3066\u304C\u307F", category: "normal" },
  { word: "\u304A\u306F\u306A\u3057", category: "normal" },
  { word: "\u3072\u307F\u3064", category: "normal" },
  { word: "\u305F\u304B\u3089", category: "normal" },
  { word: "\u306A\u304B\u307E", category: "normal" },
  { word: "\u3060\u308B\u307E", category: "normal" },
  { word: "\u308B\u3059", category: "normal" },
  { word: "\u307F\u3061", category: "normal" },
  { word: "\u304B\u3069", category: "normal" },
  { word: "\u3044\u306E\u3061", category: "normal" },
  { word: "\u306D\u304C\u3044", category: "normal" },
  { word: "\u3061\u304B\u3089", category: "normal" },
  { word: "\u3053\u3048", category: "normal" },
  { word: "\u304A\u3068", category: "normal" },
  { word: "\u3044\u308D", category: "normal" },
  { word: "\u304B\u305F\u3061", category: "normal" },
  { word: "\u304B\u305A", category: "normal" },
  { word: "\u3082\u3058", category: "normal" },
  { word: "\u3048", category: "normal" },
  { word: "\u3075\u307F", category: "normal" },
  { word: "\u3048\u306B\u3063\u304D", category: "normal" },
  { word: "\u306B\u3063\u304D", category: "normal" },
  { word: "\u304D\u304A\u304F", category: "normal" },
  { word: "\u308C\u304D\u3057", category: "normal" },
  { word: "\u3068\u304D", category: "normal" },
  { word: "\u3072\u3068", category: "normal" },
  { word: "\u3053\u3069\u3082", category: "normal" },
  { word: "\u304A\u3068\u306A", category: "normal" },
  { word: "\u3068\u3082\u3060\u3061", category: "normal" },
  { word: "\u304B\u305E\u304F", category: "normal" },
  { word: "\u304A\u3084", category: "normal" },
  { word: "\u3053", category: "normal" },
  { word: "\u307E\u3054", category: "normal" },
  { word: "\u304D\u3087\u3046\u3060\u3044", category: "normal" },
  { word: "\u305B\u304B\u3044", category: "normal" },
  { word: "\u304F\u306B", category: "normal" },
  { word: "\u3078\u3093\u3058", category: "normal" },
  { word: "\u3053\u305F\u3048", category: "normal" },
  { word: "\u3057\u3089\u305B", category: "normal" },
  { word: "\u305F\u3088\u308A", category: "normal" },
  { word: "\u304D\u307E\u308A", category: "normal" },
  { word: "\u308B\u30FC\u308B", category: "normal" },
  { word: "\u3042\u3068", category: "normal" },
  { word: "\u307E\u3048", category: "normal" },
  { word: "\u3046\u3057\u308D", category: "normal" },
  { word: "\u3088\u3053", category: "normal" },
  { word: "\u3068\u306A\u308A", category: "normal" },
  { word: "\u306A\u304B", category: "normal" },
  { word: "\u305D\u3068", category: "normal" },
  { word: "\u3046\u3048", category: "normal" },
  { word: "\u3057\u305F", category: "normal" },
  { word: "\u307F\u304E", category: "normal" },
  { word: "\u3072\u3060\u308A", category: "normal" },
  { word: "\u306F\u3058\u3081", category: "normal" },
  { word: "\u304A\u308F\u308A", category: "normal" },
  { word: "\u3064\u3065\u304D", category: "normal" },
  { word: "\u3064\u304E", category: "normal" },
  { word: "\u3055\u304D", category: "normal" },
  { word: "\u306E\u3061", category: "normal" },
  { word: "\u3080\u3053\u3046", category: "normal" },
  { word: "\u3053\u3061\u3089", category: "normal" },
  { word: "\u3042\u3061\u3089", category: "normal" },
  { word: "\u3069\u3061\u3089", category: "normal" },
  { word: "\u3044\u3064\u3082", category: "normal" },
  { word: "\u3068\u304D\u3069\u304D", category: "normal" },
  { word: "\u305F\u307E\u306B", category: "normal" },
  { word: "\u3059\u3050", category: "normal" },
  { word: "\u3053\u3088\u307F", category: "normal" },
  { word: "\u307E\u3069", category: "normal" },
  { word: "\u3068\u3073\u3089", category: "normal" },
  { word: "\u304D\u305F", category: "normal" },
  { word: "\u307F\u306A\u307F", category: "normal" },
  { word: "\u3072\u304C\u3057", category: "normal" },
  { word: "\u306B\u3057", category: "normal" },
  { word: "\u304D\u305B\u3064", category: "normal" },
  { word: "\u306F\u308B", category: "normal" },
  { word: "\u306A\u3064", category: "normal" },
  { word: "\u3042\u304D", category: "normal" },
  { word: "\u3075\u3086", category: "normal" },
  { word: "\u306D\u3093\u308C\u3044", category: "normal" },
  { word: "\u305B\u3093\u305B\u3044", category: "normal" },
  { word: "\u304A\u304B\u306D", category: "normal" },
  { word: "\u306A\u305E", category: "normal" }
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
function findWord(word) {
  return WORD_INDEX.get(word);
}
function getWordsByInitial(initial) {
  return WORDS_BY_INITIAL.get(initial) ?? [];
}

// src/logic/battle.ts
var ANIMAL_DAMAGE_BONUS = 2;
var TOOL_DAMAGE_BONUS = 1;
var FOOD_HEAL_AMOUNT = 2;
var NATURE_DEFENSE_REDUCTION = 2;
var EMOTION_COMBO_STEP = 0.5;
var CHANCE_DAMAGE = 3;
var DEFAULT_PLAYER_MAX_HP = 100;
function round1(value) {
  return Math.round(value * 10) / 10;
}
function createInitialBattleState(enemy2, playerMaxHp = DEFAULT_PLAYER_MAX_HP, playerHp = playerMaxHp) {
  return {
    playerHp: playerMaxHp,
    playerMaxHp,
    enemyHp: enemy2.maxHp,
    enemyMaxHp: enemy2.maxHp,
    pendingDefense: 0,
    comboMultiplier: 1
  };
}
function applyPlayerAttack(state2, entry, skills = {}) {
  const messages = [];
  let comboMultiplier = state2.comboMultiplier;
  if (entry.category === "emotion") {
    comboMultiplier = round1(comboMultiplier + EMOTION_COMBO_STEP);
  }
  const baseDamage = entry.word.length;
  let bonusDamage = skills.bonusDamage ?? 0;
  if (entry.category === "animal") {
    bonusDamage += ANIMAL_DAMAGE_BONUS + (skills.bonusAnimalDamage ?? 0);
  } else if (entry.category === "tool") {
    bonusDamage += TOOL_DAMAGE_BONUS;
  }
  if (entry.word.length >= 4) {
    bonusDamage += skills.bonusVocabDamage ?? 0;
  }
  let damageDealt = baseDamage + bonusDamage;
  if (entry.category === "emotion") {
    damageDealt = Math.floor(damageDealt * comboMultiplier);
  }
  messages.push(`\u30C0\u30E1\u30FC\u30B8${damageDealt}\uFF01`);
  const enemyHp = Math.max(0, state2.enemyHp - damageDealt);
  let playerHp = state2.playerHp;
  if (entry.category === "food") {
    const healAmount = FOOD_HEAL_AMOUNT + (skills.bonusHeal ?? 0);
    playerHp = Math.min(state2.playerMaxHp, playerHp + healAmount);
    messages.push(`\u30D7\u30EC\u30A4\u30E4\u30FC\u306EHP\u304C${healAmount}\u56DE\u5FA9\u3057\u305F\uFF01`);
  }
  let pendingDefense = state2.pendingDefense;
  if (entry.category === "nature") {
    pendingDefense += NATURE_DEFENSE_REDUCTION + (skills.bonusDefense ?? 0);
    messages.push("\u3064\u304E\u306E\u6575\u306E\u653B\u6483\u30C0\u30E1\u30FC\u30B8\u304C2\u3084\u308F\u3089\u3050\uFF01");
  }
  const outcome = enemyHp <= 0 ? "stageClear" : "ongoing";
  if (outcome === "stageClear") {
    messages.push("\u30B9\u30C6\u30FC\u30B8\u30AF\u30EA\u30A2\uFF01");
  }
  return {
    state: {
      ...state2,
      enemyHp,
      playerHp,
      pendingDefense,
      comboMultiplier
    },
    damageDealt,
    messages,
    outcome
  };
}
function applyEnemyAttack(state2, enemy2, word, skills = {}) {
  const messages = [];
  const rawDamage = enemy2.attack + Math.floor(word.length / 3);
  const totalDefense = state2.pendingDefense;
  const damageTaken = Math.max(0, rawDamage - totalDefense);
  if (state2.pendingDefense > 0) {
    messages.push(`\u3057\u305C\u3093\u306E\u52B9\u679C\u3067\u6575\u306E\u653B\u6483\u3092${state2.pendingDefense}\u3084\u308F\u3089\u3052\u305F\uFF01`);
  }
  messages.push(`\u6575\u306E\u653B\u6483\uFF01\u30C0\u30E1\u30FC\u30B8${damageTaken}\uFF01`);
  const playerHp = Math.max(0, state2.playerHp - damageTaken);
  const outcome = playerHp <= 0 ? "gameOver" : "ongoing";
  if (outcome === "gameOver") {
    messages.push("\u30B2\u30FC\u30E0\u30AA\u30FC\u30D0\u30FC...");
  }
  return {
    state: {
      ...state2,
      playerHp,
      pendingDefense: 0,
      // R11: mitigation is consumed whether or not it was used
      comboMultiplier: 1
      // R13: combo resets after the enemy's turn
    },
    damageTaken,
    messages,
    outcome
  };
}
function applyChanceDamage(state2) {
  const enemyHp = Math.max(0, state2.enemyHp - CHANCE_DAMAGE);
  const outcome = enemyHp <= 0 ? "stageClear" : "ongoing";
  const messages = ["\u6575\u304C\u8A00\u8449\u306B\u3064\u307E\u3063\u305F\uFF01\u30C1\u30E3\u30F3\u30B9\u30C0\u30E1\u30FC\u30B8\uFF01"];
  if (outcome === "stageClear") {
    messages.push("\u30B9\u30C6\u30FC\u30B8\u30AF\u30EA\u30A2\uFF01");
  }
  return {
    state: { ...state2, enemyHp },
    damageDealt: CHANCE_DAMAGE,
    messages,
    outcome
  };
}

// src/logic/shiritori.ts
function isConnected(word, lastKey) {
  if (lastKey === null) {
    return true;
  }
  return getFirstKey(word) === lastKey;
}
function isWordUsed(word, usedWords) {
  return usedWords.has(word);
}
function isInDictionary(word) {
  return findWord(word) !== void 0;
}
function endsWithN(word) {
  return getLastKey(word) === "\u3093";
}
function validatePlayerWord(word, state2) {
  if (!isHiragana(word)) {
    return { ok: false, reason: "notHiragana" };
  }
  if (isInvalidEnding(word)) {
    return { ok: false, reason: "invalidEnding" };
  }
  const effectiveLastChar = state2.lastChar && getWordsByInitial(state2.lastChar).some(
    (entry) => !state2.usedWords.has(entry.word) && !endsWithN(entry.word)
  ) ? state2.lastChar : null;
  if (!isConnected(word, effectiveLastChar)) {
    return { ok: false, reason: "notConnected" };
  }
  if (isWordUsed(word, state2.usedWords)) {
    return { ok: false, reason: "alreadyUsed" };
  }
  if (!isInDictionary(word)) {
    return { ok: false, reason: "notInDict" };
  }
  if (endsWithN(word)) {
    return { ok: false, reason: "endsWithN", isGameOver: true };
  }
  return { ok: true };
}
function pickEnemyWord(startChar, usedWords) {
  const candidates = getWordsByInitial(startChar).filter(
    (entry) => !usedWords.has(entry.word) && !endsWithN(entry.word)
  );
  if (candidates.length === 0) {
    return null;
  }
  const playableCandidates = candidates.filter((entry) => {
    const usedAfterReply = new Set(usedWords);
    usedAfterReply.add(entry.word);
    return getWordsByInitial(getLastKey(entry.word)).some(
      (nextEntry) => !usedAfterReply.has(nextEntry.word) && !endsWithN(nextEntry.word)
    );
  });
  const pool = playableCandidates.length > 0 ? playableCandidates : candidates;
  const index = Math.floor(Math.random() * pool.length);
  return pool[index].word;
}
function resolveEnemyTurn(startChar, usedWords) {
  const word = pickEnemyWord(startChar, usedWords);
  return word ? { type: "word", word } : { type: "stuck" };
}

// scripts/trace.ts
var seed = 12345;
Math.random = () => {
  seed = seed * 1103515245 + 12345 & 2147483647;
  return seed / 2147483647;
};
var enemy = ENEMIES[0];
var state = createInitialBattleState(enemy, DEFAULT_PLAYER_MAX_HP, DEFAULT_PLAYER_MAX_HP);
var used = /* @__PURE__ */ new Set();
var lastChar = null;
for (let t = 0; t < 40; t++) {
  const legal = WORDS.filter((e2) => validatePlayerWord(e2.word, { lastChar, usedWords: used }).ok);
  if (legal.length === 0) {
    console.log(`>>> PLAYER STUCK at lastChar="${lastChar}". words starting "${lastChar}" in dict:`, WORDS.filter((w) => w.word[0] === lastChar).map((w) => w.word));
    break;
  }
  const pick = legal.map((w) => ({ w, tailCount: WORDS.filter((x) => x.word[0] === getLastKey(w.word) && !used.has(x.word)).length, len: w.word.length })).sort((a, b) => b.tailCount - a.tailCount || b.len - a.len)[0].w;
  const atk = applyPlayerAttack(state, pick);
  state = atk.state;
  used.add(pick.word);
  lastChar = getLastKey(pick.word);
  console.log(`P: ${pick.word} -> enemyHP ${state.enemyHp}, tail=${lastChar}`);
  if (atk.outcome === "stageClear") {
    console.log("CLEAR");
    break;
  }
  const et = resolveEnemyTurn(lastChar, used);
  if (et.type === "stuck") {
    const c = applyChanceDamage(state);
    state = c.state;
    console.log(`  E stuck -> chance, enemyHP ${state.enemyHp}`);
    if (c.outcome === "stageClear") {
      console.log("CLEAR");
      break;
    }
    continue;
  }
  used.add(et.word);
  lastChar = getLastKey(et.word);
  const e = applyEnemyAttack(state, enemy, et.word);
  state = e.state;
  console.log(`  E: ${et.word} -> playerHP ${state.playerHp}, tail=${lastChar}`);
  if (e.outcome === "gameOver") {
    console.log("GAME OVER");
    break;
  }
}
