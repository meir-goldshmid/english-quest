// 🧩 Fun English: Zibi the alien explains a / an, building sentences and pronouns with animations,
// then short games (baskets, train, detective, magic swap, memory, balloons). Data lives in fun_data.js.
import { h, shuffle, sample, wait, toast, confetti } from './ui.js';
import { sfx, stop as stopAll, say } from './audio.js';
import * as S from './store.js';
import { UNITS, PART, VOICE, ROLE, NONE, art, phrase, plain, fill, fixed, chantText, swapOut } from './fun_data.js';

// ---------- progress: s.fun = { id: [stars per part] }
const prog = id => (S.st().fun ||= {})[id] || [];
const partStars = (i, k) => prog(UNITS[i].id)[k] || 0;
const unitDone = i => UNITS[i].parts.every((_, k) => partStars(i, k) > 0);
const GRAMMAR = UNITS.filter(u => u.kind === 'grammar').length;
// grammar lessons open one after another; word packs are always open
const unitOpen = i => S.st().settings.unlockAll || UNITS[i].kind === 'words' || i === 0 || unitDone(i - 1);
const partOpen = (i, k) => unitOpen(i) && (S.st().settings.unlockAll || k === 0 || partStars(i, k - 1) > 0);
function savePart(i, k, stars) {
  const s = S.st(), arr = (s.fun ||= {})[UNITS[i].id] ||= [];
  arr[k] = Math.max(arr[k] || 0, stars);
  if (UNITS.slice(0, GRAMMAR).every((_, j) => unitDone(j))) s.funDone = true;
  S.save();
}

// ---------- voice: a line is a string (Hebrew) or an array of Hebrew strings and {e: English}
let tok = 0;
export function hush() { tok++; stopAll(); }
const arr = x => Array.isArray(x) ? x : [x];
async function speak(parts) {
  stopAll(); const my = tok;
  for (const p of arr(parts)) {
    if (my !== tok) return;
    if (typeof p === 'string') { if (/[א-ת]/.test(p)) await say(p, 'he', { keep: true }); }
    else await say(p.e, 'en', { keep: true });
  }
}
const sayEn = t => say(plain(t), 'en');
const enEl = (t, tag = 'span') => h(tag + '.fz-en', { dir: 'ltr', lang: 'en' }, rich(t));
// "I [am] happy" -> text with the bracketed part highlighted
function rich(t) {
  return t.split(/(\[[^\]]+\])/).filter(Boolean).map(s => s[0] === '[' ? h('mark.fz-hl', {}, s.slice(1, -1)) : s);
}

// ---------- Zibi, a little green alien with antennae
function zibi() {
  const bubble = h('div.fz-bubble');
  const face = h('div.fz-zibi', {}, h('i.ant'), h('i.ant.r'), h('i.eye'), h('i.eye.r'), h('b.mouth'), h('span.cheek'), h('span.cheek.r'));
  const el = h('div.fz-guide', {}, face, bubble);
  const show = parts => {
    bubble.innerHTML = '';
    arr(parts).forEach((p, n) => {
      if (n && !(typeof p === 'string' && /^[.,?!:]/.test(p))) bubble.append(' ');
      bubble.append(typeof p === 'string' ? p : h('b.fz-en.inline', { dir: 'ltr' }, p.e));
    });
    bubble.classList.remove('in'); void bubble.offsetWidth; bubble.classList.add('in');
  };
  return {
    el, show,
    mood(m, ms = 1100) { face.dataset.mood = m; clearTimeout(face._t); face._t = setTimeout(() => { face.dataset.mood = ''; }, ms); },
    async talk(parts, { quiet = false } = {}) { if (!quiet) show(parts); face.classList.add('talk'); await speak(parts); face.classList.remove('talk'); },
  };
}

// ---------- screens
let ctx;   // { app, go, after }
function shell(title, back) {
  ctx.app.innerHTML = ''; document.body.className = 'fz-bg';
  const top = h('div.topbar', {}, h('button.btn.round.back', { onclick: () => { hush(); ctx.go(back); } }, '→'), h('div.title', {}, title));
  ctx.app.append(top);
  return top;
}

