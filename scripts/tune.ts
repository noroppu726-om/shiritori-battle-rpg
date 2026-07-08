/** Tuning harness: try candidate fixes and report full-game clear rate. */
import { ENEMIES } from '../src/data/enemies';
import { WORDS } from '../src/data/gameWords';
import {
  createInitialBattleState,
  applyPlayerAttack,
  applyEnemyAttack,
  applyChanceDamage,
  DEFAULT_PLAYER_MAX_HP,
  type BattleState,
  type SkillModifiers,
} from '../src/logic/battle';
import { validatePlayerWord, resolveEnemyTurn, getFirstKey, getLastKey, endsWithN, type ShiritoriState } from '../src/logic/shiritori';
import { computeSkillMods, rollSkillChoices, type SkillId } from '../src/data/skills';
import type { Enemy, WordEntry } from '../src/types';

function installRng(s: number) {
  let seed = s >>> 0 || 1;
  Math.random = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
}
const SKILL_PRIORITY: SkillId[] = ['foodHealBoost', 'wordPower', 'vocabulary', 'animalBonus', 'natureShield', 'inspiration'];
const pickSkill = (c: SkillId[]) => SKILL_PRIORITY.find((p) => c.includes(p)) ?? c[0];

function damageOf(e: WordEntry, m: SkillModifiers, combo: number): number {
  let b = m.bonusDamage ?? 0;
  if (e.category === 'animal') b += 2 + (m.bonusAnimalDamage ?? 0);
  else if (e.category === 'tool') b += 1;
  if (e.word.length >= 4) b += m.bonusVocabDamage ?? 0;
  let d = e.word.length + b;
  if (e.category === 'emotion') d = Math.floor(d * (combo + 0.5));
  return d;
}
const healOf = (e: WordEntry, m: SkillModifiers) => (e.category === 'food' ? 2 + (m.bonusHeal ?? 0) : 0);
const startsWith = (ch: string, used: ReadonlySet<string>) =>
  WORDS.filter((w) => getLastKey(w.word) !== 'ん' && getFirstKey(w.word) === ch && !used.has(w.word));
function isSafe(w: WordEntry, used: ReadonlySet<string>): boolean {
  const a = new Set(used); a.add(w.word);
  const r = startsWith(getLastKey(w.word), a);
  if (r.length === 0) return true;
  return r.some((x) => { const b = new Set(a); b.add(x.word); return startsWith(getLastKey(x.word), b).length > 0; });
}
function choose(sh: ShiritoriState, st: BattleState, m: SkillModifiers): WordEntry | null {
  const legal = WORDS.filter((e) => validatePlayerWord(e.word, sh).ok);
  if (legal.length === 0) return null;
  const safe = legal.filter((w) => isSafe(w, sh.usedWords));
  const pool = safe.length ? safe : legal;
  const lethal = pool.filter((w) => damageOf(w, m, st.comboMultiplier) >= st.enemyHp);
  if (lethal.length) return lethal.sort((a, b) => a.word.length - b.word.length)[0];
  if (st.playerHp <= 12) {
    const food = pool.filter((w) => w.category === 'food');
    if (food.length) return food.sort((a, b) => healOf(b, m) - healOf(a, m) || damageOf(b, m, st.comboMultiplier) - damageOf(a, m, st.comboMultiplier))[0];
  }
  return pool.sort((a, b) => damageOf(b, m, st.comboMultiplier) - damageOf(a, m, st.comboMultiplier))[0];
}

interface Opts { healFull: boolean; chainReset: boolean; enemies: Enemy[]; maxHp: number }

