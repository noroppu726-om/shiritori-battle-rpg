import type { Enemy, WordEntry } from '../types';

/** R8 */
const ANIMAL_DAMAGE_BONUS = 2; // R9
const TOOL_DAMAGE_BONUS = 1; // R12
const FOOD_HEAL_AMOUNT = 2; // R10
const NATURE_DEFENSE_REDUCTION = 2; // R11
const EMOTION_COMBO_STEP = 0.5; // R13
const CHANCE_DAMAGE = 3; // R7: enemy can't reply, player gets a free hit

export const DEFAULT_PLAYER_MAX_HP = 20;

/**
 * Flat modifiers contributed by the player's owned skills (see
 * data/skills.ts computeSkillMods). All default to 0 so battle math works
 * unchanged before skills are wired in.
 */
export interface SkillModifiers {
  /** R27: applies to every word regardless of category */
  bonusDamage?: number;
  /** R28: applies only to food-category heals */
  bonusHeal?: number;
  /** R30: applies only to nature-category defense */
  bonusDefense?: number;
  /** R29: applies only to animal-category damage */
  bonusAnimalDamage?: number;
  /** R32: applies only when the word is 4+ characters long */
  bonusVocabDamage?: number;
}

export interface BattleState {
  playerHp: number;
  playerMaxHp: number;
  enemyHp: number;
  enemyMaxHp: number;
  /** R11: damage reduction queued for the *next* enemy attack only */
  pendingDefense: number;
  /** R13: multiplier built up by consecutive emotion words; reset after the enemy's turn */
  comboMultiplier: number;
}

export type BattleOutcome = 'ongoing' | 'gameOver' | 'stageClear';

export interface PlayerAttackResult {
  state: BattleState;
  damageDealt: number;
  messages: string[];
  outcome: BattleOutcome;
}

export interface EnemyAttackResult {
  state: BattleState;
  damageTaken: number;
  messages: string[];
  outcome: BattleOutcome;
}

export interface TurnTimeoutResult extends EnemyAttackResult {
  timeoutConsumed: boolean;
}

function round1(value: number): number {
  return Math.round(value * 10) / 10;
}

/** R16/R17: fresh battle state for a stage, before any words are exchanged */
export function createInitialBattleState(
  enemy: Enemy,
  playerMaxHp: number = DEFAULT_PLAYER_MAX_HP,
  playerHp: number = playerMaxHp,
): BattleState {
  return {
    playerHp: Math.min(playerMaxHp, Math.max(0, playerHp)),
    playerMaxHp,
    enemyHp: enemy.maxHp,
    enemyMaxHp: enemy.maxHp,
    pendingDefense: 0,
    comboMultiplier: 1,
  };
}

/**
 * R8-R14: resolves the player's attack for one valid word. Category effects
 * (animal/food/nature/tool/emotion/normal) are applied here; skill bonuses
 * (R27-R32, see data/skills.ts computeSkillMods) are additive on top.
 */
export function applyPlayerAttack(
  state: BattleState,
  entry: WordEntry,
  skills: SkillModifiers = {},
): PlayerAttackResult {
  const messages: string[] = [];
  let comboMultiplier = state.comboMultiplier;

  if (entry.category === 'emotion') {
    comboMultiplier = round1(comboMultiplier + EMOTION_COMBO_STEP);
  }

  const baseDamage = entry.word.length; // R8
  let bonusDamage = skills.bonusDamage ?? 0; // R27

  if (entry.category === 'animal') {
    bonusDamage += ANIMAL_DAMAGE_BONUS + (skills.bonusAnimalDamage ?? 0); // R9, R29
  } else if (entry.category === 'tool') {
    bonusDamage += TOOL_DAMAGE_BONUS; // R12
  }

  if (entry.word.length >= 4) {
    bonusDamage += skills.bonusVocabDamage ?? 0; // R32
  }

  let damageDealt = baseDamage + bonusDamage;
  if (entry.category === 'emotion') {
    // R13: combo multiplier compounds with each consecutive emotion word
    damageDealt = Math.floor(damageDealt * comboMultiplier);
  }

  messages.push(`ダメージ${damageDealt}！`);

  const enemyHp = Math.max(0, state.enemyHp - damageDealt);

  let playerHp = state.playerHp;
  if (entry.category === 'food') {
    const healAmount = FOOD_HEAL_AMOUNT + (skills.bonusHeal ?? 0); // R10
    playerHp = Math.min(state.playerMaxHp, playerHp + healAmount);
    messages.push(`プレイヤーのHPが${healAmount}回復した！`);
  }

  let pendingDefense = state.pendingDefense;
  if (entry.category === 'nature') {
    pendingDefense += NATURE_DEFENSE_REDUCTION + (skills.bonusDefense ?? 0); // R11
    messages.push('つぎの敵の攻撃ダメージが2やわらぐ！');
  }

  const outcome: BattleOutcome = enemyHp <= 0 ? 'stageClear' : 'ongoing';
  if (outcome === 'stageClear') {
    messages.push('ステージクリア！');
  }

  return {
    state: {
      ...state,
      enemyHp,
      playerHp,
      pendingDefense,
      comboMultiplier,
    },
    damageDealt,
    messages,
    outcome,
  };
}

