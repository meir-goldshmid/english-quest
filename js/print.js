// Printable A4 worksheets built from the same curriculum as the game.
import { UNITS } from './content.js';
import { h } from './ui.js';
import { rng, hash } from './levels.js';

const KINDS = [
  { id: 'dict', name: 'מילון תמונות + העתקה', he: 'קרא, הקשב (במשחק) והעתק כל מילה פעמיים' },
  { id: 'match', name: 'התאמה', he: 'מתח קו בין המילה באנגלית לתמונה' },
  { id: 'missing', name: 'אותיות חסרות', he: 'השלם את האותיות החסרות' },
  { id: 'scramble', name: 'אותיות מבולגנות', he: 'סדר את האותיות וכתוב את המילה' },
  { id: 'search', name: 'תפזורת', he: 'מצא את המילים בתפזורת וסמן אותן' },
  { id: 'sentences', name: 'בונים משפטים', he: 'סדר את המילים למשפט וכתוב אותו' },
  { id: 'story', name: 'קריאת סיפור', he: 'קרא את הסיפור וענה על השאלות' },
];
const $ = s => document.querySelector(s);
const sel = $('#unit'), kindsBox = $('#kinds'), out = $('#sheets');
let salt = 0;
UNITS.forEach((u, i) => sel.append(h('option', { value: i }, `${i + 1}. ${u.title} · ${u.he}`)));
const saved = JSON.parse(localStorage.getItem('eq-print') || '{}');
if (saved.unit != null) sel.value = saved.unit;
KINDS.forEach(k => kindsBox.append(h('label', {}, h('input', { type: 'checkbox', value: k.id, checked: (saved.kinds || KINDS.map(x => x.id)).includes(k.id) ? true : null }), k.name)));

