import type { WordCategory, WordEntry } from '../types';
import { getFirstKey } from '../logic/kana';

export const CATEGORY_LABELS: Record<WordCategory, string> = {
  animal: 'どうぶつ',
  food: 'たべもの',
  nature: 'しぜん',
  tool: 'どうぐ',
  place: 'ばしょ',
  body: 'からだ',
  emotion: 'きもち',
  life: 'せいかつ',
  normal: 'ふつう',
};

export const WORDS: WordEntry[] = [
  // animal (20)
  { word: 'ねこ', category: 'animal' },
  { word: 'いぬ', category: 'animal' },
  { word: 'うさぎ', category: 'animal' },
  { word: 'きつね', category: 'animal' },
  { word: 'たぬき', category: 'animal' },
  { word: 'ぞう', category: 'animal' },
  { word: 'とら', category: 'animal' },
  { word: 'くま', category: 'animal' },
  { word: 'さる', category: 'animal' },
  { word: 'うま', category: 'animal' },
  { word: 'うし', category: 'animal' },
  { word: 'ぶた', category: 'animal' },
  { word: 'とり', category: 'animal' },
  { word: 'さかな', category: 'animal' },
  { word: 'かめ', category: 'animal' },
  { word: 'へび', category: 'animal' },
  { word: 'かえる', category: 'animal' },
  { word: 'くじら', category: 'animal' },
  { word: 'いるか', category: 'animal' },
  { word: 'ぱんだ', category: 'animal' },

  // food (20)
  { word: 'りんご', category: 'food' },
  { word: 'かき', category: 'food' },
  { word: 'いちご', category: 'food' },
  { word: 'すいか', category: 'food' },
  { word: 'もも', category: 'food' },
  { word: 'ぶどう', category: 'food' },
  { word: 'ばなな', category: 'food' },
  { word: 'たまご', category: 'food' },
  { word: 'とうふ', category: 'food' },
  { word: 'おにぎり', category: 'food' },
  { word: 'やさい', category: 'food' },
  { word: 'かぼちゃ', category: 'food' },
  { word: 'たまねぎ', category: 'food' },
  { word: 'ねぎ', category: 'food' },
  { word: 'なす', category: 'food' },
  { word: 'ちーず', category: 'food' },
  { word: 'けーき', category: 'food' },
  { word: 'かれー', category: 'food' },
  { word: 'こーひー', category: 'food' },
  { word: 'ぱすた', category: 'food' },

  // nature (20)
  { word: 'やま', category: 'nature' },
  { word: 'かわ', category: 'nature' },
  { word: 'うみ', category: 'nature' },
  { word: 'そら', category: 'nature' },
  { word: 'もり', category: 'nature' },
  { word: 'いけ', category: 'nature' },
  { word: 'はな', category: 'nature' },
  { word: 'くさ', category: 'nature' },
  { word: 'あめ', category: 'nature' },
  { word: 'ゆき', category: 'nature' },
  { word: 'かぜ', category: 'nature' },
  { word: 'つき', category: 'nature' },
  { word: 'ほし', category: 'nature' },
  { word: 'にじ', category: 'nature' },
  { word: 'いわ', category: 'nature' },
  { word: 'いし', category: 'nature' },
  { word: 'すな', category: 'nature' },
  { word: 'さくら', category: 'nature' },
  { word: 'たいよう', category: 'nature' },
  { word: 'みず', category: 'nature' },

  // tool (18)
  { word: 'かさ', category: 'tool' },
  { word: 'はさみ', category: 'tool' },
  { word: 'えんぴつ', category: 'tool' },
  { word: 'つくえ', category: 'tool' },
  { word: 'いす', category: 'tool' },
  { word: 'かがみ', category: 'tool' },
  { word: 'とけい', category: 'tool' },
  { word: 'でんわ', category: 'tool' },
  { word: 'くるま', category: 'tool' },
  { word: 'ふね', category: 'tool' },
  { word: 'なべ', category: 'tool' },
  { word: 'さら', category: 'tool' },
  { word: 'まくら', category: 'tool' },
  { word: 'くつ', category: 'tool' },
  { word: 'めがね', category: 'tool' },
  { word: 'たくしー', category: 'tool' },
  { word: 'でんしゃ', category: 'tool' },
  { word: 'のーと', category: 'tool' },

  // emotion (18)
  { word: 'えがお', category: 'emotion' },
  { word: 'よろこび', category: 'emotion' },
  { word: 'かなしみ', category: 'emotion' },
  { word: 'いかり', category: 'emotion' },
  { word: 'たのしみ', category: 'emotion' },
  { word: 'しあわせ', category: 'emotion' },
  { word: 'きぼう', category: 'emotion' },
  { word: 'ゆうき', category: 'emotion' },
  { word: 'どきどき', category: 'emotion' },
  { word: 'わくわく', category: 'emotion' },
  { word: 'すき', category: 'emotion' },
  { word: 'きらい', category: 'emotion' },
  { word: 'げんき', category: 'emotion' },
  { word: 'しんぱい', category: 'emotion' },
  { word: 'とくい', category: 'emotion' },
  { word: 'にがて', category: 'emotion' },
  { word: 'きんちょう', category: 'emotion' },
  { word: 'うれしさ', category: 'emotion' },

  // normal (18)
  { word: 'きょう', category: 'normal' },
  { word: 'あした', category: 'normal' },
  { word: 'なまえ', category: 'normal' },
  { word: 'ことば', category: 'normal' },
  { word: 'てがみ', category: 'normal' },
  { word: 'ひみつ', category: 'normal' },
  { word: 'たから', category: 'normal' },
  { word: 'なかま', category: 'normal' },
  { word: 'みち', category: 'normal' },
  { word: 'いろ', category: 'normal' },
  { word: 'かず', category: 'normal' },
  { word: 'もじ', category: 'normal' },
  { word: 'え', category: 'normal' },
  { word: 'とき', category: 'normal' },
  { word: 'ひと', category: 'normal' },
  { word: 'こども', category: 'normal' },
  { word: 'ともだち', category: 'normal' },
  { word: 'かぞく', category: 'normal' },

  // place (6) — kept small for future boss-gimmick category prep (see project notes)
  { word: 'いえ', category: 'place' },
  { word: 'へや', category: 'place' },
  { word: 'まち', category: 'place' },
  { word: 'がっこう', category: 'place' },
  { word: 'えき', category: 'place' },
  { word: 'みせ', category: 'place' },

  // body (6)
  { word: 'て', category: 'body' },
  { word: 'あし', category: 'body' },
  { word: 'め', category: 'body' },
  { word: 'みみ', category: 'body' },
  { word: 'くち', category: 'body' },
  { word: 'こころ', category: 'body' },

  // life (6)
  { word: 'あさ', category: 'life' },
  { word: 'ひる', category: 'life' },
  { word: 'よる', category: 'life' },
  { word: 'まつり', category: 'life' },
  { word: 'あそび', category: 'life' },
  { word: 'ゆめ', category: 'life' },
];

const WORD_INDEX = new Map(WORDS.map((entry) => [entry.word, entry]));

export const WORDS_BY_INITIAL = new Map<string, WordEntry[]>();

for (const entry of WORDS) {
  const initial = getFirstKey(entry.word);
  const candidates = WORDS_BY_INITIAL.get(initial);

  if (candidates) {
    candidates.push(entry);
  } else {
    WORDS_BY_INITIAL.set(initial, [entry]);
  }
}

export function findWord(word: string): WordEntry | undefined {
  return WORD_INDEX.get(word);
}

export function getWordsByInitial(initial: string): readonly WordEntry[] {
  return WORDS_BY_INITIAL.get(initial) ?? [];
}
