// 🔤 Nikkud mode: learn to read Hebrew vowel marks with Nikudi, an animated dot who talks.
// Each mark drops onto its letter, every syllable and word has a recorded voice, and the vowels are colour-coded by sound.
import { h, shuffle, sample, wait, toast, confetti } from './ui.js';
import { sfx, stop as stopAll, clipUrl } from './audio.js';
import * as S from './store.js';
import { LESSONS, MARKS, SOUND, PART, VOICE, DAGESH_PAIRS, lettersFor, syl, sylBase, spoken } from './nikkud_data.js';

// ---------- progress: s.nikkud = { n1: [stars per part] }
const prog = id => (S.st().nikkud ||= {})[id] || [];
const partStars = (i, k) => prog(LESSONS[i].id)[k] || 0;
const lessonDone = i => LESSONS[i].parts.every((_, k) => partStars(i, k) > 0);
const lessonOpen = i => S.st().settings.unlockAll || i === 0 || lessonDone(i - 1);
const partOpen = (i, k) => lessonOpen(i) && (S.st().settings.unlockAll || k === 0 || partStars(i, k - 1) > 0);
function savePart(i, k, stars) {
  const s = S.st(), id = LESSONS[i].id, arr = (s.nikkud ||= {})[id] ||= [];
  arr[k] = Math.max(arr[k] || 0, stars);
  if (LESSONS.every((_, j) => lessonDone(j))) s.nikkudDone = true;
  S.save();
}
const colorsOn = () => S.st().settings.nkColor !== false;

// ---------- Hebrew voice (recorded clips, browser voice as a fallback)
let curA = null, tok = 0;
export function hush() { tok++; if (curA) { curA.pause(); curA = null; } stopAll(); }
// onStart(seconds) fires when sound begins, so the karaoke highlight can follow it
function playHe(text, { rate = 1, onStart } = {}) {
  hush(); const my = tok;
  return new Promise(res => {
    const url = clipUrl(text, 'he');
    if (url) {
      const a = new Audio(url); curA = a; a.playbackRate = rate; a.preservesPitch = true;
      a.onplaying = () => { if (my === tok) onStart?.((a.duration || 1) / rate); };
      a.onended = a.onerror = () => res();
      a.play().catch(() => res());
      return;
    }
    if (!window.speechSynthesis) { onStart?.(1); return setTimeout(res, 800); }
    const u = new SpeechSynthesisUtterance(text.replace(/[֑-ׇ]/g, '')); u.lang = 'he-IL'; u.rate = 0.85 * rate;
    const v = speechSynthesis.getVoices().find(v => v.lang.replace('_', '-').startsWith('he')); if (v) u.voice = v;
    const est = 0.5 + text.length * 0.07;
    u.onstart = () => onStart?.(est); u.onend = u.onerror = () => res();
    speechSynthesis.speak(u); setTimeout(res, 1500 + est * 1000);
  });
}