let greeted = false;
export function funMap(c) {
  ctx = c;
  shell('🧩 אנגלית בכיף', '#/');
  const g = zibi();
  const card = (U, i) => {
    const open = unitOpen(i), st = U.parts.map((_, k) => partStars(i, k)), done = unitDone(i);
    const cur = open && !done && U.kind === 'grammar' && (i === 0 || unitDone(i - 1));
    return h('button.fz-lesson' + (open ? '' : '.locked') + (done ? '.done' : '') + (cur ? '.current' : '') + (U.kind === 'words' ? '.words' : ''),
      { onclick: () => open ? ctx.go('#/fun/' + i) : toast('🔒 קודם מסיימים את השיעור הקודם'), style: { animationDelay: i * 0.03 + 's' } },
      U.kind === 'grammar' ? h('span.fz-num', {}, i + 1) : null,
      h('span.fz-lem', {}, open ? U.em : '🔒'),
      h('span.fz-ltitle', {}, U.title),
      U.kind === 'grammar' ? h('span.fz-lsub', { dir: 'ltr' }, U.sub) : null,
      h('span.sdots', {}, st.map(x => h('i' + (x === 3 ? '.gold' : x ? '.on' : '')))),
      done ? h('span.n-check', {}, '✓') : null);
  };
  const gram = h('div.fz-lessons'), words = h('div.fz-lessons');
  UNITS.forEach((U, i) => (U.kind === 'grammar' ? gram : words).append(card(U, i)));
  ctx.app.append(g.el,
    h('h2.fz-sec', {}, '📘 דקדוק בכיף ', h('small', {}, 'a / an, משפטים, I / you / he / she')), gram,
    h('h2.fz-sec', {}, '🌈 מילים בכיף ', h('small', {}, 'קבוצות קטנות של 8 מילים, עם תמונות ומשחקים')), words);
  g.show(VOICE.hello);
  if (!greeted) { greeted = true; g.talk(VOICE.hello, { quiet: true }); }
  ctx.after?.();
}

export function funLesson(c, i) {
  ctx = c;
  const U = UNITS[i]; if (!U || !unitOpen(i)) return ctx.go('#/fun');
  shell(U.em + ' ' + U.title, '#/fun');
  const list = h('div.stages');
  U.parts.forEach((p, k) => {
    const open = partOpen(i, k), stars = partStars(i, k);
    list.append(h('button.stage' + (open ? '' : '.locked') + (stars ? '.done' : ''), { onclick: () => open ? ctx.go(`#/funplay/${i}/${k}`) : toast('🔒 קודם מסיימים את השלב הקודם') },
      h('span.sem', {}, open ? PART[p].em : '🔒'), h('span.sname', {}, PART[p].name),
      h('span.sstars', {}, [0, 1, 2].map(n => h('i' + (n < stars ? '.on' : ''), {}, '★')))));
  });
  const preview = U.kind === 'words' ? h('div.fz-strip', {}, U.words.map(w => h('span', {}, w.em))) : h('div.fz-big', { dir: 'ltr' }, U.sub);
  ctx.app.append(h('div.fz-hero', {}, h('span.fz-hem', {}, U.em), h('div', {}, h('b', {}, U.title), preview)), list);
  ctx.after?.();
}

export function funPlay(c, i, k) {
  ctx = c;
  const U = UNITS[i], p = U?.parts[k];
  if (!p || !partOpen(i, k)) return ctx.go('#/fun');
  const top = shell(PART[p].em + ' ' + PART[p].name, '#/fun/' + i);
  top.querySelector('.back').textContent = '✕';
  const body = h('div.fz-play'); ctx.app.append(body);
  const my = ++run;
  const alive = () => my === run && document.body.contains(body);
  const finish = (stars, right, total) => { if (alive()) result(i, k, stars, right, total); };
  const G = { meet, cards, sort: quiz, pick: quiz, fix: quiz, build: quiz, where: quiz, who: quiz, swap: quiz, pop: quiz, match };
  G[p](body, U, p, finish, alive, i, k);
}
let run = 0;

