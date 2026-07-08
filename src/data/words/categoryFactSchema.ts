export const categoryFactSchema = {
  'どうぶつ': ['habitat', 'size', 'color', 'body', 'movement', 'sound'],
  'たべもの': ['foodType', 'color', 'taste', 'shape', 'scene', 'temperature'],
  'のりもの': ['place', 'movement', 'size', 'fuel', 'rideCount'],
  'どうぐ': ['use', 'place', 'material', 'size'],
  'きもち': ['emotionTone', 'intensity', 'scene', 'expression'],
  'しぜん': ['place', 'color', 'size', 'weather', 'season'],
  'からだ': ['bodyPartType', 'position', 'use'],
  'がっこう': ['place', 'use', 'subject', 'person'],
  'いえ': ['room', 'use', 'place', 'material'],
  'まち': ['placeType', 'use', 'person', 'transport'],
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