// ---------- Hebrew text with colour-coded vowels: each letter is two stacked layers,
// the full letter in the vowel's colour underneath and the bare letter in ink on top, so only the marks show colour.
const VOWELS = /[ְ-ׇֻ]/g;
const SND = { 'ָ': 'a', 'ַ': 'a', 'ֲ': 'a', 'ִ': 'i', 'ֵ': 'e', 'ֶ': 'e', 'ֱ': 'e', 'ֹ': 'o', 'ֺ': 'o', 'ֳ': 'o', 'ֻ': 'u', 'ְ': 's' };
const clusters = t => t.match(/[א-ת][֑-ׇ]*|[^א-ת]/g) || [];
function heb(text, cls = '') {
  const cs = clusters(text), out = h('span.nk-heb' + cls, { dir: 'rtl', lang: 'he' });
  let word = h('span.nk-w');
  cs.forEach((c, j) => {
    if (!/[א-ת]/.test(c)) { out.append(word, c); word = h('span.nk-w'); return; }
    if (!colorsOn()) { word.append(h('span.nk-c', {}, c)); return; }
    const prev = cs[j - 1] || '';
    let bare = c.replace(VOWELS, ''), snd = (c.match(VOWELS) || []).map(m => SND[m]).find(Boolean);
    if (/^וּ$/.test(c) && !(prev.match(VOWELS) || []).length && j > 0 && /[א-ת]/.test(prev)) { bare = 'ו'; snd = 'u'; }   // shuruk
    word.append(snd ? h('span.nk-c.lay', {}, h('span.l2', { style: { color: SOUND[snd].color } }, c), h('span.l1', {}, bare)) : h('span.nk-c', {}, c));
  });
  out.append(word);
  return out;
}
// play a word or sentence and light up its letters (or words) as the voice reads
async function karaoke(el, text, { rate = 1, byWord = false } = {}) {
  const parts = [...el.querySelectorAll(byWord ? '.nk-w' : '.nk-c')];
  const timers = [];
  await playHe(text, { rate, onStart: dur => {
    const span = dur * 0.8, t0 = dur * 0.08;
    parts.forEach((p, j) => timers.push(setTimeout(() => { parts.forEach(x => x.classList.remove('on')); p.classList.add('on'); }, (t0 + span * j / parts.length) * 1000)));
  } });
  timers.forEach(clearTimeout); parts.forEach(x => x.classList.remove('on'));
}

// ---------- Nikudi, the talking dot. mouth: a | i | e | o | u shows the mouth shape for a vowel
function mascot() {
  const bubble = h('div.nk-bubble');
  const el = h('div.nk-guide', {}, h('div.nk-mascot', {}, h('i.eye'), h('i.eye.r'), h('b.mouth'), h('span.cheek'), h('span.cheek.r')), bubble);
  const face = el.firstChild;
  return {
    el,
    mouth(m) { face.dataset.mouth = m || ''; },
    async talk(text, { show = true } = {}) {
      if (show) { bubble.innerHTML = ''; bubble.append(heb(text)); bubble.classList.remove('in'); void bubble.offsetWidth; bubble.classList.add('in'); }
      face.classList.add('talk'); await playHe(text); face.classList.remove('talk');
    },
    async sound(text, m) { face.dataset.mouth = m; face.classList.add('say'); await playHe(text); await wait(150); face.classList.remove('say'); },
    say(text) { bubble.innerHTML = ''; bubble.append(heb(text)); bubble.classList.remove('in'); void bubble.offsetWidth; bubble.classList.add('in'); },
  };
}

// a big letter card; the mark (difference between base and full) falls onto the letter, pops in, or lands on top
function markCard(base, full, anim = 'drop', color) {
  return h('div.nk-card', {}, h('span.l2.' + anim, { style: { color: color || '#ec4899' } }, full), h('span.l1', {}, base));
}

// ---------- screens
let ctx;   // { app, go, after }
function shell(title, back) {
  ctx.app.innerHTML = ''; document.body.className = 'nk-bg';
  const top = h('div.topbar', {}, h('button.btn.round.back', { onclick: () => { hush(); ctx.go(back); } }, '→'), h('div.title', {}, title));
  ctx.app.append(top);
  return top;
}

let greeted = false;
export function nikkudMap(c) {
  ctx = c;
  const top = shell('🔤 לומדים ניקוד', '#/');
  top.append(h('button.btn.soft.nk-colors', { onclick: () => { const s = S.st(); s.settings.nkColor = !colorsOn(); S.save(); nikkudMap(c); }, title: 'צבע לכל צליל' }, colorsOn() ? '🎨 צבעים: פועל' : '⚪ צבעים: כבוי'));
  const g = mascot();
  const legend = h('div.nk-legend', {}, ['a', 'i', 'e', 'o', 'u'].map(s => h('span', { style: { '--c': SOUND[s].color } }, heb(SOUND[s].he))));
  const list = h('div.nk-lessons');
  LESSONS.forEach((L, i) => {
    const open = lessonOpen(i), st = L.parts.map((_, k) => partStars(i, k)), done = lessonDone(i);
    const cur = open && !done && (i === 0 || lessonDone(i - 1));
    list.append(h('button.nk-lesson' + (open ? '' : '.locked') + (done ? '.done' : '') + (cur ? '.current' : ''), { onclick: () => open ? ctx.go('#/nikkud/' + i) : toast('🔒 קודם מסיימים את השיעור הקודם'), style: { animationDelay: i * 0.04 + 's' } },
      h('span.nk-num', {}, i + 1),
      h('span.nk-glyph', {}, open ? heb(L.sub) : '🔒'),
      h('span.nk-ltitle', {}, heb(L.title)),
      h('span.sdots', {}, st.map(x => h('i' + (x === 3 ? '.gold' : x ? '.on' : '')))),
      done ? h('span.n-check', {}, '✓') : null));
  });
  ctx.app.append(g.el, legend, list);
  g.say(VOICE.hello);
  if (!greeted) { greeted = true; g.talk(VOICE.hello, { show: false }); }
  ctx.after?.();
}

