// App shell: world map, units, platformer stages, review, shop and parent area.
import { UNITS } from './content.js';
import * as S from './store.js';
import { STAGES } from './store.js';
import { h, en, $, shuffle, sample, toast, confetti, wait } from './ui.js';
import { loadManifests, say, trio, sfx, stop, music, stopMusic, unlockAudio } from './audio.js';
import { buildLevel, hash } from './levels.js';
import { Game, drawHero } from './game.js';
import { runChallenge, kindFor } from './challenges.js';
import { learnCards, storyScreen, bossScreen } from './screens.js';

const app = $('#app');
const items = UNITS.map(u => [
  ...u.words.map(([e, he, em]) => ({ en: e, he, em, sent: false, unit: u.id })),
  ...u.sentences.map(([e, he]) => ({ en: e, he, em: '', sent: true, unit: u.id })),
]);
const unitIdx = id => UNITS.findIndex(u => u.id === id);
let game = null, timer = null;

function clear() {
  stop(); game?.destroy(); game = null;
  document.body.className = '';
  document.querySelectorAll('body > .modal-bg').forEach(m => m.remove());
  app.innerHTML = '';
}
function go(hash) { location.hash = hash; }
const due = () => items.flat().filter(it => S.isDue(it.en));

// ---------- header bits
function statsBar() {
  const s = S.st(), d = s.days[S.today()]?.xp || 0;
  const pct = Math.min(100, d / S.DAILY_GOAL * 100);
  return h('div.stats', {},
    h('span.pill', { title: 'מטבעות' }, '🪙 ', s.coins),
    h('span.pill', { title: 'ימים ברצף' }, '🔥 ', S.streak()),
    h('span.pill.goal', { title: 'יעד יומי', style: { '--p': pct + '%' } }, pct >= 100 ? '✅ יעד היום' : `🎯 ${Math.round(pct)}%`));
}
function heroCanvas(size = 90) {
  const cv = h('canvas.hero-cv', { width: size, height: size * 1.3 });
  drawHero(cv.getContext('2d'), size / 2, size * 1.25, { look: S.st().look, scale: size / 60 });
  return cv;
}

// ---------- name / first run
function welcome() {
  clear(); document.body.className = 'sky-bg';
  const inp = h('input.name-in', { placeholder: 'השם שלך', maxlength: 20 });
  app.append(h('div.welcome', {},
    h('div.logo', { dir: 'ltr' }, 'English ', h('b', {}, 'Quest')),
    heroCanvas(110),
    h('p', {}, 'הרפתקה באנגלית! רצים, קופצים, אוספים אותיות, מדברים – ולומדים.'),
    h('form', { onsubmit: e => { e.preventDefault(); const n = inp.value.trim(); if (!n) return inp.focus(); S.st().name = n; S.save(); unlockAudio(); say("Hello! Let's play!", 'en'); go('#/'); } },
      h('label', {}, 'איך קוראים לך?'), inp, h('button.btn.primary.wide', { type: 'submit' }, 'יוצאים לדרך! 🚀'))));
  inp.focus();
}

// ---------- world map
function home() {
  clear(); document.body.className = 'map-bg';
  const s = S.st(), cur = S.currentUnit(UNITS), dueN = due().length;
  const path = h('div.worlds');
  UNITS.forEach((u, i) => {
    const open = S.unitUnlocked(UNITS, i), stars = STAGES.reduce((a, _, k) => a + S.stageStars(u.id, k), 0);
    const node = h('button.world.theme-' + u.theme + (open ? '' : '.locked') + (i === cur ? '.current' : '') + (S.unitDone(u) ? '.done' : ''),
      { onclick: () => open ? go('#/unit/' + i) : toast('🔒 קודם מסיימים את העולם הקודם'), style: { '--off': (Math.sin(i * 1.3) * 28) + '%' } },
      h('span.num', {}, i + 1), h('span.wem', {}, open ? u.em : '🔒'),
      h('span.wname', {}, h('span.en', { dir: 'ltr' }, u.title), h('small', {}, u.he)),
      open ? h('span.wstars', {}, `⭐ ${stars}/${STAGES.length * 3}`) : null);
    path.append(node);
  });
  app.append(
    h('div.home-top', {},
      h('div.me', {}, heroCanvas(48), h('div', {}, h('b', {}, 'היי ' + (s.name || '') + '!'), h('small', {}, `${S.mastered()} מילים ומשפטים שאתה כבר יודע`))),
      statsBar()),
    h('div.home-actions', {},
      h('button.btn.primary.big', { onclick: () => go('#/unit/' + cur) }, '▶ ', 'ממשיכים לשחק'),
      dueN ? h('button.btn.review', { onclick: () => go('#/review') }, `🔁 חזרה יומית (${Math.min(dueN, 12)})`) : null,
      h('button.btn', { onclick: () => go('#/shop') }, '🛒 חנות'),
      h('a.btn', { href: 'print.html', style: { textDecoration: 'none' } }, '🖨️ דפי עבודה'),
      h('button.btn.ghost', { onclick: () => go('#/parent') }, '👨‍👩‍👦 הורים')),
    path);
  requestAnimationFrame(() => path.querySelector('.current')?.scrollIntoView({ block: 'center' }));
}