function result(i, k, stars, right, total) {
  hush(); savePart(i, k, stars);
  S.addXp(10 + right * 2);
  sfx('win'); if (stars >= 2) confetti();
  const U = UNITS[i], last = k === U.parts.length - 1;
  const nextUnit = U.kind === 'grammar' && i + 1 < GRAMMAR ? `#/fun/${i + 1}` : '#/fun';
  const next = last ? nextUnit : `#/funplay/${i}/${k + 1}`;
  const box = h('div.modal-bg', {}, h('div.modal.result', {},
    h('div.fz-zibi.dance', {}, h('i.ant'), h('i.ant.r'), h('i.eye'), h('i.eye.r'), h('b.mouth')),
    h('div.big-stars', {}, [0, 1, 2].map(n => h('span' + (n < stars ? '.on' : ''), { style: { animationDelay: n * 0.25 + 's' } }, '★'))),
    total ? h('div.score', {}, `${right}/${total}`) : null,
    h('h2', {}, stars === 3 ? 'מושלם!' : stars === 2 ? 'כל הכבוד!' : 'סיימת!'),
    last && unitDone(i) && U.kind === 'grammar' ? h('p.note', {}, i + 1 < GRAMMAR ? 'השיעור הבא נפתח 🎉' : '🎖️ סיימת את כל שיעורי הדקדוק!') : null,
    h('div.row', {},
      h('button.btn', { onclick: () => { box.remove(); ctx.go(`#/fun/${i}`); } }, 'לשיעור'),
      h('button.btn.primary', { onclick: () => { box.remove(); ctx.go(next); } }, 'הבא ←'))));
  document.body.append(box);
  speak(VOICE.done);
}

// =====================================================================
// 🎬 meet: Zibi talks, the stage shows an animation for each slide, then the child taps the examples
const VIS = {
  async cards(stage, v) {
    const box = h('div.fz-cards'); stage.append(box);
    for (const [t, em] of v.cards) {
      const c = h('button.fz-card', { onclick: () => sayEn(t) }, h('span.big-emoji', {}, em), enEl(t, 'b'));
      box.append(c); sfx('pop'); await sayEn(t); await wait(250);
    }
  },
  async crash(stage, v, g, alive) {
    const a = h('span.fz-chip.art', {}, 'a'), n = h('span.fz-n', {}, 'n');
    const w = h('span.fz-chip.word', {}, h('span.big-emoji', {}, v.em), h('b', {}, v.crash));
    const boom = h('span.fz-boom', {}, '💥');
    const row = h('div.fz-crash', { dir: 'ltr' }, a, w, boom); stage.append(row);
    await wait(500); row.classList.add('go'); await wait(650); if (!alive()) return;
    sfx('hit'); row.classList.add('bang'); g.mood('dizzy', 2200);
    await say('a ' + v.crash, 'en', { rate: 1.2 });
    await wait(500); if (!alive()) return;
    await g.talk(v.after); if (!alive()) return;
    row.classList.remove('go', 'bang'); row.classList.add('fixed');
    a.append(n); sfx('drop'); await wait(700);
    sfx('sparkle'); g.mood('happy'); await sayEn('an ' + v.crash);
  },
  async train(stage, v) {
    const cars = h('div.fz-train', { dir: 'ltr' }, h('span.fz-engine', {}, '🚂'));
    stage.append(h('div.fz-trainbox', {}, h('span.big-emoji.fz-temoji', {}, v.em), cars));
    for (let n = 0; n < v.train.length; n++) {
      cars.append(h('span.fz-car.r-' + v.roles[n], {}, h('b', {}, v.train[n]), h('small', {}, ROLE[v.roles[n]])));
      sfx('pop'); await wait(380);
    }
    await sayEn(v.train.join(' '));
  },
  async cast(stage, v) {
    const c = v.cast;
    const ex = h('div.fz-castex');
    stage.append(h('div.fz-cast', {},
      h('div.fz-actor.a-' + c.anim, {}, c.em),
      h('div.fz-tag', {}, h('b', { dir: 'ltr' }, c.en), h('small', {}, c.he)),
      c.more ? h('div.fz-more', {}, c.more) : null, ex));
    sfx('pop');
    await sayEn(c.en); await wait(300);
    ex.append(enEl(c.ex)); await sayEn(c.ex);
  },
  async swap(stage, v) {
    const [from, to] = v.swap;
    const line = h('div.fz-swapline', { dir: 'ltr' }, rich(from));
    stage.append(h('div.fz-swap', {}, h('span.big-emoji', {}, v.em), line));
    await sayEn(from); await wait(400);
    line.querySelectorAll('.fz-hl').forEach(m => m.classList.add('poof'));
    sfx('sparkle'); await wait(550);
    line.innerHTML = ''; line.append(...rich(to)); line.querySelectorAll('.fz-hl').forEach(m => m.classList.add('appear'));
    await sayEn(to);
  },
  async chant(stage, v) {
    const rows = v.chant.map(r => h('div.fz-crow', {}, h('b', { dir: 'ltr' }, r[0]), h('i', {}, v.sep ? '→' : '+'), h('b.fz-v', { dir: 'ltr' }, r[1])));
    stage.append(h('div.fz-chant', {}, rows));
    for (let n = 0; n < rows.length; n++) {
      rows[n].classList.add('on'); sfx('pop');
      await sayEn(chantText(v.chant[n], v.sep)); await wait(150);
      rows[n].classList.remove('on'); rows[n].classList.add('seen');
    }
  },
  async rule(stage) {
    const col = (t, ems, cls) => h('div.fz-rcol.' + cls, {}, h('b', { dir: 'ltr' }, t), h('div.fz-rems', {}, ems.map(e => h('span', {}, e))));
    stage.append(h('div.fz-rule', {}, col('a', ['🐱', '🐶', '🍌'], 'ra'), col('an', ['🍎', '🥚', '🦉'], 'ran'),
      h('div.fz-vowels', { dir: 'ltr' }, ['a', 'e', 'i', 'o', 'u'].map((x, n) => h('span', { style: { animationDelay: n * 0.12 + 's' } }, x)))));
    for (const t of ['a cat', 'a dog', 'a banana', 'an apple', 'an egg', 'an owl']) { await sayEn(t); await wait(120); }
  },
};
function examples(v) {
  if (!v) return [];
  if (v.cards) return v.cards.map(([t, em]) => [t, em]);
  if (v.crash) return [['[an] ' + v.crash, v.em]];
  if (v.train) return [[v.train.join(' '), v.em]];
  if (v.cast) return [[v.cast.ex, v.cast.em]];
  if (v.swap) return [[v.swap[1], v.em]];
  if (v.chant) return v.chant.map(r => [chantText(r, v.sep), '🎵']);
  if (v.rule) return [['[a] cat', '🐱'], ['[an] apple', '🍎']];
  return [];
}