const single = w => /^[a-z]{2,9}$/.test(w);
function shuffle(a, R) { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(R() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

function sheet(u, i, kind, ...body) {
  return h('section.sheet', {},
    h('div.sh-head', {},
      h('div.brand', { dir: 'ltr' }, 'English ', h('b', {}, 'Quest'), ` · World ${i + 1}: ${u.title} ${u.em}`),
      h('div.name', {}, 'שם: ______________   תאריך: __________')),
    h('h2', {}, kind.name, ' ', h('small', { dir: 'ltr' }, '')),
    h('p.instr', {}, kind.he),
    ...body);
}
const lines = (n = 1) => [...Array(n)].map(() => h('div.hw'));

const BUILD = {
  dict(u, i, R, k) {
    const ws = u.words.slice(0, 14);
    return [sheet(u, i, k, h('table.dict', {}, ws.map(([e, he, em]) =>
      h('tr', {}, h('td.em', {}, em || '•'), h('td.word', { dir: 'ltr' }, e), h('td.he', {}, he), h('td.copy', {}, lines(1))))))];
  },
  match(u, i, R, k, key) {
    const ws = shuffle(u.words.filter(w => w[2]), R).slice(0, 10);
    const right = shuffle(ws, R);
    key.push(['התאמה', ws.map(w => `${w[0]} – ${w[2]}`).join('   ')]);
    return [sheet(u, i, k, h('div.match', { dir: 'ltr' },
      h('div.col', {}, ws.map(w => h('div.mi', {}, h('span', {}, w[0]), h('i.dot')))),
      h('div.col.r', {}, right.map(w => h('div.mi', {}, h('i.dot'), h('span.em', {}, w[2]), h('small', {}, w[1]))))))];
  },
  missing(u, i, R, k, key) {
    const ws = shuffle(u.words.filter(w => single(w[0]) && w[0].length >= 3), R).slice(0, 10);
    key.push(['אותיות חסרות', ws.map(w => w[0]).join(', ')]);
    return [sheet(u, i, k, h('div.grid2', {}, ws.map(([e, he, em]) => {
      const idx = new Set(); const n = e.length > 5 ? 2 : 1;
      while (idx.size < n) idx.add(Math.floor(R() * e.length));
      return h('div.box', {}, h('div.em', {}, em || ''), h('div.he', {}, he), h('div.gap', { dir: 'ltr' }, [...e].map((c, j) => idx.has(j) ? h('span.blank', {}, ' ') : h('span', {}, c))));
    })))];
  },
  scramble(u, i, R, k, key) {
    const ws = shuffle(u.words.filter(w => single(w[0]) && w[0].length >= 3), R).slice(0, 8);
    key.push(['אותיות מבולגנות', ws.map(w => w[0]).join(', ')]);
    return [sheet(u, i, k, h('div.grid2', {}, ws.map(([e, he, em]) => {
      let s = e; for (let t = 0; t < 6 && s === e; t++) s = shuffle([...e], R).join('');
      return h('div.box', {}, h('div.em', {}, em || ''), h('div.he', {}, he), h('div.scr', { dir: 'ltr' }, [...s].join(' ')), lines(1));
    })))];
  },
  search(u, i, R, k, key) {
    const N = 12, grid = [...Array(N)].map(() => Array(N).fill(''));
    const ws = shuffle(u.words.filter(w => single(w[0]) && w[0].length <= 10), R);
    const placed = [];
    for (const w of ws) {
      if (placed.length >= 10) break;
      const word = w[0];
      for (let t = 0; t < 80; t++) {
        const dir = R() < 0.5 ? [1, 0] : R() < 0.7 ? [0, 1] : [1, 1];
        const x = Math.floor(R() * (N - dir[0] * (word.length - 1))), y = Math.floor(R() * (N - dir[1] * (word.length - 1)));
        if ([...word].every((c, j) => !grid[y + dir[1] * j][x + dir[0] * j] || grid[y + dir[1] * j][x + dir[0] * j] === c)) {
          [...word].forEach((c, j) => { grid[y + dir[1] * j][x + dir[0] * j] = c; });
          placed.push(w); break;
        }
      }
    }
    const abc = 'abcdefghijklmnopqrstuvwxyz';
    const filled = grid.map(r => r.map(c => c || abc[Math.floor(R() * 26)]));
    key.push(['תפזורת', placed.map(w => w[0]).join(', ')]);
    return [sheet(u, i, k,
      h('table.search', { dir: 'ltr' }, filled.map(r => h('tr', {}, r.map(c => h('td', {}, c))))),
      h('div.wordbank', { dir: 'ltr' }, placed.map(w => h('span', {}, `${w[2] || ''} ${w[0]}`))))];
  },
  sentences(u, i, R, k, key) {
    const ss = shuffle(u.sentences, R).slice(0, 6);
    key.push(['בונים משפטים', ss.map(s => s[0]).join('  |  ')]);
    return [sheet(u, i, k, h('ol.sent', {}, ss.map(([e, he]) => {
      const toks = e.replace(/[.,!?]/g, '').split(' ');
      let sh = toks; for (let t = 0; t < 6 && sh.join() === toks.join(); t++) sh = shuffle(toks, R);
      return h('li', {}, h('div.he', {}, he), h('div.tokens', { dir: 'ltr' }, sh.map(t => h('span', {}, t))), lines(1));
    })))];
  },
  story(u, i, R, k, key) {
    const s = u.story;
    key.push(['סיפור', s.questions.map((q, n) => `${n + 1}. ${q.options[q.a]}`).join('   ')]);
    return [sheet(u, i, k,
      h('h3.st-title', { dir: 'ltr' }, s.title),
      h('div.dialog', { dir: 'ltr' }, s.lines.map(([who, e]) => h('p', {}, h('b', {}, who + ': '), e))),
      h('ol.qs', { dir: 'ltr' }, s.questions.map(q => h('li', {}, h('div', {}, q.q, ' ', h('small', { dir: 'rtl' }, `(${q.he})`)), h('div.opts', {}, q.options.map(o => h('span', {}, '◯ ', o)))))),
      h('div.write-own', {}, h('p.instr', {}, 'בונוס: כתוב משפט אחד משלך באנגלית על הסיפור'), lines(2)))];
  },
};

function render() {
  const i = +sel.value, u = UNITS[i];
  const kinds = [...kindsBox.querySelectorAll('input:checked')].map(x => x.value);
  localStorage.setItem('eq-print', JSON.stringify({ unit: i, kinds }));
  const R = rng(hash(u.id + salt)), key = [];
  out.innerHTML = '';
  for (const k of KINDS) if (kinds.includes(k.id)) out.append(...BUILD[k.id](u, i, R, k, key));
  if ($('#answers').checked && key.length) out.append(h('section.sheet.answers', {},
    h('div.sh-head', {}, h('div.brand', { dir: 'ltr' }, `Answer key · World ${i + 1}: ${u.title}`)),
    h('h2', {}, 'דף תשובות להורים'), key.map(([t, v]) => h('div.ans', {}, h('b', {}, t + ': '), h('span', { dir: 'ltr' }, v)))));
}
sel.onchange = render; kindsBox.onchange = render; $('#answers').onchange = render;
$('#shuffle').onclick = () => { salt++; render(); };
$('#print').onclick = () => print();
render();