// ---------- unit screen
function unitScreen(i) {
  const u = UNITS[i]; if (!u || !S.unitUnlocked(UNITS, i)) return go('#/');
  clear(); document.body.className = 'unit-bg theme-' + u.theme;
  const list = h('div.stages');
  STAGES.forEach((stg, k) => {
    const open = S.stageUnlocked(UNITS, i, k), stars = S.stageStars(u.id, k);
    list.append(h('button.stage' + (open ? '' : '.locked') + (stars ? '.done' : ''), { onclick: () => open ? go(`#/play/${i}/${k}`) : toast('🔒 קודם מסיימים את השלב הקודם') },
      h('span.sem', {}, open ? stg.em : '🔒'), h('span.sname', {}, stg.name),
      h('span.sstars', {}, [0, 1, 2].map(n => h('i' + (n < stars ? '.on' : ''), {}, '★')))));
  });
  app.append(h('div.topbar', {}, h('button.btn.round', { onclick: () => go('#/') }, '→'), h('div.title', {}, u.em + ' ', h('span.en', { dir: 'ltr' }, u.title), ' · ', u.he), statsBar()),
    h('div.unit-hero', {}, heroCanvas(80), h('div.unit-info', {}, h('div', {}, `עולם ${i + 1} מתוך ${UNITS.length}`), h('small', {}, `${u.words.length} מילים · ${u.sentences.length} משפטים · סיפור`))),
    list);
}

// ---------- results
function results({ unit, k, stars, coins, xp, title }) {
  const better = unit ? S.finishStage(unit.id, k, stars) : false;
  const s = S.st(); s.coins += coins; S.save(); S.addXp(xp + 10);
  stopMusic(); sfx('win'); if (stars >= 2) confetti();
  const box = h('div.modal-bg', {}, h('div.modal.result', {},
    h('div.big-stars', {}, [0, 1, 2].map(n => h('span' + (n < stars ? '.on' : ''), { style: { animationDelay: n * 0.25 + 's' } }, '★'))),
    h('h2', {}, title || (stars === 3 ? 'מושלם!' : stars === 2 ? 'כל הכבוד!' : 'סיימת!')),
    h('div.reward', {}, `🪙 +${coins}`, better && unit ? ' · שיא חדש!' : ''),
    h('div.row', {},
      unit ? h('button.btn', { onclick: () => { box.remove(); route(); } }, '🔁 שוב') : null,
      h('button.btn.primary', { onclick: () => { box.remove(); go(unit ? '#/unit/' + unitIdx(unit.id) : '#/'); } }, 'המשך ←'))));
  document.body.append(box);
  say(stars === 3 ? 'Perfect!' : 'Well done!', 'en');
}

