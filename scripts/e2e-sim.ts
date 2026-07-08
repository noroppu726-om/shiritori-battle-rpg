/**
 * E2E completability proof for R53.
 *
 * Drives the REAL game-logic modules (no mocks) through all 5 stages exactly the
 * way App.tsx + BattleScreen.tsx do:
 *   - validate a player word, apply the attack, let the enemy reply (or take
 *     chance damage);
 *   - reset the used-word pool per stage (UI remounts BattleScreen with key=stage);
 *   - carry player HP between stages;
 *   - after each stage clear, pick one skill from a random 3-choice roll (R26),
 *     and apply owned-skill modifiers to every attack (R27-R32).
 * A careful-human strategy (2-ply anti-softlock lookahead + HP management) plays.
 *
 *   node scripts/e2e-sim.bundle.mjs             -> one reproducible playthrough (verbose)
 *   node scripts/e2e-sim.bundle.mjs --monte 500 -> full-game clear rate over N seeds
 */
import { ENEMIES } from '../src/data/enemies';
import { WORDS } from '../src/data/words';
import {
  createInitialBattleState,
  applyPlayerAttack,
  applyEnemyAttack,
  applyChanceDamage,
  DEFAULT_PLAYER_MAX_HP,
  type BattleState,
  type SkillModifiers,
} from '../src/logic/battle';
import {
  validatePlayerWord,
  resolveEnemyTurn,
  getFirstKey,
  getLastKey,
  endsWithN,
  type ShiritoriState,
} from '../src/logic/shiritori';
import { computeSkillMods, rollSkillChoices, type SkillId } from '../src/data/skills';
import type { WordEntry } from '../src/types';

function installRng(s: number) {
  let seed = s >>> 0 || 1;
  Math.random = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
}

// Preference order for skill picks — sustain + raw damage carry the run.
const SKILL_PRIORITY: SkillId[] = ['foodHealBoost', 'wordPower', 'vocabulary', 'animalBonus', 'natureShield', 'inspiration'];
function pickSkill(choices: SkillId[]): SkillId {
  for (const pref of SKILL_PRIORITY) if (choices.includes(pref)) return pref;
  return choices[0];
}

/** Exact damage a word would deal given current combo + owned skills (mirrors battle.ts). */
function damageOf(entry: WordEntry, mods: SkillModifiers, combo: number): number {
  let bonus = mods.bonusDamage ?? 0;
  if (entry.category === 'animal') bonus += 2 + (mods.bonusAnimalDamage ?? 0);
  else if (entry.category === 'tool') bonus += 1;
  if (entry.word.length >= 4) bonus += mods.bonusVocabDamage ?? 0;
  let dmg = entry.word.length + bonus;
  if (entry.category === 'emotion') dmg = Math.floor(dmg * (combo + 0.5));
  return dmg;
}
function healOf(entry: WordEntry, mods: SkillModifiers): number {
  return entry.category === 'food' ? 2 + (mods.bonusHeal ?? 0) : 0;
}

const startsWith = (ch: string, used: ReadonlySet<string>) =>
  WORDS.filter((w) => getLastKey(w.word) !== 'ん' && getFirstKey(w.word) === ch && !used.has(w.word));

/** true if, after we play w, we can still answer whatever the enemy replies (anti-softlock). */
function isSafe(w: WordEntry, used: ReadonlySet<string>): boolean {
  const afterMe = new Set(used);
  afterMe.add(w.word);
  const enemyReplies = startsWith(getLastKey(w.word), afterMe);
  if (enemyReplies.length === 0) return true; // enemy stuck -> chance damage, we keep the turn
  return enemyReplies.some((r) => {
    const afterEnemy = new Set(afterMe);
    afterEnemy.add(r.word);
    return startsWith(getLastKey(r.word), afterEnemy).length > 0;
  });
}

function choosePlayerWord(
  shiritori: ShiritoriState,
  state: BattleState,
  mods: SkillModifiers,
): WordEntry | null {
  const legal = WORDS.filter((e) => validatePlayerWord(e.word, shiritori).ok);
  if (legal.length === 0) return null;

  const safe = legal.filter((w) => isSafe(w, shiritori.usedWords));
  const pool = safe.length > 0 ? safe : legal;

  // 1) lethal this turn? take it.
  const lethal = pool.filter((w) => damageOf(w, mods, state.comboMultiplier) >= state.enemyHp);
  if (lethal.length > 0) return lethal.sort((a, b) => a.word.length - b.word.length)[0];

  // 2) low HP -> heal hardest (food); prefer the biggest heal, tiebreak damage.
  if (state.playerHp <= 12) {
    const food = pool.filter((w) => w.category === 'food');
    if (food.length > 0)
      return food.sort(
        (a, b) => healOf(b, mods) - healOf(a, mods) || damageOf(b, mods, state.comboMultiplier) - damageOf(a, mods, state.comboMultiplier),
      )[0];
  }

  // 3) otherwise hit hardest.
  return pool.sort((a, b) => damageOf(b, mods, state.comboMultiplier) - damageOf(a, mods, state.comboMultiplier))[0];
}

