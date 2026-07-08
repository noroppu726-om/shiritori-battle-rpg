import { WORDS } from '../src/data/words';
const heads = new Set(WORDS.map(w=>w.word[0]));
const tails = new Set(WORDS.map(w=>w.word[w.word.length-1]));
// sink = a tail char (not ん) that no word starts with
const sinks = [...tails].filter(c=>c!=='ん' && !heads.has(c));
console.log('total words:', WORDS.length);
console.log('distinct head chars:', [...heads].sort().join(''));
console.log('SINK chars (tail exists, no head):', sinks.join(' '));
for(const s of sinks){
  const enders = WORDS.filter(w=>w.word[w.word.length-1]===s).map(w=>w.word);
  console.log(`  "${s}" <- ends: ${enders.join(', ')}`);
}
// also heads with very few words (fragile)
const headCount = new Map<string,number>();
for(const w of WORDS){ headCount.set(w.word[0], (headCount.get(w.word[0])??0)+1); }
const thin = [...headCount.entries()].filter(([,n])=>n===1).map(([c,n])=>`${c}:${n}`);
console.log('head chars with only 1 word:', thin.join(' '));