// ---------- platformer stage
function runStage({ unit, k, events, theme, seed, difficulty, pool, title }) {
  clear(); document.body.className = 'playing';
  const s = S.st();
  const wrap = h('div.game-wrap'), cv = h('canvas.game'); wrap.append(cv);
  const modal = h('div.modal-bg.hidden', {}, h('div.modal.chal-host'));
  const host = modal.firstChild;
  const hud = h('div.hud', {}, h('button.btn.round.sm', { onclick: () => { if (confirm('לצאת מהשלב?')) go(unit ? '#/unit/' + unitIdx(unit.id) : '#/'); } }, '✕'),
    h('span.pill.hc'), h('span.pill.hh'), h('div.hprog', {}, h('i')));
  const spellBar = h('div.spellbar.hidden');
  const help = h('div.help', {}, 'חצים / רווח לקפיצה · פגע בקוביות ❓ מלמטה · אסוף אותיות לפי הסדר · ', h('b', {}, '🎤 דלת דיבור'));
  const ctrls = h('div.touch', {},
    h('div.tleft', {}, h('button.tb', { 'data-k': 'left' }, '◀'), h('button.tb', { 'data-k': 'right' }, '▶')),
    h('button.tb.jump', { 'data-k': 'jump' }, '⤒'));
  app.append(wrap, hud, spellBar, help, ctrls, modal);
  setTimeout(() => help.classList.add('fade'), 6000);
  const L = buildLevel({ theme, events, seed, difficulty });
  let right = 0, asked = 0;
  const ask = async (ch, speak) => {
    modal.classList.remove('hidden');
    const r = await runChallenge(host, { ...ch, pool });
    modal.classList.add('hidden'); host.innerHTML = '';
    asked++; if (r.ok) { right++; S.addXp(2); }
    return r.ok;
  };
  const showSpell = z => {
    spellBar.classList.toggle('hidden', !z); if (!z) return;
    spellBar.innerHTML = '';
    spellBar.append(h('span.big-emoji.sm', {}, z.item.em || '✏️'), h('span.he', {}, z.item.he), h('span.letters', { dir: 'ltr' }, [...z.word].map((c, i) => h('b' + (i < z.next ? '.got' : ''), {}, i < z.next ? c : '_'))),
      h('button.btn.round.sm', { onclick: () => say(z.item.en, 'en') }, '🔊'));
  };
  game = new Game(cv, L, s.look, {
    hud: st => {
      hud.querySelector('.hc').textContent = '🪙 ' + st.coins;
      hud.querySelector('.hh').textContent = '❤️'.repeat(st.hearts) + '🤍'.repeat(3 - st.hearts);
      hud.querySelector('.hprog i').style.width = st.progress * 100 + '%';
      showSpell(st.zone);
    },
    block: idx => ask(events[idx].ch),
    door: idx => ask(events[idx].ch, true),
    zone: z => { if (z) { say(z.item.en, 'en'); } },
    letter: (z, ch, ok) => { if (!ok) say(z.word[z.next], 'en', { rate: 0.9 }); showSpell(z); },
    spelled: z => { S.grade(z.item.en, true); right++; asked++; trio(z.item.en, z.item.he, 'eh'); },
    oops: () => toast('אופס! ממשיכים מהדגל 🚩', 1500),
    finish: ({ coins }) => {
      const ratio = right / Math.max(1, events.length);   // skipped blocks count as missed
      const stars = ratio >= 0.9 ? 3 : ratio >= 0.6 ? 2 : 1;
      setTimeout(() => results({ unit, k, stars, coins, xp: right * 2, title }), 600);
    },
  });
  // touch controls
  ctrls.querySelectorAll('.tb').forEach(b => {
    const k2 = b.dataset.k;
    const set = v => e => { e.preventDefault(); if (k2 === 'jump') game?.pressJump(v); else if (game) game.input[k2] = v; b.classList.toggle('on', v); };
    b.addEventListener('pointerdown', e => { b.setPointerCapture(e.pointerId); set(true)(e); });
    b.addEventListener('pointerup', set(false)); b.addEventListener('pointercancel', set(false)); b.addEventListener('lostpointercapture', set(false));
  });
  music(theme);
}

function wordEvents(list, n, mode) {
  return list.slice(0, n).map((it, i) => ({ kind: 'block', ch: { kind: kindFor(it, mode, i), item: it } }));
}
// Sort so the weakest items come first, then a little randomness
const weakFirst = list => shuffle(list).sort((a, b) => S.box(a.en) - S.box(b.en));