/**
 * R15: resolves the enemy's attack for one valid word it replies with.
 * Any pending nature defense (R11) mitigates the damage and is then cleared;
 * the emotion combo (R13) also resets once the enemy's turn resolves.
 */
export function applyEnemyAttack(
  state: BattleState,
  enemy: Enemy,
  word: string,
  skills: SkillModifiers = {},
): EnemyAttackResult {
  const messages: string[] = [];

  const rawDamage = enemy.attack + Math.floor(word.length / 3);
  const totalDefense = state.pendingDefense;
  const damageTaken = Math.max(0, rawDamage - totalDefense);

  if (state.pendingDefense > 0) {
    messages.push(`しぜんの効果で敵の攻撃を${state.pendingDefense}やわらげた！`);
  }
  messages.push(`敵の攻撃！ダメージ${damageTaken}！`);

  const playerHp = Math.max(0, state.playerHp - damageTaken);

  const outcome: BattleOutcome = playerHp <= 0 ? 'gameOver' : 'ongoing';
  if (outcome === 'gameOver') {
    messages.push('ゲームオーバー...');
  }

  return {
    state: {
      ...state,
      playerHp,
      pendingDefense: 0, // R11: mitigation is consumed whether or not it was used
      comboMultiplier: 1, // R13: combo resets after the enemy's turn
    },
    damageTaken,
    messages,
    outcome,
  };
}

/**
 * R7: the enemy has no valid word to reply with. The player still gets a
 * "chance damage" hit on the enemy so the battle keeps moving forward
 * instead of stalling; this can finish off the enemy just like a normal
 * attack.
 */
export function applyChanceDamage(state: BattleState): PlayerAttackResult {
  const enemyHp = Math.max(0, state.enemyHp - CHANCE_DAMAGE);
  const outcome: BattleOutcome = enemyHp <= 0 ? 'stageClear' : 'ongoing';
  const messages = ['敵が言葉につまった！チャンスダメージ！'];
  if (outcome === 'stageClear') {
    messages.push('ステージクリア！');
  }

  return {
    state: { ...state, enemyHp },
    damageDealt: CHANCE_DAMAGE,
    messages,
    outcome,
  };
}

/**
 * R19: resolves a player turn timeout before a word is submitted. The timeout
 * damage uses the enemy's attack value, consumes pending defense like a normal
 * enemy turn, then returns control to the next player turn unless HP reaches 0.
 *
 * `canPreventTimeout` is intentionally a callback so T7 skills such as
 * "ひらめき" can intercept and consume one timeout without this module needing
 * to know skill inventory details.
 */
export function applyTurnTimeout(
  state: BattleState,
  enemy: Enemy,
  options: {
    skills?: SkillModifiers;
    canPreventTimeout?: () => boolean;
  } = {},
): TurnTimeoutResult {
  if (options.canPreventTimeout?.()) {
    return {
      state,
      damageTaken: 0,
      messages: ['ひらめきで時間切れを防いだ！'],
      outcome: 'ongoing',
      timeoutConsumed: false,
    };
  }

  const messages: string[] = ['時間切れ！敵からダメージを受けた'];
  const totalDefense = state.pendingDefense;
  const damageTaken = Math.max(0, enemy.attack - totalDefense);

  if (state.pendingDefense > 0) {
    messages.push(`しぜんの効果で敵の攻撃を${state.pendingDefense}やわらげた！`);
  }
  messages.push(`敵の攻撃！ダメージ${damageTaken}！`);

  const playerHp = Math.max(0, state.playerHp - damageTaken);
  const outcome: BattleOutcome = playerHp <= 0 ? 'gameOver' : 'ongoing';
  if (outcome === 'gameOver') {
    messages.push('ゲームオーバー...');
  }

  return {
    state: {
      ...state,
      playerHp,
      pendingDefense: 0,
      comboMultiplier: 1,
    },
    damageTaken,
    messages,
    outcome,
    timeoutConsumed: true,
  };
}
