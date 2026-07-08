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
  { word: "\u304D\u308A\u3093", category: "animal" },
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
  // normal
  { word: "\u3042\u3055", category: "normal" },
  { word: "\u3072\u308B", category: "normal" },
  { word: "\u3088\u308B", category: "normal" },
  { word: "\u304D\u3087\u3046", category: "normal" },
  { word: "\u3042\u3057\u305F", category: "normal" },
  { word: "\u3080\u304B\u3057", category: "normal" },
  { word: "\u306A\u307E\u3048", category: "normal" },
  { word: "\u3053\u3068\u3070", category: "normal" },
  { word: "\u3053\u3053\u308D", category: "normal" },
  { word: "\u304B\u3089\u3060", category: "normal" },
  { word: "\u3042\u305F\u307E", category: "normal" },
  { word: "\u3066\u304C\u307F", category: "normal" },
  { word: "\u304A\u306F\u306A\u3057", category: "normal" },
  { word: "\u307E\u3064\u308A", category: "normal" },
  { word: "\u3042\u305D\u3073", category: "normal" },
  { word: "\u3046\u305F", category: "normal" },
  { word: "\u304A\u3069\u308A", category: "normal" },
  { word: "\u3072\u307F\u3064", category: "normal" },
  { word: "\u305F\u304B\u3089", category: "normal" },
  { word: "\u306A\u304B\u307E", category: "normal" }
];
var WORD_INDEX = new Map(WORDS.map((entry) => [entry.word, entry]));
var WORDS_BY_INITIAL = /* @__PURE__ */ new Map();
for (const entry of WORDS) {
  const initial = entry.word[0];
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
var DEFAULT_PLAYER_MAX_HP = 20;
function round1(value) {
  return Math.round(value * 10) / 10;
}
function createInitialBattleState(enemy2, playerMaxHp = DEFAULT_PLAYER_MAX_HP, playerHp = playerMaxHp) {
  return {
    playerHp: Math.min(playerMaxHp, Math.max(0, playerHp)),
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
var HIRAGANA_ONLY = /^[ぁ-ん]+$/;
function isHiragana(word) {
  return HIRAGANA_ONLY.test(word) && !word.includes("\u30FC");
}
function getLastChar(word) {
  return word.slice(-1);
}
function isConnected(word, lastChar2) {
  if (lastChar2 === null) {
    return true;
  }
  return word.charAt(0) === lastChar2;
}
function isWordUsed(word, usedWords) {
  return usedWords.has(word);
}
function isInDictionary(word) {
  return findWord(word) !== void 0;
}
function endsWithN(word) {
  return getLastChar(word) === "\u3093";
}
function validatePlayerWord(word, state2) {
  if (!isHiragana(word)) {
    return { ok: false, reason: "notHiragana" };
  }
  if (!isConnected(word, state2.lastChar)) {
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
  const index = Math.floor(Math.random() * candidates.length);
  return candidates[index].word;
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
  const pick = legal.map((w) => ({ w, tailCount: WORDS.filter((x) => x.word[0] === getLastChar(w.word) && !used.has(x.word)).length, len: w.word.length })).sort((a, b) => b.tailCount - a.tailCount || b.len - a.len)[0].w;
  const atk = applyPlayerAttack(state, pick);
  state = atk.state;
  used.add(pick.word);
  lastChar = getLastChar(pick.word);
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
  lastChar = getLastChar(et.word);
  const e = applyEnemyAttack(state, enemy, et.word);
  state = e.state;
  console.log(`  E: ${et.word} -> playerHP ${state.playerHp}, tail=${lastChar}`);
  if (e.outcome === "gameOver") {
    console.log("GAME OVER");
    break;
  }
}
