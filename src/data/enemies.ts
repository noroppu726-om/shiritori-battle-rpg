import type { Enemy } from '../types';

export const STAGE_1_ENEMY: Enemy = {
  name: 'ことばスライム',
  maxHp: 20,
  attack: 3,
  description: '最初に出会う小さなことばモンスター',
  icon: '🟢',
};

export const ENEMIES: Enemy[] = [
  STAGE_1_ENEMY,
  {
    name: 'もじゴブリン',
    maxHp: 30,
    attack: 4,
    description: '短い言葉で攻めてくるいたずら好き',
    icon: '👺',
  },
  {
    name: 'かなドラキー',
    maxHp: 40,
    attack: 5,
    description: '空から言葉を奪うすばしっこい敵',
    icon: '🦇',
  },
  {
    name: 'しりとりナイト',
    maxHp: 55,
    attack: 6,
    description: 'しりとりの掟を守る強敵',
    icon: '🛡️',
  },
  {
    name: 'ことばドラゴン',
    maxHp: 75,
    attack: 8,
    description: 'ことばの王国を沈黙させた最後のボス',
    icon: '🐉',
  },
];

export function getEnemyByStage(stage: number): Enemy | undefined {
  return ENEMIES[stage - 1];
}