export function nikkudLesson(c, i) {
  ctx = c;
  const L = LESSONS[i]; if (!L || !lessonOpen(i)) return ctx.go('#/nikkud');
  shell('', '#/nikkud').querySelector('.title').append(`שיעור ${i + 1} · `, heb(L.title));
  const list = h('div.stages');
  L.parts.forEach((p, k) => {
    const open = partOpen(i, k), stars = partStars(i, k);
    list.append(h('button.stage' + (open ? '' : '.locked') + (stars ? '.done' : ''), { onclick: () => open ? ctx.go(`#/nikplay/${i}/${k}`) : toast('🔒 קודם מסיימים את השלב הקודם') },
      h('span.sem', {}, open ? PART[p].em : '🔒'), h('span.sname', {}, heb(PART[p].name)),
      h('span.sstars', {}, [0, 1, 2].map(n => h('i' + (n < stars ? '.on' : ''), {}, '★')))));
  });
  ctx.app.append(h('div.nk-hero', {}, h('div.nk-big', {}, heb(L.sub)), h('div', {}, h('b', {}, heb(L.title)), L.keys.length ? h('small', {}, heb(L.keys.map(k => MARKS[k].look).join(' · '))) : null)), list);
  ctx.after?.();
}

export function nikkudPlay(c, i, k) {
  ctx = c;
  const L = LESSONS[i], p = L?.parts[k];
  if (!p || !partOpen(i, k)) return ctx.go('#/nikkud');
  const top = shell('', '#/nikkud/' + i); top.querySelector('.title').append(PART[p].em, ' ', heb(PART[p].name));
  top.querySelector('.back').classList.replace('back', 'exit'); top.querySelector('.exit').textContent = '✕';
  const body = h('div.nk-play'); ctx.app.append(body);
  const finish = (stars, right, total) => result(i, k, stars, right, total);
  if (p === 'meet') return meet(body, L, i, finish);
  quiz(body, i, p, finish);
}

function result(i, k, stars, right, total) {
  hush(); savePart(i, k, stars);
  S.addXp(10 + right * 2);
  sfx('win'); if (stars >= 2) confetti();
  const L = LESSONS[i], last = k === L.parts.length - 1;
  const next = last ? (i + 1 < LESSONS.length ? `#/nikkud/${i + 1}` : '#/nikkud') : `#/nikplay/${i}/${k + 1}`;
  const box = h('div.modal-bg', {}, h('div.modal.result', {},
    h('div.big-stars', {}, [0, 1, 2].map(n => h('span' + (n < stars ? '.on' : ''), { style: { animationDelay: n * 0.25 + 's' } }, '★'))),
    total ? h('div.score', {}, `${right}/${total}`) : null,
    h('h2', {}, stars === 3 ? 'מושלם!' : stars === 2 ? 'כל הכבוד!' : 'סיימת!'),
    last && lessonDone(i) ? h('p.note', {}, i + 1 < LESSONS.length ? 'השיעור הבא נפתח 🎉' : '🎖️ סיימת את כל הניקוד!') : null,
    h('div.row', {},
      h('button.btn', { onclick: () => { box.remove(); ctx.go(`#/nikkud/${i}`); } }, 'לשיעור'),
      h('button.btn.primary', { onclick: () => { box.remove(); ctx.go(next); } }, 'הבא ←'))));
  document.body.append(box);
  playHe(VOICE.done);
}