async function meet(body, U, p, finish, alive0, i) {
  let skipped = false;
  const alive = () => alive0() && !skipped;
  const g = zibi(), stage = h('div.fz-stage'), grid = h('div.fz-grid');
  const doneBtn = h('button.btn.primary.big', { disabled: true, onclick: () => finish(3, 0, 0) }, 'הבנתי! ⭐');
  const skip = h('button.btn.soft', { onclick: () => { skipped = true; hush(); showGrid(); } }, '⏭ דלג');
  body.append(g.el, stage, grid, h('div.row', {}, skip, h('button.btn', { onclick: () => { hush(); funPlay(ctx, i, 0); } }, '🔁 מההתחלה'), doneBtn));
  const ex = U.slides.flatMap(sl => examples(sl.v));
  const tapped = new Set();
  function showGrid() {
    skip.remove(); stage.innerHTML = ''; grid.innerHTML = '';
    g.show(VOICE.turn);
    ex.forEach(([t, em], n) => grid.append(h('button.fz-tile', { style: { animationDelay: n * 0.05 + 's' }, onclick: e => {
      const b = e.currentTarget; tapped.add(n); b.classList.add('seen'); b.classList.remove('hit'); void b.offsetWidth; b.classList.add('hit');
      g.mood('happy'); sayEn(t);
      if (tapped.size >= Math.min(ex.length, 4)) doneBtn.disabled = false;
    } }, h('span.big-emoji', {}, em), enEl(t))));
  }
  for (const sl of U.slides) {
    if (!alive()) return;
    if (sl.v) { stage.innerHTML = ''; }
    if (sl.mood) g.mood(sl.mood, 2500);
    await g.talk(sl.say); if (!alive()) return;
    if (sl.v) {
      const kind = Object.keys(VIS).find(k => k in sl.v);
      await VIS[kind](stage, sl.v, g, alive); if (!alive()) return;
    }
    await wait(500);
  }
  if (!alive()) return;
  doneBtn.disabled = false; sfx('gate');
  showGrid(); speak(VOICE.turn);
}