function playStage(i: number, carriedHp: number, owned: SkillId[], o: Opts) {
  const enemy = o.enemies[i];
  const m = computeSkillMods(owned);
  const startHp = o.healFull ? o.maxHp : carriedHp;
  let st = createInitialBattleState(enemy, o.maxHp, startHp);
  const used = new Set<string>();
  let lastChar: string | null = null;
  let words = 0;
  for (let t = 0; t < 3000; t++) {
    let choice = choose({ lastChar, usedWords: used }, st, m);
    if (!choice) {
      if (o.chainReset && lastChar !== null) { lastChar = null; choice = choose({ lastChar, usedWords: used }, st, m); }
      if (!choice) return { cleared: false, hp: st.playerHp, words, reason: 'stuck' };
    }
    const atk = applyPlayerAttack(st, choice, m); st = atk.state; used.add(choice.word); lastChar = getLastKey(choice.word); words++;
    if (atk.outcome === 'stageClear') return { cleared: true, hp: st.playerHp, words };
    const et = resolveEnemyTurn(lastChar, used);
    if (et.type === 'stuck') { const c = applyChanceDamage(st); st = c.state; if (c.outcome === 'stageClear') return { cleared: true, hp: st.playerHp, words }; continue; }
    used.add(et.word); lastChar = getLastKey(et.word);
    const e = applyEnemyAttack(st, enemy, et.word, m); st = e.state;
    if (e.outcome === 'gameOver') return { cleared: false, hp: 0, words, reason: 'dead' };
  }
  return { cleared: false, hp: st.playerHp, words, reason: 'cap' };
}
function playGame(o: Opts) {
  let hp = o.maxHp; const owned: SkillId[] = [];
  for (let i = 0; i < o.enemies.length; i++) {
    const r = playStage(i, hp, owned, o);
    if (!r.cleared) return { won: false, reason: `stage${i + 1}:${r.reason}` };
    hp = r.hp;
    if (i < o.enemies.length - 1) owned.push(pickSkill(rollSkillChoices()));
  }
  return { won: true };
}
function monte(o: Opts, n: number) {
  let wins = 0; const fails = new Map<string, number>();
  for (let s = 1; s <= n; s++) { installRng(s * 2654435761); const r = playGame(o); if (r.won) wins++; else fails.set(r.reason!, (fails.get(r.reason!) ?? 0) + 1); }
  return { wins, n, fails };
}

const N = 400;
function report(label: string, o: Opts) {
  const r = monte(o, N);
  const fb = [...r.fails.entries()].sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k}:${v}`).join('  ');
  console.log(`${label.padEnd(52)} ${((r.wins / r.n) * 100).toFixed(1).padStart(5)}%   ${fb}`);
}

const orig = ENEMIES;
const scaleAtk = (mult: number, sub = 0): Enemy[] => orig.map((e) => ({ ...e, attack: Math.max(1, Math.round(e.attack * mult) - sub) }));
const scaleHp = (mult: number): Enemy[] => orig.map((e) => ({ ...e, maxHp: Math.round(e.maxHp * mult) }));

console.log(`Candidates (clear rate over ${N} seeds):\n`);
report('A baseline (as shipped)', { healFull: false, chainReset: false, enemies: orig, maxHp: 20 });
report('B +chainReset', { healFull: false, chainReset: true, enemies: orig, maxHp: 20 });
report('C +chainReset +healFull', { healFull: true, chainReset: true, enemies: orig, maxHp: 20 });
report('D C + maxHp40', { healFull: true, chainReset: true, enemies: orig, maxHp: 40 });
report('E C + atk-2', { healFull: true, chainReset: true, enemies: scaleAtk(1, 2), maxHp: 20 });
report('F C + atk-3', { healFull: true, chainReset: true, enemies: scaleAtk(1, 3), maxHp: 20 });
report('G C + maxHp40 + atk-2', { healFull: true, chainReset: true, enemies: scaleAtk(1, 2), maxHp: 40 });
report('H C + maxHp40 + enemyHp*0.7', { healFull: true, chainReset: true, enemies: scaleHp(0.7), maxHp: 40 });
report('I maxHp40 + atk-2 + enemyHp*0.7', { healFull: true, chainReset: true, enemies: scaleHp(0.7).map((e) => ({ ...e, attack: Math.max(1, e.attack - 2) })), maxHp: 40 });

console.log('\nClean candidates:');
const table = (hp: number[], atk: number[]): Enemy[] => orig.map((e, i) => ({ ...e, maxHp: hp[i], attack: atk[i] }));
report('J maxHp30 heal + [18,26,34,44,56]/[2,3,4,5,6]', { healFull: true, chainReset: true, maxHp: 30, enemies: table([18, 26, 34, 44, 56], [2, 3, 4, 5, 6]) });
report('K maxHp30 heal + [18,26,34,44,55]/[2,2,3,3,4]', { healFull: true, chainReset: true, maxHp: 30, enemies: table([18, 26, 34, 44, 55], [2, 2, 3, 3, 4]) });
report('L maxHp30 heal + orig HP + [2,3,3,4,5]', { healFull: true, chainReset: true, maxHp: 30, enemies: table([20, 30, 40, 55, 75], [2, 3, 3, 4, 5]) });
report('M maxHp40 heal + orig HP + [2,3,4,4,5]', { healFull: true, chainReset: true, maxHp: 40, enemies: table([20, 30, 40, 55, 75], [2, 3, 4, 4, 5]) });
report('N maxHp30 heal + [20,28,36,46,58]/[2,3,3,4,4]', { healFull: true, chainReset: true, maxHp: 30, enemies: table([20, 28, 36, 46, 58], [2, 3, 3, 4, 4]) });