// ---------- 🎬 meet: Nikudi explains, the mark drops onto letters, then the child taps every card
function meetItems(L) {
  if (L.keys.length) {
    const demos = L.keys.map(key => { const m = MARKS[key], l0 = L.parade[0]; return { base: sylBase(l0, key), full: syl(l0, key), anim: m.anim || 'drop', say: spoken(l0, m.sound), sound: m.sound }; });
    const grid = L.keys.flatMap((key, n) => L.parade.slice(0, n ? 3 : 6).map(l => ({ show: syl(l, key), say: spoken(l, MARKS[key].sound), sound: MARKS[key].sound })));
    return { demos, grid };
  }
  const demos = (L.demos || []).map(([base, full, anim, say]) => ({ base, full, anim, say, sound: (full.match(VOWELS) || []).map(m => SND[m])[0] || 'a' }));
  let grid;
  if (L.id === 'n10') grid = DAGESH_PAIRS.map(([show, say]) => ({ show, say, sound: 'a' }));
  else if (L.sentences) grid = L.sentences.slice(0, 4).map(([t]) => ({ show: t, say: t, sentence: true }));
  else grid = L.words.slice(0, 6).map(w => ({ show: w.he, say: w.he, em: w.em }));
  return { demos, grid };
}
async function meet(body, L, i, finish) {
  const g = mascot(), stage = h('div.nk-stage'), gridEl = h('div.nk-grid'), my = ++meetRun;
  const doneBtn = h('button.btn.primary.big', { disabled: true, onclick: () => finish(3, 0, 0) }, 'סיימתי! ⭐');
  const skip = h('button.btn.soft', { onclick: () => { hush(); meetRun++; showGrid(true); } }, '⏭ דלג');
  body.append(g.el, stage, gridEl, h('div.row', {}, skip, h('button.btn', { onclick: () => { hush(); nikkudPlay(ctx, i, 0); } }, '🔁 מההתחלה'), doneBtn));
  const { demos, grid } = meetItems(L);
  const alive = () => my === meetRun && document.body.contains(body);
  const demo = async d => {
    stage.innerHTML = '';
    const card = markCard(d.base, d.full, d.anim, colorsOn() ? SOUND[d.sound]?.color : null); stage.append(card);
    sfx(d.anim === 'pop' ? 'pop' : 'drop'); await wait(900); if (!alive()) return;
    sfx('sparkle'); card.classList.add('glow');
    await g.sound(d.say, SOUND[d.sound]?.mouth || 'a');
    await wait(300);
  };
  const tapped = new Set();
  function showGrid(now) {
    skip.remove(); gridEl.innerHTML = '';
    grid.forEach((it, n) => gridEl.append(h('button.nk-tile' + (it.sentence ? '.wide' : ''), { style: { animationDelay: now ? n * 0.05 + 's' : '0s' }, onclick: async e => {
      const b = e.currentTarget; tapped.add(n); b.classList.add('seen'); b.classList.remove('hit'); void b.offsetWidth; b.classList.add('hit');
      if (it.sentence) await karaoke(b, it.say, { byWord: true });
      else if (it.em) await karaoke(b, it.say);
      else await g.sound(it.say, SOUND[it.sound]?.mouth);
      if (tapped.size >= grid.length) { doneBtn.disabled = false; sfx('gate'); }
    } }, it.em ? h('span.big-emoji.sm', {}, it.em) : null, heb(it.show))));
    if (now) { g.say(VOICE.turn); playHe(VOICE.turn); }
  }
  // the show
  await g.talk(L.lines[0]); if (!alive()) return;
  if (demos[0]) { await demo(demos[0]); if (!alive()) return; }
  for (const line of L.lines.slice(1)) { await g.talk(line); if (!alive()) return; }
  for (const d of demos.slice(1)) { await demo(d); if (!alive()) return; }
  showGrid(false);
  // parade: every card lights up and says its sound
  if (!grid[0]?.sentence) for (const b of gridEl.children) {
    if (!alive()) return; b.classList.add('hit');
    const it = grid[[...gridEl.children].indexOf(b)];
    if (it.em) await karaoke(b, it.say); else await g.sound(it.say, SOUND[it.sound]?.mouth); await wait(120); b.classList.remove('hit');
  }
  if (!alive()) return;
  g.say(VOICE.turn); await playHe(VOICE.turn);
}
let meetRun = 0;

