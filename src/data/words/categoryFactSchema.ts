export const categoryFactSchema = {
  'どうぶつ': ['habitat', 'size', 'color', 'body', 'movement', 'sound', 'group'],
  'むし・みずのいきもの': ['habitat', 'size', 'color', 'body', 'movement', 'group'],
  'たべもの': ['foodType', 'color', 'taste', 'shape', 'scene', 'temperature'],
  'のみもの': ['drinkType', 'color', 'taste', 'temperature', 'scene'],
  'のりもの': ['place', 'movement', 'size', 'fuel', 'rideCount'],
  'どうぐ': ['use', 'place', 'material', 'size'],
  'いえ・くらし': ['room', 'use', 'place', 'material', 'size'],
  'がっこう': ['place', 'use', 'subject', 'person', 'scene'],
  'まち・しせつ': ['placeType', 'use', 'person', 'transport'],
  'しぜん': ['place', 'color', 'size', 'weather', 'season', 'material'],
  'しょくぶつ': ['plantType', 'color', 'season', 'part', 'place'],
  'てんき・きせつ': ['weather', 'season', 'temperature', 'scene', 'color'],
  'からだ': ['bodyPartType', 'position', 'use', 'sense'],
  'きもち': ['emotionTone', 'intensity', 'scene', 'expression'],
  'うごき・アクション': ['movementType', 'place', 'body', 'scene', 'speed'],
  'あそび': ['playType', 'place', 'tool', 'people', 'season'],
  'スポーツ': ['sportType', 'place', 'tool', 'people', 'movement'],
  'おんがく': ['musicType', 'instrumentType', 'sound', 'scene', 'people'],
  'ふく・もちもの': ['itemType', 'wearPlace', 'color', 'material', 'scene'],
  'しごと・ひと': ['jobType', 'place', 'tool', 'helpsWith', 'people'],
  'いろ・かたち': ['color', 'shape', 'size', 'pattern', 'feel'],
  'ぎょうじ・イベント': ['eventType', 'season', 'place', 'scene', 'people'],
  'ファンタジー・ものがたり': ['storyType', 'role', 'magic', 'place', 'mood'],
  'カタカナ語': ['loanType', 'place', 'use', 'scene', 'category'],
  'そのた日常語': ['dailyType', 'time', 'place', 'scene', 'relation'],
} as const;

export type WordQuestCategory = keyof typeof categoryFactSchema;
export type CategoryFactKey<C extends WordQuestCategory = WordQuestCategory> =
  (typeof categoryFactSchema)[C][number];

export function allowedFactKeysFor(category: string): readonly string[] {
  return category in categoryFactSchema
    ? categoryFactSchema[category as WordQuestCategory]
    : [];
}

export function isKnownFactKeyForCategory(category: string, key: string): boolean {
  const allowedKeys = allowedFactKeysFor(category);
  return allowedKeys.length === 0 || allowedKeys.includes(key);
}
