import { ENEMIES } from '../src/data/enemies';
import { WORDS } from '../src/data/words';
import { createInitialBattleState, applyPlayerAttack, applyEnemyAttack, applyChanceDamage, DEFAULT_PLAYER_MAX_HP } from '../src/logic/battle';
import { validatePlayerWord, resolveEnemyTurn, getLastChar, endsWithN } from '../src/logic/shiritori';

let seed = 12345;
Math.random = () => { seed = (seed*1103515245+12345)&0x7fffffff; return seed/0x7fffffff; };

const enemy = ENEMIES[0];
let state = createInitialBattleState(enemy, DEFAULT_PLAYER_MAX_HP, DEFAULT_PLAYER_MAX_HP);
const used = new Set<string>();
let lastChar: string | null = null;
for (let t=0;t<40;t++){
  const legal = WORDS.filter(e=>validatePlayerWord(e.word,{lastChar,usedWords:used}).ok);
  if(legal.length===0){ console.log(`>>> PLAYER STUCK at lastChar="${lastChar}". words starting "${lastChar}" in dict:`, WORDS.filter(w=>w.word[0]===lastChar).map(w=>w.word)); break; }
  // pick longest that leaves a rich tail (max words starting with its tail)
  const pick = legal.map(w=>({w,tailCount:WORDS.filter(x=>x.word[0]===getLastChar(w.word)&&!used.has(x.word)).length,len:w.word.length}))
    .sort((a,b)=> b.tailCount-a.tailCount || b.len-a.len)[0].w;
  const atk = applyPlayerAttack(state, pick); state=atk.state; used.add(pick.word); lastChar=getLastChar(pick.word);
  console.log(`P: ${pick.word} -> enemyHP ${state.enemyHp}, tail=${lastChar}`);
  if(atk.outcome==='stageClear'){ console.log('CLEAR'); break; }
  const et = resolveEnemyTurn(lastChar, used);
  if(et.type==='stuck'){ const c=applyChanceDamage(state); state=c.state; console.log(`  E stuck -> chance, enemyHP ${state.enemyHp}`); if(c.outcome==='stageClear'){console.log('CLEAR');break;} continue; }
  used.add(et.word); lastChar=getLastChar(et.word);
  const e=applyEnemyAttack(state,enemy,et.word); state=e.state;
  console.log(`  E: ${et.word} -> playerHP ${state.playerHp}, tail=${lastChar}`);
  if(e.outcome==='gameOver'){console.log('GAME OVER');break;}
}