// ---------- question parts
const keysUpTo = i => LESSONS.slice(0, i + 1).flatMap(l => l.keys);
const wordsUpTo = i => LESSONS.slice(0, i + 1).flatMap(l => l.words);
const pick = a => a[Math.floor(Math.random() * a.length)];

function makeQuestions(i, p) {
  const L = LESSONS[i], cur = L.keys, known = keysUpTo(i);
  const sounds = [...new Set(known.map(k => MARKS[k].sound))];
  const target = () => { const key = Math.random() < 0.7 || cur.length === known.length ? pick(cur) : pick(known.filter(k => !cur.includes(k))); return { key, L: pick(lettersFor(MARKS[key].sound)) }; };
  const qs = [];
  if (p === 'listen' && L.id === 'n10') {
    shuffle([...DAGESH_PAIRS, ...DAGESH_PAIRS]).slice(0, 8).forEach(pr => {
      const j = DAGESH_PAIRS.indexOf(pr), mate = DAGESH_PAIRS[j ^ 1], other = pick(DAGESH_PAIRS.filter(x => x !== pr && x !== mate));
      qs.push({ audio: pr[1], opts: shuffle([pr, mate, other]).map(x => ({ show: x[0], ok: x === pr, say: x[1] })) });
    });
  } else if (p === 'listen') {
    while (qs.length < 8) {
      const t = target(), snd = MARKS[t.key].sound, opts = [{ show: syl(t.L, t.key), say: spoken(t.L, snd), ok: true }];
      const otherKeys = known.filter(k => MARKS[k].sound !== snd);
      for (let tries = 0; opts.length < 3 && tries < 40; tries++) {
        const k2 = otherKeys.length && (opts.length === 1 || Math.random() < 0.5) ? pick(otherKeys) : pick(known);
        const l2 = MARKS[k2].sound !== snd && opts.length === 1 ? t.L : pick(lettersFor(MARKS[k2].sound));
        const o = { show: syl(l2, k2), say: spoken(l2, MARKS[k2].sound), ok: false };
        if (!opts.some(x => x.say === o.say || x.show === o.show)) opts.push(o);
      }
      qs.push({ audio: opts[0].say, opts: shuffle(opts) });
    }
  } else if (p === 'build') {
    while (qs.length < 6) {
      const t = target(), snd = MARKS[t.key].sound;
      if (sounds.length >= 2) {
        const others = shuffle(sounds.filter(s => s !== snd)).slice(0, 2).map(s => pick(known.filter(k => MARKS[k].sound === s)));
        qs.push({ audio: spoken(t.L, snd), letter: t.L, key: t.key, opts: shuffle([t.key, ...others]).map(k => ({ show: '◌' + (MARKS[k].ch || '') + (MARKS[k].mater || ''), ok: k === t.key, key: k, mark: true })) });
      } else {
        const ls = [t.L, ...sample(lettersFor(snd).filter(l => l !== t.L), 2)];
        qs.push({ audio: spoken(t.L, snd), letter: t.L, key: t.key, pickLetter: true, opts: shuffle(ls).map(l => ({ show: l, ok: l === t.L })) });
      }
    }
  } else if (p === 'hearword') {
    const pool = L.words.length ? L.words : wordsUpTo(i);
    sample(pool, 8).forEach(w => {
      const d = sample(pool.filter(x => x !== w), 2);
      qs.push({ audio: w.he, opts: shuffle([w, ...d]).map(x => ({ show: x.he, ok: x === w, say: x.he })) });
    });
  } else if (p === 'read') {
    const pool = wordsUpTo(i);
    sample(L.words, 8).forEach(w => {
      const d = sample(pool.filter(x => x.em !== w.em), 2);
      qs.push({ word: w.he, opts: shuffle([w, ...d]).map(x => ({ em: x.em, ok: x === w })) });
    });
  } else if (p === 'sentence') {
    sample(L.sentences, 8).forEach(([t, ...ems]) => qs.push({ sentence: t, opts: shuffle(ems.map((em, n) => ({ em, ok: n === 0 }))) }));
  }
  return qs;
}

