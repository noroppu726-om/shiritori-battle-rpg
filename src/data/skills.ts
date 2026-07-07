import type { SkillModifiers } from '../logic/battle';

export type SkillId =
  | 'wordPower' // R27: 文字の力
  | 'foodHealBoost' // R28: たべもの回復強化
  | 'animalBonus' // R29: どうぶつ特攻
  | 'natureShield' // R30: 自然の守り
  | 'inspiration' // R31: ひらめき
  | 'vocabulary'; // R32: 語彙力

export interface SkillDefinition {
  id: SkillId;
  name: string;
  description: string;
}

/** R26-R32: the full pool of obtainable skills */
export const SKILLS: SkillDefinition[] = [
  { id: 'wordPower', name: '文字の力', description: 'すべての単語ダメージ+1' },
  { id: 'foodHealBoost', name: 'たべもの回復強化', description: 'foodの回復量+2' },
  { id: 'animalBonus', name: 'どうぶつ特攻', description: 'animalの追加ダメージ+2' },
  { id: 'natureShield', name: '自然の守り', description: 'natureの軽減量+2' },
  { id: 'inspiration', name: 'ひらめき', description: '1バトルに1回だけ時間切れを無効化' },
  { id: 'vocabulary', name: '語彙力', description: '4文字以上の単語ダメージ+2' },
];

const SKILL_BY_ID = new Map(SKILLS.map((skill) => [skill.id, skill]));

export function getSkillDefinition(id: SkillId): SkillDefinition | undefined {
  return SKILL_BY_ID.get(id);
}

function countSkill(ownedSkills: readonly SkillId[], id: SkillId): number {
  return ownedSkills.filter((skillId) => skillId === id).length;
}

/**
 * R57: aggregates the player's owned skills (an array, so duplicates simply
 * appear multiple times) into the flat modifiers T5's battle math expects.
 * Stacking is linear: N copies of a skill contribute N x its per-copy effect.
 */
export function computeSkillMods(ownedSkills: readonly SkillId[]): SkillModifiers {
  return {
    bonusDamage: countSkill(ownedSkills, 'wordPower') * 1, // R27
    bonusHeal: countSkill(ownedSkills, 'foodHealBoost') * 2, // R28
    bonusAnimalDamage: countSkill(ownedSkills, 'animalBonus') * 2, // R29
    bonusDefense: countSkill(ownedSkills, 'natureShield') * 2, // R30
    bonusVocabDamage: countSkill(ownedSkills, 'vocabulary') * 2, // R32 (word.length >= 4 only, enforced in battle.ts)
  };
}

/** R26: draws 3 random, distinct skill candidates from the full pool */
export function rollSkillChoices(): SkillId[] {
  const pool = SKILLS.map((skill) => skill.id);
  const choices: SkillId[] = [];

  for (let i = 0; i < 3 && pool.length > 0; i += 1) {
    const index = Math.floor(Math.random() * pool.length);
    choices.push(pool[index]);
    pool.splice(index, 1);
  }

  return choices;
}

/**
 * R31: per-battle state tracking whether "ひらめき" is still available.
 * Create a fresh instance at the start of every battle so the once-per-battle
 * limit resets regardless of how many times the skill has been obtained.
 */
export interface SkillBattleRuntime {
  hiramekiAvailable: boolean;
}

export function createSkillBattleRuntime(ownedSkills: readonly SkillId[]): SkillBattleRuntime {
  return {
    hiramekiAvailable: countSkill(ownedSkills, 'inspiration') > 0,
  };
}

/**
 * Consumes "ひらめき" if it is still available this battle. Intended to be
 * passed (or wrapped) as the `canPreventTimeout` callback for T5's
 * applyTurnTimeout and as `onBeforeTimeout` for T6's useTurnTimer hook.
 */
export function tryConsumeHirameki(runtime: SkillBattleRuntime): boolean {
  if (!runtime.hiramekiAvailable) {
    return false;
  }
  runtime.hiramekiAvailable = false;
  return true;
}
