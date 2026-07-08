const KATAKANA_START = 0x30a1;
const KATAKANA_END = 0x30f6;
const HIRAGANA_OFFSET = 0x60;

const SMALL_KANA_TO_SAFE_LAST: Record<string, string> = {
  ぁ: 'あ',
  ぃ: 'い',
  ぅ: 'う',
  ぇ: 'え',
  ぉ: 'お',
  っ: 'つ',
  ゃ: 'や',
  ゅ: 'ゆ',
  ょ: 'よ',
  ゎ: 'わ',
};

const SMALL_YOON = new Set(['ゃ', 'ゅ', 'ょ']);

function katakanaToHiragana(value: string): string {
  return [...value]
    .map((char) => {
      const code = char.charCodeAt(0);
      if (code >= KATAKANA_START && code <= KATAKANA_END) {
        return String.fromCharCode(code - HIRAGANA_OFFSET);
      }
      return char;
    })
    .join('');
}

export function normalizeKana(input: string): string {
  return katakanaToHiragana(input.normalize('NFKC')).replace(/\s+/g, '').trim();
}

export function getFirstKana(input: string): string {
  const normalized = normalizeKana(input);
  const [first = '', second = ''] = [...normalized];
  return second !== '' && SMALL_YOON.has(second) ? `${first}${second}` : first;
}

export function getLastKana(input: string): string {
  const chars = [...normalizeKana(input)];
  while (chars.length > 1 && chars.at(-1) === 'ー') {
    chars.pop();
  }

  const last = chars.at(-1) ?? '';
  if (chars.length > 1 && SMALL_YOON.has(last)) {
    return `${chars.at(-2) ?? ''}${last}`;
  }
  return SMALL_KANA_TO_SAFE_LAST[last] ?? last;
}

export function getKanaLength(input: string): number {
  return [...normalizeKana(input)].length;
}

export function getKanaInfo(input: string) {
  const normalized = normalizeKana(input);
  return {
    normalized,
    first: getFirstKana(normalized),
    last: getLastKana(normalized),
    length: getKanaLength(normalized),
  };
}