// =====================================================================
// 🃏 word cards: tap to flip, hear English then Hebrew
async function cards(body, U, p, finish, alive) {
  const g = zibi(), grid = h('div.fz-flipgrid');
  const doneBtn = h('button.btn.primary.big', { disabled: true, onclick: () => finish(3, 0, 0) }, 'סיימתי! ⭐');
  body.append(g.el, grid, h('div.row', {}, doneBtn));
  const seen = new Set();
  U.words.forEach((w, n) => grid.append(h('button.fz-flip', { style: { animationDelay: n * 0.05 + 's' }, onclick: async e => {
    const b = e.currentTarget; b.classList.add('open'); seen.add(n); sfx('pop'); g.mood('happy');
    if (seen.size === U.words.length) { doneBtn.disabled = false; sfx('gate'); }
    await say(phrase(w), 'en'); await wait(200); if (b.classList.contains('open')) await say(w.he, 'he', { keep: true });
  } }, h('span.front', {}, h('span.big-emoji', {}, w.em)), h('span.back', {}, h('span.big-emoji.sm', {}, w.em), enEl(phrase(w), 'b'), h('small', {}, w.he)))));
  g.show(PART.cards.say); await g.talk(PART.cards.say, { quiet: true });
}

// 🧠 memory: pairs of [left, right]; packs pair a picture with its English
async function match(body, U, p, finish, alive) {
  const g = zibi(), grid = h('div.fz-memory');
  const pairs = U.kind === 'words' ? sample(U.words, 6).map(w => [{ em: w.em, say: phrase(w), lang: 'en' }, { en: phrase(w), say: phrase(w), lang: 'en' }])
    : U.match.map(([he, en]) => [{ he, say: he, lang: 'he' }, { en, say: en, lang: 'en' }]);
  const deck = shuffle(pairs.flatMap((pr, n) => pr.map(c => ({ ...c, n }))));
  body.append(g.el, grid);
  g.show(PART.match.say); speak(PART.match.say);
  let open = [], misses = 0, found = 0, busy = false;
  deck.forEach(c => grid.append(h('button.fz-mem' + (deck.length > 12 ? '.small' : ''), { onclick: async e => {
    const b = e.currentTarget; if (busy || b.classList.contains('open')) return;
    b.classList.add('open'); sfx('pop'); say(c.say, c.lang);
    open.push([b, c]); if (open.length < 2) return;
    busy = true; const [[b1, c1], [b2, c2]] = open; open = [];
    await wait(700);
    if (c1.n === c2.n) {
      b1.classList.add('got'); b2.classList.add('got'); sfx('good'); g.mood('happy'); found++;
      if (found === pairs.length) { await wait(500); const st = misses <= 2 ? 3 : misses <= 5 ? 2 : 1; finish(st, pairs.length, pairs.length); }
    } else { misses++; sfx('bad'); g.mood('oops'); await wait(400); b1.classList.remove('open'); b2.classList.remove('open'); }
    busy = false;
  } }, h('span.front', {}, '👽'), h('span.back', {}, c.em ? h('span.big-emoji', {}, c.em) : c.he ? h('b', {}, c.he) : enEl(c.en, 'b')))));
}

// =====================================================================
// question games: one loop, one renderer per game
function items(U, p) {
  if (p === 'sort') return sample(U.sort, 10);
  if (p === 'pop') return shuffle(U.words).map(w => ({ w, opts: shuffle([w, ...sample(U.words.filter(x => x !== w), 3)]) }));
  const list = U[p];
  return sample(list, Math.min(list.length, p === 'build' ? 6 : 8));
}

