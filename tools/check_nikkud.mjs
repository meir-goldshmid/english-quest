// Checks the nikkud course: each word uses only marks taught so far, options are distinct, no letters without a vowel where one is needed.
//   node tools/check_nikkud.mjs
import { LESSONS, MARKS, DAGESH_PAIRS, nikkudTexts } from '../js/nikkud_data.js';
const ALWAYS = new Set(['ּ', 'ׁ', 'ׂ']);   // dagesh, shin dot, sin dot
const STEP = { n1: 'ָ', n2: 'ַ', n3: 'ִ', n4: 'ֵ', n5: 'ֶ', n6: 'ֹ', n7: 'ֻ', n8: 'ְ', n9: 'ֱֲֳ' };
let errors = 0; const fail = m => { errors++; console.log('✗', m); };
const allowed = new Set(ALWAYS);
const emojis = new Map(), words = new Map();
for (const L of LESSONS) {
  for (const c of STEP[L.id] || '') allowed.add(c);
  if (L.id === 'n10' || L.id === 'n11') for (let c = 0x05B0; c <= 0x05BB; c++) allowed.add(String.fromCharCode(c));
  for (const w of L.words) {
    for (const ch of w.he) if (/[֑-ׇ]/.test(ch) && !allowed.has(ch)) fail(`${L.id} ${w.he}: mark U+${ch.charCodeAt(0).toString(16)} not taught yet`);
    if (!w.em) fail(`${L.id} ${w.he}: no picture`);
    if (emojis.has(w.em)) fail(`${L.id} ${w.he}: picture ${w.em} also used by ${emojis.get(w.em)}`); emojis.set(w.em, w.he);
    if (words.has(w.he)) fail(`${w.he} twice`); words.set(w.he, 1);
    // every letter but the last should carry a vowel, shva, or be a vowel letter (ו/י/א/ה) after a vowel
    const cs = w.he.match(/[א-ת][֑-ׇ]*/g);
    cs.slice(0, -1).forEach((c, j) => { if (!/[ְ-ֻ]/.test(c) && !/^[וי]/.test(c) && !/^[אה]/.test(c) && !/^וּ/.test(c) && !/^ו[ֹּ]$/.test(cs[j + 1] || '')) fail(`${L.id} ${w.he}: letter ${j + 1} (${c}) has no vowel`); });
  }
  if (L.words.length && L.words.length < 8) fail(`${L.id}: needs at least 8 words`);
  for (const k of L.keys) if (!MARKS[k]) fail(`${L.id}: unknown mark ${k}`);
  (L.sentences || []).forEach(s => { if (new Set(s.slice(1)).size !== 3) fail(`${s[0]}: picture options not distinct`); });
  if (!L.lines?.length) fail(`${L.id}: no lines`);
}
if (DAGESH_PAIRS.length % 2) fail('dagesh pairs must come in pairs');
console.log(`${LESSONS.length} lessons, ${words.size} words, ${nikkudTexts().length} voice texts`);
if (errors) { console.log(errors, 'problem(s)'); process.exit(1); }
console.log('nikkud OK');
