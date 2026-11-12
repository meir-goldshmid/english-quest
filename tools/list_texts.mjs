// Prints every text the app speaks as JSON lines: [{ text, lang, voice }]. Used by make_audio.py.
import { UNITS } from '../js/content.js';
const EN = 'en-US-JennyNeural', GIRL = 'en-US-AnaNeural', BOY = 'en-US-AndrewNeural', HE = 'he-IL-HilaNeural';
const GIRLS = new Set(['Maya', 'Lily', 'Noa']);
const out = new Map();
const add = (text, lang, voice) => { if (text && !out.has(lang + '|' + text)) out.set(lang + '|' + text, { text, lang, voice }); };
for (const u of UNITS) {
  u.words.forEach(([e, h]) => { add(e, 'en', EN); add(h, 'he', HE); });
  u.sentences.forEach(([e, h]) => { add(e, 'en', EN); add(h, 'he', HE); });
  u.story.lines.forEach(([who, e, h]) => { add(e, 'en', GIRLS.has(who) ? GIRL : BOY); add(h, 'he', HE); });
  u.story.questions.forEach(q => { add(q.q, 'en', EN); add(q.he, 'he', HE); q.options.forEach(o => add(o, 'en', EN)); });
}
'abcdefghijklmnopqrstuvwxyz'.split('').forEach(c => add(c, 'en', EN));
['Great job!', 'Awesome!', 'Super!', 'Well done!', 'Excellent!', 'You got it!', 'Fantastic!', 'Perfect!', "Hello! Let's play!", 'Great!'].forEach(t => add(t, 'en', EN));
console.log(JSON.stringify([...out.values()]));