async function quiz(body, U, p, finish, alive) {
  const qs = items(U, p), total = qs.length;
  let n = 0, right = 0;
  const bar = h('div.progress', {}, h('i', { style: { width: '0%' } })), g = zibi(), box = h('div.fz-q');
  body.append(bar, g.el, box);
  g.show(PART[p].say);
  await g.talk(PART[p].say, { quiet: true });
  while (n < total && alive()) {
    bar.firstChild.style.width = (n / total * 100) + '%';
    box.innerHTML = '';
    let first = true;
    const miss = el => { first = false; sfx('bad'); g.mood('oops'); if (el) { el.classList.add('wrong'); setTimeout(() => el.classList.remove('wrong'), 500); } };
    await ROUND[p](box, qs[n], miss, g, alive);
    if (!alive()) return;
    if (first) { right++; if (Math.random() < 0.35) { g.mood('happy'); await speak(VOICE.good[Math.floor(Math.random() * VOICE.good.length)]); } }
    await wait(450);
    n++;
  }
  if (!alive()) return;
  bar.firstChild.style.width = '100%';
  const ratio = right / total;
  finish(ratio >= 0.9 ? 3 : ratio >= 0.7 ? 2 : 1, right, total);
}

// a row of answer buttons; resolves when the right one is tapped
function options(list, ok, miss, label = x => x) {
  const row = h('div.fz-opts');
  const done = new Promise(res => list.forEach(o => row.append(h('button.fz-opt', { dir: 'ltr', onclick: e => {
    const b = e.currentTarget; if (row.classList.contains('locked')) return;
    if (!ok(o)) return miss(b);
    row.classList.add('locked'); b.classList.add('right'); sfx('good'); res(o);
  } }, label(o)))));
  return { row, done };
}
const sentenceEl = (s, slot) => h('div.fz-sent', { dir: 'ltr' }, s.split('___').flatMap((part, n) => n ? [slot, part] : [part]));