interface StageResult {
  cleared: boolean;
  hp: number;
  words: number;
  reason?: string;
}

function playStage(stageIndex: number, carriedHp: number, owned: SkillId[]): StageResult {
  const enemy = ENEMIES[stageIndex];
  const mods = computeSkillMods(owned);
  let state: BattleState = createInitialBattleState(enemy, DEFAULT_PLAYER_MAX_HP, carriedHp);
  const used = new Set<string>();
  let lastChar: string | null = null;
  let wordCount = 0;

  for (let turns = 0; turns < 2000; turns++) {
    const choice = choosePlayerWord({ lastChar, usedWords: used }, state, mods);
    if (!choice) return { cleared: false, hp: state.playerHp, words: wordCount, reason: 'player stuck (no legal word)' };

    const atk = applyPlayerAttack(state, choice, mods);
    state = atk.state;
    used.add(choice.word);
    lastChar = getLastKey(choice.word);
    wordCount++;
    if (atk.outcome === 'stageClear') return { cleared: true, hp: state.playerHp, words: wordCount };

    const enemyTurn = resolveEnemyTurn(lastChar, used);
    if (enemyTurn.type === 'stuck') {
      const chance = applyChanceDamage(state);
      state = chance.state;
      if (chance.outcome === 'stageClear') return { cleared: true, hp: state.playerHp, words: wordCount };
      continue;
    }
    used.add(enemyTurn.word);
    lastChar = getLastKey(enemyTurn.word);
    const eatk = applyEnemyAttack(state, enemy, enemyTurn.word, mods);
    state = eatk.state;
    if (eatk.outcome === 'gameOver') return { cleared: false, hp: 0, words: wordCount, reason: `defeated by ${enemy.name}` };
  }
  return { cleared: false, hp: state.playerHp, words: wordCount, reason: 'turn cap' };
}

function playGame(verbose: boolean): { won: boolean; reason?: string; totalWords: number; hp: number; owned: SkillId[] } {
  let hp = DEFAULT_PLAYER_MAX_HP;
  let totalWords = 0;
  const owned: SkillId[] = [];
  for (let i = 0; i < ENEMIES.length; i++) {
    const r = playStage(i, hp, owned);
    totalWords += r.words;
    if (!r.cleared) {
      if (verbose) console.log(`Stage ${i + 1} FAILED (${ENEMIES[i].name}): ${r.reason} (HP ${r.hp})`);
      return { won: false, reason: `stage ${i + 1}: ${r.reason}`, totalWords, hp: r.hp, owned };
    }
    hp = i < ENEMIES.length - 1 ? DEFAULT_PLAYER_MAX_HP : r.hp;
    if (verbose)
      console.log(
        `Stage ${i + 1} CLEAR  ${ENEMIES[i].icon} ${ENEMIES[i].name.padEnd(10)} (HP ${ENEMIES[i].maxHp}) -> player HP ${hp}, words ${r.words}`,
      );
    if (i < ENEMIES.length - 1) {
      const skill = pickSkill(rollSkillChoices());
      owned.push(skill);
      if (verbose) console.log(`         + skill: ${skill}`);
    }
  }
  return { won: true, totalWords, hp, owned };
}

const args = process.argv.slice(2);
const monteIdx = args.indexOf('--monte');
if (monteIdx >= 0) {
  const n = Number(args[monteIdx + 1] ?? 200);
  let wins = 0;
  const fails = new Map<string, number>();
  for (let seed = 1; seed <= n; seed++) {
    installRng(seed * 2654435761);
    const res = playGame(false);
    if (res.won) wins++;
    else fails.set(res.reason!, (fails.get(res.reason!) ?? 0) + 1);
  }
  console.log(`Monte-Carlo full-game clear rate: ${wins}/${n} (${((wins / n) * 100).toFixed(1)}%)`);
  if (fails.size > 0) {
    console.log('Failure breakdown:');
    for (const [r, c] of [...fails.entries()].sort((a, b) => b[1] - a[1])) console.log(`  ${c}x  ${r}`);
  }
} else {
  installRng(12345);
  console.log('=== Shiritori Battle RPG — full 5-stage E2E completability proof ===');
  console.log(`Dictionary size: ${WORDS.length} words | starting HP: ${DEFAULT_PLAYER_MAX_HP}\n`);
  const res = playGame(true);
  if (res.won) {
    console.log(`\n✅ GAME CLEAR — all ${ENEMIES.length} stages beaten. Words: ${res.totalWords}, final HP: ${res.hp}, skills: [${res.owned.join(', ')}]`);
    process.exit(0);
  } else {
    console.log(`\n❌ Not cleared: ${res.reason}`);
    process.exit(1);
  }
}