function playStage(i, k) {
  const u = UNITS[i]; if (!u || !S.stageUnlocked(UNITS, i, k)) return go('#/');
  const its = items[i], words = its.filter(x => !x.sent), sents = its.filter(x => x.sent);
  const pool = [...its, ...items.slice(Math.max(0, i - 2), i).flat()];
  const done = (stars, xp = 10, coins = 10) => results({ unit: u, k, stars, coins, xp });
  const back = () => go('#/unit/' + i);
  const sid = STAGES[k].id;
  const diff = Math.min(0.8, 0.15 + i * 0.03);
  if (sid === 'learn' || sid === 'sent') {
    clear(); document.body.className = 'cards-bg theme-' + u.theme;
    return learnCards(app, sid === 'learn' ? words : sents, { title: u.em + ' ' + STAGES[k].name, onDone: () => done(3, 10, 10), onExit: back });
  }
  if (sid === 'story') { clear(); document.body.className = 'cards-bg theme-' + u.theme; return storyScreen(app, u, { onDone: (st, xp) => done(st, xp, 15), onExit: back }); }
  if (sid === 'boss') { clear(); document.body.className = 'boss-bg theme-' + u.theme; return bossScreen(app, u, its, { onDone: (st, xp) => done(st, xp, 30), onExit: back, hard: i >= 10 }); }
  let events;
  if (sid === 'run1') {
    const ws = weakFirst(words), spellable = ws.filter(w => /^[a-z]{2,7}$/.test(w.en));
    const sp = spellable.slice(0, 2), rest = ws.filter(w => !sp.includes(w));
    events = wordEvents(rest, 9, 'run');
    events.splice(3, 0, { kind: 'spell', item: sp[0] }); if (sp[1]) events.splice(8, 0, { kind: 'spell', item: sp[1] });
  } else {
    const ss = weakFirst(sents), ws = weakFirst(words);
    const shortS = ss.filter(s => s.en.split(' ').length <= 5);
    const spk = [...ws.slice(0, 2), ...(shortS.length ? [shortS[0]] : [])];
    events = ss.filter(s => s !== shortS[0]).slice(0, 6).map((it, j) => ({ kind: 'block', ch: { kind: kindFor(it, 'run', j), item: it } }));
    spk.forEach((it, j) => events.splice(1 + j * 3, 0, { kind: 'door', ch: { kind: 'speak', item: it } }));
    const sp = ws.slice(2).find(w => /^[a-z]{2,7}$/.test(w.en));
    if (sp) events.splice(5, 0, { kind: 'spell', item: sp });
    events.push(...ws.slice(3, 5).map((it, j) => ({ kind: 'block', ch: { kind: j ? 'en-he' : 'he-en', item: it } })));
  }
  runStage({ unit: u, k, events, theme: u.theme, seed: hash(u.id + k + Date.now() % 7), difficulty: diff, pool });
}

function review() {
  const list = due().sort((a, b) => S.box(a.en) - S.box(b.en)).slice(0, 12);
  if (!list.length) { toast('אין מה לחזור היום – כל הכבוד! 🎉'); return go('#/'); }
  const unlocked = items.filter((_, i) => S.unitUnlocked(UNITS, i)).flat();
  const events = list.map((it, j) => it.sent ? { kind: 'block', ch: { kind: kindFor(it, 'run', j), item: it } }
    : (j % 4 === 3 && /^[a-z]{2,7}$/.test(it.en)) ? { kind: 'spell', item: it }
      : j % 5 === 4 ? { kind: 'door', ch: { kind: 'speak', item: it } } : { kind: 'block', ch: { kind: kindFor(it, 'run', j), item: it } });
  const themes = ['grass', 'desert', 'snow', 'cave', 'sky', 'castle'];
  runStage({ unit: null, k: 0, events, theme: themes[new Date().getDay() % 6], seed: Date.now() % 1e6, difficulty: 0.4, pool: unlocked, title: 'חזרה יומית הושלמה!' });
}