const ROUND = {
  // 🧺 a or an basket
  async sort(box, w, miss) {
    const card = h('div.fz-sortcard', {}, h('span.big-emoji', {}, w.em), h('b', { dir: 'ltr' }, w.en));
    const want = art(w.en);
    const res = new Promise(r => {
      const basket = a => h('button.fz-basket.b-' + a, { onclick: e => {
        if (box.classList.contains('locked')) return;
        if (a !== want) return miss(e.currentTarget);
        box.classList.add('locked'); sfx('good'); card.classList.add('fly-' + a); e.currentTarget.classList.add('catch'); r();
      } }, h('span', {}, '🧺'), h('b', { dir: 'ltr' }, a));
      box.append(card, h('div.fz-baskets', { dir: 'ltr' }, basket('a'), basket('an')));
    });
    await res; box.classList.remove('locked');
    await wait(450); await sayEn(phrase(w));
  },
  // ✏️ fill the blank
  async pick(box, it, miss) {
    const slot = h('span.fz-blank', {}, '?');
    const sent = sentenceEl(it.s, slot);
    const labels = o => o === NONE ? '✖ בלי' : o;
    const { row, done } = options(shuffle(it.opts), o => o === it.a, miss, labels);
    box.append(h('div.big-emoji.huge', {}, it.em), sent, row);
    await done;
    if (it.a === NONE) { slot.textContent = '✖'; slot.classList.add('gone'); await wait(500); sent.replaceChildren(fill(it.s, it.a)); }
    else { slot.textContent = it.a; slot.classList.add('filled'); }
    await sayEn(fill(it.s, it.a));
  },
  // 🕵️ tap the wrong word
  async fix(box, it, miss) {
    const words = it.s.split(' ');
    const line = h('div.fz-sent.fz-fix', { dir: 'ltr' });
    const res = new Promise(r => words.forEach((w, n) => line.append(h('button.fz-word', { onclick: e => {
      if (line.classList.contains('locked')) return;
      if (n !== it.bad) return miss(e.currentTarget);
      line.classList.add('locked'); sfx('good'); const b = e.currentTarget; b.classList.add('caught'); r(b);
    } }, w))));
    box.append(h('div.big-emoji.huge', {}, '🕵️', it.em), line);
    const b = await res; await wait(500);
    if (it.to) { b.textContent = it.to; b.classList.replace('caught', 'fixed'); } else b.classList.add('gone');
    sfx('sparkle'); await wait(350); await sayEn(fixed(it));
  },
  // 🚂 tap the words in order (one extra word does not belong)
  async build(box, it, miss) {
    const words = it.s.split(' '), train = h('div.fz-train.build', { dir: 'ltr' }, h('span.fz-engine', {}, '🚂'));
    let at = 0;
    const tiles = h('div.fz-tiles', { dir: 'ltr' });
    const res = new Promise(r => shuffle([...words, ...(it.x ? [it.x] : [])]).forEach(w => tiles.append(h('button.fz-word', { onclick: e => {
      const b = e.currentTarget; if (b.disabled) return;
      if (w !== words[at]) return miss(b);
      b.disabled = true; b.classList.add('used'); sfx('pop');
      train.append(h('span.fz-car.r-thing', {}, h('b', {}, w)));
      if (++at === words.length) { sfx('good'); r(); }
    } }, w))));
    box.append(h('div.big-emoji.huge', {}, it.em), h('div.fz-he', {}, it.he), train, tiles);
    await res; train.classList.add('choo'); await sayEn(it.s);
  },
  // 📍 where does a / an go
  async where(box, it, miss) {
    const words = it.s.split(' '), at = words.findIndex(w => w === 'a' || w === 'an'), chip = words[at];
    const rest = words.filter((_, n) => n !== at);
    const line = h('div.fz-sent.fz-where', { dir: 'ltr' });
    const res = new Promise(r => rest.forEach((w, n) => {
      line.append(h('span.fz-wd', {}, w));
      if (n < rest.length - 1) line.append(h('button.fz-slot', { onclick: e => {
        if (line.classList.contains('locked')) return;
        if (n + 1 !== at) return miss(e.currentTarget);
        line.classList.add('locked'); sfx('good'); e.currentTarget.textContent = chip; e.currentTarget.classList.add('filled'); r();
      } }, '+'));
    }));
    box.append(h('div.big-emoji.huge', {}, it.em), h('div.fz-chipwrap', {}, h('span.fz-chip.art.float', { dir: 'ltr' }, chip)), line);
    await res; await wait(300); await sayEn(it.s);
  },
  // 🎭 who is it: picture -> pronoun
  async who(box, it, miss) {
    const opts = shuffle([it.a, ...sample(it.pool.filter(x => x !== it.a), 2)]);
    const cap = h('div.fz-cap');
    const { row, done } = options(opts, o => o === it.a, miss);
    box.append(h('div.big-emoji.huge.fz-bob', {}, it.em), h('div.fz-he', {}, it.he), row, cap);
    await done; cap.append(enEl(it.s.replace(new RegExp('^' + it.a, 'i'), m => `[${m}]`))); await sayEn(it.s);
  },
  // 🪄 swap the name for a pronoun
  async swap(box, it, miss) {
    const line = h('div.fz-swapline', { dir: 'ltr' }, rich(it.s.replace(it.name, `[${it.name}]`)));
    const opts = shuffle([it.a, ...sample(it.pool.filter(x => x !== it.a), 3)]);
    const { row, done } = options(opts, o => o === it.a, miss);
    box.append(h('div.big-emoji.huge', {}, it.em), line, row);
    await done;
    line.querySelector('.fz-hl').classList.add('poof'); sfx('sparkle'); await wait(550);
    line.replaceChildren(...rich(swapOut({ ...it, a: `[${it.a}]` }))); line.querySelector('.fz-hl').classList.add('appear');
    await sayEn(swapOut(it));
  },
  // 🎈 hear a word, pop its balloon
  async pop(box, it, miss) {
    const sky = h('div.fz-sky');
    const replay = () => sayEn(phrase(it.w));
    const res = new Promise(r => it.opts.forEach((w, n) => sky.append(h('button.fz-balloon.c' + n, { style: { animationDelay: (n * 0.4) + 's' }, onclick: e => {
      const b = e.currentTarget; if (sky.classList.contains('locked')) return;
      if (w !== it.w) { miss(b); say(phrase(w), 'en'); return; }
      sky.classList.add('locked'); sfx('pop'); b.classList.add('popped'); r();
    } }, h('span.big-emoji', {}, w.em)))));
    const cap = h('div.fz-cap');
    box.append(h('div.row.tight', {}, h('button.fz-ear', { onclick: replay, title: 'שוב' }, '🔊')), sky, cap);
    replay();
    await res; sfx('good'); cap.append(enEl(phrase(it.w), 'b'), ' ', h('small', {}, it.w.he)); await sayEn(phrase(it.w));
  },
};
