export type WordCategory =
  | 'animal'
  | 'food'
  | 'nature'
  | 'tool'
  | 'place'
  | 'body'
  | 'emotion'
  | 'life'
  | 'normal';

export interface WordEntry {
  word: string;
  category: WordCategory;
}

export interface Enemy {
  name: string;
  maxHp: number;
  attack: number;
  description: string;
  icon: string;
}