// ---------- shop
const SHOP = [
  ...['#ff7a1a', '#ef4444', '#22c55e', '#0ea5e9', '#a855f7', '#f472b6', '#111827', '#facc15'].map(c => ({ id: 'hoodie:' + c, slot: 'hoodie', v: c, name: 'קפוצ׳ון', cost: 30, sw: c })),
  ...['#2463eb', '#ef4444', '#16a34a', '#111827', '#f59e0b', '#ec4899'].map(c => ({ id: 'cap:' + c, slot: 'cap', v: c, name: 'צבע כובע ותיק', cost: 25, sw: c })),
  { id: 'hat:cap', slot: 'hat', v: 'cap', name: 'כובע מצחייה', cost: 0, em: '🧢' },
  { id: 'hat:kippah', slot: 'hat', v: 'kippah', name: 'כיפה', cost: 10, em: '🔵' },
  { id: 'hat:helmet', slot: 'hat', v: 'helmet', name: 'קסדה', cost: 80, em: '⛑️' },
  { id: 'hat:cowboy', slot: 'hat', v: 'cowboy', name: 'כובע בוקרים', cost: 100, em: '🤠' },
  { id: 'hat:wizard', slot: 'hat', v: 'wizard', name: 'כובע קוסם', cost: 150, em: '🧙' },
  { id: 'hat:crown', slot: 'hat', v: 'crown', name: 'כתר', cost: 250, em: '👑' },
  { id: 'extra:shades', slot: 'extra', v: 'shades', name: 'משקפי שמש', cost: 120, em: '🕶️' },
  { id: 'extra:cape', slot: 'extra', v: 'cape', name: 'גלימת גיבור', cost: 200, em: '🦸' },
];
function shop() {
  clear(); document.body.className = 'map-bg';
  const s = S.st(), prev = h('div.shop-prev');
  const draw = () => { prev.innerHTML = ''; prev.append(heroCanvas(110)); };
  const grid = h('div.shop-grid');
  const render = () => {
    grid.innerHTML = '';
    for (const it of SHOP) {
      const own = it.cost === 0 || s.owned.includes(it.id), on = s.look[it.slot] === it.v;
      grid.append(h('button.shop-item' + (on ? '.on' : '') + (own ? '.own' : ''), { onclick: () => {
        if (!own) {
          if (s.coins < it.cost) { sfx('bad'); return toast(`צריך עוד ${it.cost - s.coins} 🪙 – תשחק עוד קצת!`); }
          s.coins -= it.cost; s.owned.push(it.id); sfx('coin'); confetti(30);
        }
        if (it.slot === 'extra' && on) s.look.extra = ''; else s.look[it.slot] = it.v;
        S.save(); draw(); render(); app.querySelector('.stats')?.replaceWith(statsBar());
      } }, it.sw ? h('span.swatch', { style: { background: it.sw } }) : h('span.big-emoji.sm', {}, it.em),
        h('small', {}, it.name), h('b', {}, on ? '✔ לבוש' : own ? 'ללבוש' : `🪙 ${it.cost}`)));
    }
  };
  app.append(h('div.topbar', {}, h('button.btn.round', { onclick: () => go('#/') }, '→'), h('div.title', {}, '🛒 החנות'), statsBar()), prev, grid);
  draw(); render();
}