async function quiz(body, i, p, finish) {
  const qs = makeQuestions(i, p), total = qs.length, my = ++meetRun;
  let n = 0, right = 0;
  const bar = h('div.progress', {}, h('i', { style: { width: '0%' } })), g = mascot(), box = h('div.nk-q');
  body.append(bar, g.el, box);
  g.say(PART[p].say);
  await g.talk(PART[p].say, { show: false });
  const alive = () => my === meetRun && document.body.contains(body);
  while (n < total && alive()) {
    const q = qs[n]; bar.firstChild.style.width = (n / total * 100) + '%';
    box.innerHTML = '';
    let first = true;
    const replay = () => q.audio ? g.sound(q.audio, 'a') : null;
    let prompt;
    if (q.word) prompt = h('div.nk-prompt.word', {}, heb(q.word));
    else if (q.sentence) prompt = h('div.nk-prompt.sent', {}, heb(q.sentence));
    else if (q.letter) prompt = h('div.nk-prompt', {}, q.pickLetter ? markCard('◌', '◌' + (MARKS[q.key].ch || '') + (MARKS[q.key].mater || ''), 'none', colorsOn() ? SOUND[MARKS[q.key].sound].color : null) : markCard(q.letter, q.letter, 'none'));
    else prompt = h('div.nk-prompt', {}, h('button.nk-ear', { onclick: replay, title: 'שוב' }, '🔊'));
    const help = q.word || q.sentence ? h('button.btn.soft', { onclick: () => { first = false; karaoke(prompt.firstChild, q.word || q.sentence, { byWord: !!q.sentence, rate: 0.85 }); } }, '🔊 עזרה – תקריא לי') : h('button.btn.round', { onclick: replay, title: 'שוב' }, '🔊');
    const opts = h('div.nk-opts' + (q.opts[0].em ? '.em' : q.opts[0].mark ? '.marks' : ''));
    const answered = new Promise(res => q.opts.forEach(o => opts.append(h('button.nk-opt', { onclick: async e => {
      const b = e.currentTarget; if (opts.classList.contains('locked')) return;
      if (!o.ok) {
        first = false; b.classList.add('wrong'); sfx('bad'); g.mouth(''); if (o.say) playHe(o.say); else playHe(VOICE.again);
        setTimeout(() => b.classList.remove('wrong'), 500); return;
      }
      opts.classList.add('locked'); b.classList.add('right'); sfx('good');
      if (first) right++;
      res();
    } }, o.em ? h('span.big-emoji', {}, o.em) : heb(o.show)))));
    box.append(prompt, h('div.row.tight', {}, help), opts);
    if (q.audio) replay();
    await answered; if (!alive()) return;
    // after the right answer: show / say it properly
    if (q.letter) {
      prompt.innerHTML = ''; const m = MARKS[q.key];
      prompt.append(markCard(sylBase(q.letter, q.key), syl(q.letter, q.key), m.anim || 'drop', colorsOn() ? SOUND[m.sound].color : null));
      sfx(m.anim === 'pop' ? 'pop' : 'drop'); await wait(800); await g.sound(q.audio, SOUND[m.sound].mouth);
    } else if (q.word || q.sentence) {
      await karaoke(prompt.firstChild, q.word || q.sentence, { byWord: !!q.sentence });
    } else if (q.audio) {
      await g.sound(q.audio, 'a');
    }
    if (first && Math.random() < 0.4) await playHe(pick(VOICE.good));
    await wait(350);
    n++;
  }
  if (!alive()) return;
  bar.firstChild.style.width = '100%';
  const ratio = right / total;
  finish(ratio >= 0.9 ? 3 : ratio >= 0.7 ? 2 : 1, right, total);
}
