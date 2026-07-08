import { WORDS } from '../src/data/words';
import { validatePlayerWord, isHiragana, isInDictionary } from '../src/logic/shiritori';
const s = { lastChar: null, usedWords: new Set<string>() };
let ok=0; const fails: string[]=[];
for (const e of WORDS) {
  const v = validatePlayerWord(e.word, s);
  if (v.ok) ok++; else fails.push(e.word+':'+v.reason);
}
console.log('legal at start:', ok, '/', WORDS.length);
console.log('sample fails:', fails.slice(0,10));
console.log('ねこ hiragana?', isHiragana('ねこ'), 'inDict?', isInDictionary('ねこ'));
