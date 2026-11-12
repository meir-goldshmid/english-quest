// Prints every text the app speaks as JSON: [{ text, lang, voice }]. Used by make_audio.py.
import { TRACKS } from '../js/curriculum.js';
const EN = 'en-US-JennyNeural', GIRL = 'en-US-AnaNeural', BOY = 'en-US-AndrewNeural', HE = 'he-IL-HilaNeural';
const GIRLS = new Set(['Maya', 'Lily', 'Noa', 'Yael']);
const out = new Map();
const add = (text, lang, voice = lang === 'he' ? HE : EN) => { if (text && !out.has(lang + '|' + text)) out.set(lang + '|' + text, { text, lang, voice }); };
for (const t of Object.values(TRACKS)) for (const u of t.units) {
  u.words.forEach(([e, h]) => { add(e, 'en'); add(h, 'he'); });
  u.sentences.forEach(([e, h]) => { add(e, 'en'); add(h, 'he'); });
  if (u.story) {
    u.story.lines.forEach(([who, e, h]) => { add(e, 'en', GIRLS.has(who) ? GIRL : BOY); add(h, 'he'); });
    u.story.questions.forEach(q => { add(q.q, 'en'); add(q.he, 'he'); q.options.forEach(o => add(o, 'en')); });
  }
  u.phonics?.words.forEach(w => add(w, 'en'));
  if (u.grammar) {
    u.grammar.examples.forEach(([e, h]) => { add(e, 'en'); add(h, 'he'); });
    u.gaps.forEach(g => { add(g.s.replace('___', /^no punctuation$/i.test(g.options[g.a]) ? '' : g.options[g.a]), 'en'); add(g.he, 'he'); });
    u.transforms.forEach(x => add(x.a, 'en'));
    add(u.reading.text, 'en');
  }
}
'abcdefghijklmnopqrstuvwxyz'.split('').forEach(c => add(c, 'en'));
['Great job!', 'Awesome!', 'Super!', 'Well done!', 'Excellent!', 'You got it!', 'Fantastic!', 'Perfect!', "Hello! Let's play!", 'Great!'].forEach(t => add(t, 'en'));
console.log(JSON.stringify([...out.values()]));