// ---------- parent area
function parent() {
  clear(); document.body.className = 'map-bg';
  const a = 3 + Math.floor(Math.random() * 7), b = 11 + Math.floor(Math.random() * 8);
  const inp = h('input.name-in', { inputmode: 'numeric', placeholder: '?' });
  app.append(h('div.topbar', {}, h('button.btn.round', { onclick: () => go('#/') }, '→'), h('div.title', {}, 'אזור הורים')),
    h('form.gate', { onsubmit: e => { e.preventDefault(); if (+inp.value === a * b) parentPanel(); else { inp.value = ''; toast('לא נכון'); } } },
      h('p', {}, `כדי להיכנס: כמה זה ${a} × ${b}?`), inp, h('button.btn.primary', { type: 'submit' }, 'כניסה')));
  inp.focus();
}
function parentPanel() {
  clear(); document.body.className = 'map-bg';
  const s = S.st(), set = s.settings;
  const known = Object.keys(s.items).length, acc = s.stats.answers ? Math.round(s.stats.right / s.stats.answers * 100) : 0;
  const days = [...Array(7)].map((_, k) => { const d = new Date(); d.setDate(d.getDate() - 6 + k); const key = S.today(d); return { key, ...(s.days[key] || { xp: 0, sec: 0 }) }; });
  const weak = Object.entries(s.items).filter(([, v]) => v.w > v.r || v.b === 0).sort((x, y) => (y[1].w - y[1].r) - (x[1].w - x[1].r)).slice(0, 15);
  const toggle = (key, label) => h('label.set', {}, h('input', { type: 'checkbox', checked: set[key] ? true : null, onchange: e => { set[key] = e.target.checked; S.save(); } }), label);
  const fileIn = h('input', { type: 'file', accept: '.json', hidden: true, onchange: async e => { try { S.importJson(await e.target.files[0].text()); toast('שוחזר ✔'); parentPanel(); } catch (err) { toast('קובץ לא תקין'); } } });
  app.append(h('div.topbar', {}, h('button.btn.round', { onclick: () => go('#/') }, '→'), h('div.title', {}, 'אזור הורים')),
    h('div.parent', {},
      h('section', {}, h('h3', {}, 'התקדמות'),
        h('div.kpis', {},
          h('div', {}, h('b', {}, UNITS.filter(S.unitDone).length + '/' + UNITS.length), h('small', {}, 'עולמות שהושלמו')),
          h('div', {}, h('b', {}, known), h('small', {}, 'מילים ומשפטים שתרגל')),
          h('div', {}, h('b', {}, S.mastered()), h('small', {}, 'יודע היטב (3+ חזרות)')),
          h('div', {}, h('b', {}, acc + '%'), h('small', {}, 'דיוק בתשובות')),
          h('div', {}, h('b', {}, s.stats.spoken), h('small', {}, 'פעמים דיבר')),
          h('div', {}, h('b', {}, s.stats.typed), h('small', {}, 'מילים שכתב'))),
        h('div.week', {}, days.map(d => h('div.day', { title: d.key }, h('i', { style: { height: Math.min(100, d.sec / 12) + '%' } }), h('small', {}, Math.round(d.sec / 60) + 'ד׳')))),
        h('p.note', {}, 'דקות משחק ב-7 הימים האחרונים. מומלץ: 15–20 דקות ביום, כל יום.')),
      weak.length ? h('section', {}, h('h3', {}, 'מה עוד קשה לו'), h('div.weak', {}, weak.map(([k]) => h('span.chip', { dir: 'ltr', onclick: () => say(k, 'en') }, k)))) : null,
      h('section', {}, h('h3', {}, 'הגדרות'),
        h('label.set', {}, 'סדר ההקראה: ', h('select', { onchange: e => { set.order = e.target.value; S.save(); trio('dog', 'כלב'); } },
          [['ehe', 'אנגלית – עברית – אנגלית'], ['heh', 'עברית – אנגלית – עברית'], ['eh', 'אנגלית – עברית']].map(([v, t]) => h('option', { value: v, selected: set.order === v ? true : null }, t)))),
        toggle('slow', 'אנגלית איטית יותר'), toggle('music', 'מוזיקה'), toggle('sfx', 'אפקטים קוליים'),
        toggle('unlockAll', 'לפתוח את כל העולמות והשלבים'),
        h('label.set', {}, 'שם השחקן: ', h('input', { value: s.name, onchange: e => { s.name = e.target.value.trim(); S.save(); } }))),
      h('section', {}, h('h3', {}, 'גיבוי'),
        h('p.note', {}, 'ההתקדמות נשמרת רק בדפדפן הזה. כדאי לשמור גיבוי מדי פעם, או כדי לעבור למכשיר אחר.'),
        h('div.row', {},
          h('button.btn', { onclick: () => { const a2 = h('a', { href: URL.createObjectURL(new Blob([S.exportJson()], { type: 'application/json' })), download: `english-quest-${S.today()}.json` }); a2.click(); } }, '⬇ שמירת גיבוי'),
          h('button.btn', { onclick: () => fileIn.click() }, '⬆ שחזור'), fileIn,
          h('button.btn.danger', { onclick: () => { if (confirm('למחוק את כל ההתקדמות?')) { S.reset(); go('#/'); route(); } } }, 'איפוס'))),
      h('section', {}, h('h3', {}, 'איך זה עובד'),
        h('p.note', {}, `${UNITS.length} עולמות, בכל אחד: מילים, שלב ריצה, משפטים, שלב דיבור, סיפור וקרב בוס. מילים שטעה בהן חוזרות ב"חזרה יומית" (חזרה מרווחת). זיהוי הדיבור משתמש בשירות של הדפדפן (Chrome / Edge / Safari) ודורש אינטרנט; בלי זה מופיע כפתור "אמרתי!".`))));
}

// ---------- router
function route() {
  const s = S.st();
  const m = location.hash.match(/^#\/?(\w*)\/?(\d*)\/?(\d*)/) || [];
  const setup = location.hash.match(/name=([^&]+)/);
  if (setup) { s.name = decodeURIComponent(setup[1]).slice(0, 20); S.save(); history.replaceState(null, '', location.pathname); }
  if (!s.name) return welcome();
  stopMusic();
  const [, r, a, b] = m;
  if (r === 'unit') return unitScreen(+a);
  if (r === 'play') return playStage(+a, +b);
  if (r === 'review') return review();
  if (r === 'shop') return shop();
  if (r === 'parent') return parent();
  home();
}

async function start() {
  S.load();
  await loadManifests();
  addEventListener('hashchange', route);
  addEventListener('pointerdown', unlockAudio, { once: true });
  // play time (counts only while the tab is visible)
  timer = setInterval(() => { if (document.visibilityState === 'visible') S.addTime(15); }, 15000);
  route();
  if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(() => { });
}
window.__eq = { get game() { return game; } };   // handy for testing in the console
start();
