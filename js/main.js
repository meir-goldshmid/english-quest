// App shell: world map, units, platformer stages, review, shop and parent area.
import { TRACKS, unitsFor } from './curriculum.js';
import * as S from './store.js';
import { stagesFor } from './store.js';
import { h, en, $, shuffle, sample, toast, confetti, wait, dialog } from './ui.js';
import { loadManifests, say, trio, sfx, stop, music, stopMusic, unlockAudio } from './audio.js';
import { buildLevel, buildArena, hash } from './levels.js';
import { Game, drawHero } from './game.js';
import { runChallenge, kindFor } from './challenges.js';
import { runRush } from './rush.js';
import { learnCards, storyScreen, ruleScreen, readingScreen, testScreen, gapItem, trItem, gradeWord } from './screens.js';
import { SCHOOL } from './school.js';
import { BADGES, checkBadges } from './badges.js';

const app = $('#app');
let UNITS = [], items = [], trackId = '';
// the course depends on the player's track (kids / middle / teen)
function setTrack() {
  const t = S.st().track || 'kids';
  if (t === trackId) return;
  trackId = t; UNITS = unitsFor(t);
  items = UNITS.map(u => [
    ...u.words.map(([e, he, em]) => ({ en: e, he, em, sent: false, unit: u.id })),
    ...u.sentences.map(([e, he]) => ({ en: e, he, em: '', sent: true, unit: u.id })),
    ...(u.gaps || []).map(g => ({ ...gapItem(g), unit: u.id })),
  ]);
}
const unitIdx = id => UNITS.findIndex(u => u.id === id);
let game = null, timer = null;

const neon = () => TRACKS[S.st().track]?.style === 'neon';
function clear() {
  stop(); game?.destroy(); game = null;
  document.body.className = '';
  document.documentElement.classList.toggle('neon', !!S.currentProfile() && neon());
  document.querySelectorAll('body > .modal-bg').forEach(m => m.remove());
  app.innerHTML = '';
}
function go(hash) { location.hash = hash; }
const due = () => items.flat().filter(it => S.isDue(it.en));

// ---------- header bits
function statsBar() {
  const s = S.st(), d = s.days[S.today()]?.xp || 0;
  const pct = Math.min(100, d / S.DAILY_GOAL * 100);
  const rk = S.rankFor(s.points || 0);
  return h('div.stats', {},
    neon() ? h('span.pill.rank', { title: 'דרגה' }, rk.em, ' ', h('span', { dir: 'ltr' }, `${rk.name} · ${(s.points || 0).toLocaleString()} pts`)) : h('span.pill', { title: 'מטבעות' }, '🪙 ', s.coins),
    h('span.pill', { title: 'ימים ברצף' }, '🔥 ', S.streak()),
    h('span.pill.goal', { title: 'יעד יומי', style: { '--p': pct + '%' } }, pct >= 100 ? '✅ יעד היום' : `🎯 ${Math.round(pct)}%`));
}
function heroCanvas(size = 90) {
  if (S.currentProfile() && neon()) {
    const n = (S.st().name || '?').trim();
    return h('div.avatar', { style: { width: size + 'px', height: size + 'px', fontSize: Math.round(size * 0.42) + 'px' } }, n.slice(0, 2).toUpperCase());
  }
  const cv = h('canvas.hero-cv', { width: size, height: size * 1.3 });
  drawHero(cv.getContext('2d'), size / 2, size * 1.25, { look: S.st().look, scale: size / 60 });
  return cv;
}

// ---------- first run / new player: name + track
function trackCards(sel, onPick) {
  return h('div.tracks', {}, Object.values(TRACKS).map(t => h('button.track' + (t.id === sel ? '.on' : ''), { type: 'button', onclick: e => { e.currentTarget.parentNode.querySelectorAll('.track').forEach(x => x.classList.remove('on')); e.currentTarget.classList.add('on'); onPick(t.id); } },
    h('span.tem', {}, t.em), h('b', {}, t.name), h('span.tage', {}, t.ages + ' · ' + t.grades), h('small', {}, t.blurb), h('span.tlevel', { dir: 'ltr' }, t.level + ' · ' + t.units.length + ' worlds'))));
}
function welcome(adding = false) {
  clear(); document.body.className = 'sky-bg';
  let track = 'kids';
  const inp = h('input.name-in', { placeholder: 'השם שלך', maxlength: 20 });
  app.append(h('div.welcome', {},
    h('div.logo', { dir: 'ltr' }, 'English ', h('b', {}, 'Quest')),
    heroCanvas(100),
    h('p', {}, adding ? 'שחקן חדש! מה השם ובאיזה מסלול?' : 'הרפתקה באנגלית! רצים, קופצים, אוספים אותיות, מדברים – ולומדים.'),
    h('form', { onsubmit: e => { e.preventDefault(); const n = inp.value.trim(); if (!n) return inp.focus(); S.addProfile(n, track); trackId = ''; unlockAudio(); say("Hello! Let's play!", 'en'); go('#/'); route(); } },
      h('label', {}, 'איך קוראים לך?'), inp,
      h('label', {}, 'בחר מסלול (אפשר לשנות אחר כך):'), trackCards(track, t => { track = t; }),
      h('button.btn.primary.big.wide', { type: 'submit' }, 'יוצאים לדרך! 🚀')),
    adding ? h('button.btn.soft', { onclick: () => go('#/') }, '→ חזרה') : null));
  inp.focus();
}
function players() {
  clear(); document.body.className = 'map-bg';
  const cur = S.currentProfile();
  app.append(h('div.topbar', {}, h('button.btn.round.back', { onclick: () => go('#/') }, '→'), h('div.title', {}, '👥 מי משחק?')),
    h('div.players', {}, S.profiles().map(p => {
      const t = TRACKS[p.track] || TRACKS.kids;
      return h('div.player' + (cur && p.id === cur.id ? '.on' : ''), {},
        h('button.pmain', { onclick: () => { S.switchProfile(p.id); trackId = ''; go('#/'); route(); } }, h('span.tem', {}, t.em), h('b', {}, p.name), h('small', {}, t.name + ' · ' + t.ages)),
        h('button.btn.round.sm.soft', { title: 'מחיקה', onclick: async () => { if (await dialog({ icon: '🗑️', title: `למחוק את ${p.name}?`, text: 'כל ההתקדמות של השחקן תימחק.', yes: 'למחוק', no: 'ביטול', danger: true })) { S.removeProfile(p.id); trackId = ''; S.profiles().length ? players() : (location.hash = '#/', route()); } } }, '🗑️'));
    }), h('button.player.add', { onclick: () => welcome(true) }, h('span.tem', {}, '➕'), h('b', {}, 'שחקן חדש'))));
}
function schoolPage() {
  clear(); document.body.className = 'map-bg';
  const t = S.st().track;
  app.append(h('div.topbar', {}, h('button.btn.round.back', { onclick: () => go('#/') }, '→'), h('div.title', {}, '🏫 מה לומדים בבית הספר?')),
    h('div.school', {},
      h('p.note', {}, SCHOOL.intro),
      SCHOOL.rows.map(r => h('section.grade-row' + (r.tracks.includes(t) ? '.mine' : ''), {},
        h('div.gr-head', {}, h('b', {}, r.grades), h('span.lvl', { dir: 'ltr' }, r.cefr), h('span.band', {}, r.level)),
        h('div.gr-body', {},
          h('div', {}, h('small', {}, 'מה לומדים:'), h('ul', {}, r.topics.map(x => h('li', {}, x)))),
          h('div', {}, h('small', {}, 'איפה זה במשחק:'), h('ul', {}, r.app.map(x => h('li', {}, x))))))),
      h('section.sources', {}, h('small', {}, 'מקורות:'), SCHOOL.sources.map(([label, url]) => h('a', { href: url, target: '_blank', rel: 'noopener' }, label))),
      h('p.note', {}, SCHOOL.disclaimer)));
}

// ---------- world map
const SCENERY = { grass: ['🌳', '🌻', '🍄'], desert: ['🌵', '🐪', '🏜️'], snow: ['⛄', '🌲', '❄️'], cave: ['💎', '🕯️', '🪨'], sky: ['🎈', '🌈', '☁️'], castle: ['🏰', '🛡️', '🚩'] };
const SEASONS = [{ at: 0, he: 'עונה 1 · יסודות', en: 'Season 1', sub: 'מילים ראשונות, משפטים פשוטים ושיחות קצרות' },
  { at: 24, he: 'עונה 2 · מדברים שוטף', en: 'Season 2', sub: 'זמנים, השוואות, סיפורים ושיחות ארוכות + כללי קריאה' }];
function home() {
  clear(); document.body.className = 'map-bg';
  const s = S.st(), cur = S.currentUnit(UNITS), dueN = due().length, cu = UNITS[cur];
  const T = TRACKS[s.track] || TRACKS.kids;
  const starsOf = u => stagesFor(u).map((_, k) => S.stageStars(u.id, k));
  // stage dots: empty / done / perfect
  const dots = u => h('span.sdots', {}, starsOf(u).map(st => h('i' + (st === 3 ? '.gold' : st ? '.on' : ''))));

  // ---- continue card
  const cst = stagesFor(cu), nextK = Math.max(0, starsOf(cu).findIndex(x => !x));
  const hero = h('section.continue.theme-' + cu.theme, {},
    h('div.c-icon', {}, h('span', {}, cu.em)),
    h('div.c-body', {},
      h('small', {}, `עולם ${cur + 1}${cu.grade ? ' · כיתה ' + cu.grade : ''}`),
      h('b.en', { dir: 'ltr' }, cu.title),
      h('span.c-next', {}, 'הבא: ', cst[nextK].em, ' ', cst[nextK].name),
      dots(cu)),
    h('button.btn.primary.big.c-play', { onclick: () => go(S.stageUnlocked(UNITS, cur, nextK) ? `#/play/${cur}/${nextK}` : '#/unit/' + cur) }, '▶ ', 'שחק'));

  // ---- tiles
  const tile = (em, label, onclick, extra = '') => h('button.tile-btn' + extra, { onclick }, h('span.t-em', {}, em), h('span.t-label', {}, label));
  const badgeN = (s.badges || []).length;
  const tiles = h('nav.tiles', {},
    dueN ? tile('🔁', `חזרה יומית · ${Math.min(dueN, 12)}`, () => go('#/review'), '.hot') : null,
    tile('🏆', 'טבלת המשפחה', () => go('#/leaders')),
    tile('🏅', `תגים ${badgeN}/${BADGES.length}`, () => go('#/badges')),
    neon() ? null : tile('🛒', 'חנות', () => go('#/shop')),
    tile('🖨️', 'דפי עבודה', () => { location.href = 'print.html'; }),
    tile('🏫', 'מה לומדים בכיתה', () => go('#/school')),
    tile('👨‍👩‍👦', 'הורים', () => go('#/parent')));

  // ---- the path: icon nodes on a winding left / center / right trail
  const path = h('div.path');
  const LANE = [0, 1, 2, 1];
  UNITS.forEach((u, i) => {
    const season = s.track === 'kids' ? SEASONS.find(x => x.at === i) : null;
    if (season) path.append(h('div.season' + (S.unitUnlocked(UNITS, i) ? '' : '.locked'), {}, h('b', {}, season.he), h('span.en', { dir: 'ltr' }, season.en), h('small', {}, season.sub)));
    const open = S.unitUnlocked(UNITS, i), st = starsOf(u), got = st.reduce((a, b) => a + b, 0), max = st.length * 3;
    const state = !open ? '.locked' : S.unitDone(u) ? '.done' : i === cur ? '.current' : '';
    const sc = SCENERY[u.theme] || SCENERY.grass;
    path.append(h('div.node-row.lane' + LANE[i % 4], {},
      h('button.node.theme-' + u.theme + state, { onclick: () => open ? go('#/unit/' + i) : toast('🔒 קודם מסיימים את העולם הקודם'), title: u.title },
        h('span.ring', { style: { '--pct': (got / max * 100) + '%' } }, h('span.n-em', {}, open ? u.em : '🔒'), state === '.done' ? h('span.n-check', {}, '✓') : null),
        i === cur ? h('span.n-here', {}, 'אתה כאן') : null,
        h('span.n-card', {},
          h('span.n-num', {}, `עולם ${i + 1}${u.grade ? ' · ' + u.grade : ''}`),
          h('b.en', { dir: 'ltr' }, u.title),
          h('small', {}, u.he),
          open ? dots(u) : null)),
      h('span.scenery', {}, sc[i % sc.length])));
  });

  app.append(
    h('header.home-top', {},
      h('button.me', { onclick: () => go('#/players'), title: 'החלפת שחקן' }, heroCanvas(46),
        h('div', {}, h('b', {}, s.name || ''), h('small', {}, `${T.em} ${T.name} · החלף שחקן`))),
      statsBar()),
    hero, tiles, path);

  const drawTrail = () => {
    path.querySelector('svg.trail')?.remove();
    const rings = [...path.querySelectorAll('.ring')], box = path.getBoundingClientRect();
    if (rings.length < 2 || !box.width) return;
    const pts = rings.map(n => { const r = n.getBoundingClientRect(); return [r.left + r.width / 2 - box.left, r.top + r.height / 2 - box.top]; });
    const NS = 'http://www.w3.org/2000/svg', svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'trail'); svg.setAttribute('width', box.width); svg.setAttribute('height', path.scrollHeight);
    pts.slice(0, -1).forEach(([x, y], k) => {
      const [x2, y2] = pts[k + 1], my = (y + y2) / 2, pth = document.createElementNS(NS, 'path');
      pth.setAttribute('d', `M${x} ${y} C${x} ${my} ${x2} ${my} ${x2} ${y2}`); pth.setAttribute('class', k < cur ? 'walked' : 'ahead'); svg.append(pth);
    });
    path.prepend(svg);
  };
  requestAnimationFrame(() => { drawTrail(); if (cur > 1) path.querySelector('.node.current')?.scrollIntoView({ block: 'center' }); });
  const onR = () => { if (!document.body.contains(path)) return removeEventListener('resize', onR); drawTrail(); };
  addEventListener('resize', onR);
  announceBadges();
}

// ---------- badges
function announceBadges() {
  const fresh = checkBadges(UNITS);
  fresh.forEach((b, n) => setTimeout(() => { sfx('win'); confetti(40); toast(`🏅 תג חדש: ${b.em} ${b.name}!`, 2600); }, 900 + n * 2800));
}
function badgesScreen() {
  clear(); document.body.className = 'map-bg';
  checkBadges(UNITS);
  const got = new Set(S.st().badges || []);
  app.append(h('div.topbar', {}, h('button.btn.round.back', { onclick: () => go('#/') }, '→'), h('div.title', {}, `🏅 התגים שלי · ${got.size}/${BADGES.length}`)),
    h('div.badges', {}, BADGES.map(b => h('div.badge' + (got.has(b.id) ? '.on' : ''), {}, h('span.bem', {}, b.em), h('b', {}, b.name), h('small', {}, b.desc)))));
}

// ---------- unit screen
function unitScreen(i) {
  const u = UNITS[i]; if (!u || !S.unitUnlocked(UNITS, i)) return go('#/');
  clear(); document.body.className = 'unit-bg theme-' + u.theme;
  const list = h('div.stages');
  stagesFor(u).forEach((stg, k) => {
    const open = S.stageUnlocked(UNITS, i, k), stars = S.stageStars(u.id, k);
    list.append(h('button.stage' + (open ? '' : '.locked') + (stars ? '.done' : ''), { onclick: () => open ? go(`#/play/${i}/${k}`) : toast('🔒 קודם מסיימים את השלב הקודם') },
      h('span.sem', {}, open ? stg.em : '🔒'), h('span.sname', {}, stg.name),
      h('span.sstars', {}, [0, 1, 2].map(n => h('i' + (n < stars ? '.on' : ''), {}, '★')))));
  });
  app.append(h('div.topbar', {}, h('button.btn.round.back', { onclick: () => go('#/') }, '→'), h('div.title', {}, u.em + ' ', h('span.en', { dir: 'ltr' }, u.title), ' · ', u.he), statsBar()),
    h('div.unit-hero', {}, heroCanvas(80), h('div.unit-info', {}, h('div', {}, `עולם ${i + 1} מתוך ${UNITS.length}${u.grade ? ' · כיתה ' + u.grade + ' · ' + u.level : ''}`),
      h('small', {}, u.grammar ? h('span', { dir: 'ltr' }, u.grammar.rule) : `${u.words.length} מילים · ${u.sentences.length} משפטים · סיפור`)),
      u.grammar ? h('button.btn.arcade', { onclick: () => go('#/arcade/' + i), title: 'בונוס – לא חובה' }, '🕹️ ארקייד (בונוס)') : null),
    list);
}

// ---------- results
function results({ unit, k, stars, coins, xp, title, score }) {
  const better = unit ? S.finishStage(unit.id, k, stars, score) : false;
  const s = S.st(); s.coins += coins; S.save(); S.addXp(xp + 10);
  stopMusic(); sfx('win'); if (stars >= 2) confetti();
  const box = h('div.modal-bg', {}, h('div.modal.result', {},
    h('div.big-stars', {}, [0, 1, 2].map(n => h('span' + (n < stars ? '.on' : ''), { style: { animationDelay: n * 0.25 + 's' } }, '★'))),
    score != null ? h('div.score' + (stars ? '' : '.low'), {}, score) : null,
    h('h2', {}, title || (score != null ? gradeWord(score) : stars === 3 ? 'מושלם!' : stars === 2 ? 'כל הכבוד!' : stars ? 'סיימת!' : 'כמעט! נסה שוב')),
    h('div.reward', {}, `🪙 +${coins}`, better && unit ? ' · שיא חדש!' : ''),
    h('div.row', {},
      unit ? h('button.btn', { onclick: () => { box.remove(); route(); } }, '🔁 שוב') : null,
      h('button.btn.primary', { onclick: () => { box.remove(); go(unit ? '#/unit/' + unitIdx(unit.id) : '#/'); } }, 'המשך ←'))));
  document.body.append(box);
  say(stars === 3 ? 'Perfect!' : 'Well done!', 'en');
  if (!unit && title?.startsWith('חזרה')) { s.stats.reviews = (s.stats.reviews || 0) + 1; S.save(); }
  announceBadges();
}

// ---------- platformer stage (also the boss arena)
const BOSSES = { grass: ['🐲', 'Dragon Dino'], desert: ['🦂', 'King Scorpion'], snow: ['🐻‍❄️', 'Ice Bear'], cave: ['🦇', 'Bat Boss'], sky: ['🌩️', 'Storm Cloud'], castle: ['🧌', 'Big Troll'] };
function runStage({ unit, k, events, theme, seed, difficulty, pool, title, boss }) {
  clear(); document.body.className = 'playing';
  const s = S.st();
  const wrap = h('div.game-wrap'), cv = h('canvas.game'); wrap.append(cv);
  const modal = h('div.modal-bg.hidden', {}, h('div.modal.chal-host'));
  const host = modal.firstChild;
  const exit = () => go(unit ? '#/unit/' + unitIdx(unit.id) : '#/');
  const hud = h('div.hud', {}, h('button.btn.round.sm.exit', { onclick: async () => { if (!game) return; game.paused = true; const ok = await dialog({ icon: '🏃‍♂️💨', title: 'לצאת מהשלב?', text: 'ההתקדמות בשלב הזה לא תישמר.', yes: 'כן, לצאת', no: 'ממשיכים לשחק! 🎮', stay: true }); if (ok) exit(); else if (game) { game.paused = false; game.last = performance.now(); } } }, '✕'),
    h('span.pill.hc'), h('span.pill.hh'), h('span.pows'), boss ? h('div.bossbar', {}, h('span', {}, boss.em), h('div.hp', {}, h('i'))) : h('div.hprog', {}, h('i')));
  const spellBar = h('div.spellbar.hidden');
  const help = h('div.help', {}, boss ? 'פגע בקוביות ❓ וענה נכון – הכוכב שלך יפגע בבוס! היזהר מהכדורים 🔴' : 'חצים / רווח לקפיצה · פגע בקוביות ❓ מלמטה · אסוף אותיות לפי הסדר · ', boss ? null : h('b', {}, '🎤 דלת דיבור'));
  const ctrls = h('div.touch', {},
    h('div.tleft', {}, h('button.tb', { 'data-k': 'left' }, '◀'), h('button.tb', { 'data-k': 'right' }, '▶')),
    h('button.tb.jump', { 'data-k': 'jump' }, '⤒'));
  app.append(wrap, hud, spellBar, help, ctrls, modal);
  setTimeout(() => help.classList.add('fade'), boss ? 9000 : 6000);
  const L = boss ? buildArena({ theme }) : buildLevel({ theme, events, seed, difficulty });
  let right = 0, asked = 0, gates = 0;
  const queue = boss ? [...events] : null;            // boss: each block hit asks the next question in line
  const ask = async ch => {
    if (!ch) return undefined;
    modal.classList.remove('hidden');
    const r = await runChallenge(host, { ...ch, pool });
    modal.classList.add('hidden'); host.innerHTML = '';
    asked++; if (r.ok) { right++; S.addXp(2); } else if (queue) queue.push(ch);   // a missed boss question comes back later
    return r.ok;
  };
  const showSpell = z => {
    spellBar.classList.toggle('hidden', !z); if (!z) return;
    spellBar.innerHTML = '';
    spellBar.append(h('span.big-emoji.sm', {}, z.item.em || '✏️'), h('span.he', {}, z.item.he), h('span.letters', { dir: 'ltr' }, [...z.word].map((c, i) => h('b' + (i < z.next ? '.got' : ''), {}, i < z.next ? c : '_'))),
      h('button.btn.round.sm', { onclick: () => say(z.item.en, 'en') }, '🔊'));
  };
  const end = (stars, coins, stats) => {
    const st = S.st().stats;
    st.stomps = (st.stomps || 0) + (stats?.stomps || 0); st.powers = (st.powers || 0) + (stats?.powers || 0); st.gates = (st.gates || 0) + gates;
    if (boss) st.bosses = (st.bosses || 0) + 1;
    if (stars === 3 && !boss) st.perfect = (st.perfect || 0) + 1;
    S.save();
    setTimeout(() => results({ unit, k, stars, coins, xp: right * 2, title }), 600);
  };
  game = new Game(cv, L, s.look, {
    hud: st => {
      hud.querySelector('.hc').textContent = '🪙 ' + st.coins;
      hud.querySelector('.hh').textContent = '❤️'.repeat(st.hearts) + '🤍'.repeat(3 - st.hearts);
      hud.querySelector('.pows').textContent = st.pow.map(p => p.em + (p.left ? p.left : '')).join(' ');
      if (st.boss) hud.querySelector('.bossbar .hp i').style.width = (st.boss.hp / st.boss.max * 100) + '%';
      else hud.querySelector('.hprog i').style.width = st.progress * 100 + '%';
      showSpell(st.zone);
    },
    block: idx => ask(queue ? queue.shift() : events[idx].ch),
    door: idx => ask(events[idx].ch),
    zone: z => { if (z) { say(z.item.en, 'en'); } },
    letter: (z, ch, ok) => { if (!ok) say(z.word[z.next], 'en', { rate: 0.9 }); showSpell(z); },
    spelled: z => { S.grade(z.item.en, true); right++; asked++; gates++; trio(z.item.en, z.item.he, 'eh'); },
    oops: () => toast('אופס! ממשיכים מהדגל 🚩', 1500),
    lose: () => {
      const box = h('div.modal-bg', {}, h('div.modal.result', {}, h('div.big-emoji.huge', {}, '😵'), h('h2', {}, 'הבוס ניצח הפעם...'), h('p', {}, 'טיפ: אסוף מטבעות, ענה נכון ושמור מרחק מהכדורים 🔴'),
        h('div.row', {}, h('button.btn', { onclick: () => { box.remove(); exit(); } }, 'יציאה'), h('button.btn.primary', { onclick: () => { box.remove(); route(); } }, 'עוד פעם! 💪'))));
      document.body.append(box); stopMusic();
    },
    finish: ({ coins, stats }) => {
      if (boss) return end(game.hearts, coins, stats);           // stars = hearts left
      const ratio = right / Math.max(1, events.length);   // skipped blocks count as missed
      end(ratio >= 0.9 ? 3 : ratio >= 0.6 ? 2 : 1, coins, stats);
    },
  }, boss ? { boss: { hp: events.length, em: boss.em }, powerRate: 0 } : { powerRate: 0.45 });
  // touch controls
  ctrls.querySelectorAll('.tb').forEach(b => {
    const k2 = b.dataset.k;
    const set = v => e => { e.preventDefault(); if (k2 === 'jump') game?.pressJump(v); else if (game) game.input[k2] = v; b.classList.toggle('on', v); };
    b.addEventListener('pointerdown', e => { b.setPointerCapture(e.pointerId); set(true)(e); });
    b.addEventListener('pointerup', set(false)); b.addEventListener('pointercancel', set(false)); b.addEventListener('lostpointercapture', set(false));
  });
  music(theme);
}

// ---------- challenge mode (12+): timed rounds with combos and medals
async function rushStage(u, k, qs, opts) {
  clear(); document.body.className = 'rush-bg';
  const i = unitIdx(u.id);
  const r = await runRush(app, qs, { ...opts, onExit: () => go('#/unit/' + i) });
  if (!document.body.classList.contains('rush-bg')) return;          // the player left mid-round
  const stars = opts.boss && !r.beaten ? 0 : r.ratio >= 0.85 ? 3 : r.ratio >= 0.7 ? 2 : r.ratio >= 0.5 ? 1 : 0;
  S.addPoints(r.score); S.addXp(Math.round(r.score / 20));
  const st = S.st().stats; if (opts.boss && r.beaten) st.bosses = (st.bosses || 0) + 1; st.bestCombo = Math.max(st.bestCombo || 0, r.bestCombo); S.save();
  const better = S.finishStage(u.id, k, stars, Math.round(r.ratio * 100));
  const box = h('div.modal-bg', {}, h('div.modal.result.rush-result', {},
    h('div.medal', {}, r.medal.em), h('div.medal-name', { dir: 'ltr' }, r.medal.name),
    h('div.r-stats', {},
      h('div', {}, h('b', {}, r.score.toLocaleString()), h('small', {}, 'נקודות')),
      h('div', {}, h('b', {}, Math.round(r.ratio * 100) + '%'), h('small', {}, 'דיוק')),
      h('div', {}, h('b', {}, 'x' + Math.min(4, 1 + Math.floor(r.bestCombo / 2))), h('small', {}, `רצף שיא ${r.bestCombo}`))),
    h('div.big-stars', {}, [0, 1, 2].map(n => h('span' + (n < stars ? '.on' : ''), { style: { animationDelay: n * 0.2 + 's' } }, '★'))),
    h('p.note', {}, stars ? (better ? 'שיא חדש! ' : '') + 'השלב הבא נפתח.' : opts.boss ? 'הבוס עדיין עומד. עוד ניסיון?' : 'צריך לפחות 50% כדי להתקדם. עוד סיבוב?'),
    h('div.row', {}, h('button.btn', { onclick: () => { box.remove(); route(); } }, '🔁 שוב'), h('button.btn.primary', { onclick: () => { box.remove(); go('#/unit/' + i); } }, 'המשך ←'))));
  document.body.append(box);
  if (r.ratio >= 0.85) confetti();
  announceBadges();
}
function arcade(i) {
  const u = UNITS[i]; if (!u?.grammar || !S.unitUnlocked(UNITS, i)) return go('#/');
  const its = items[i], words = its.filter(x => !x.sent), pool = its;
  const ws = weakFirst(words), sp = ws.filter(w => /^[a-z]{3,8}$/.test(w.en)).slice(0, 2);
  const evs = shuffle([...sample(u.gaps, 8).map(g => ({ kind: 'block', ch: { kind: 'gap', item: gapItem(g) } })),
    ...sample(u.transforms, 2).map(t => ({ kind: 'block', ch: { kind: 'transform', item: trItem(t) } }))]);
  sp.forEach((it, j) => evs.splice(3 + j * 5, 0, { kind: 'spell', item: it }));
  runStage({ unit: null, k: 0, events: evs, theme: u.theme, seed: hash(u.id + Date.now() % 97), difficulty: Math.min(0.85, 0.4 + i * 0.025), pool, title: 'ארקייד הושלם! 🕹️' });
}
function leaders() {
  clear(); document.body.className = 'map-bg';
  const rows = S.leaderboard(), medals = ['🥇', '🥈', '🥉'];
  app.append(h('div.topbar', {}, h('button.btn.round.back', { onclick: () => go('#/') }, '→'), h('div.title', {}, '🏆 טבלת המשפחה – השבוע')),
    h('p.note', {}, 'נקודות השבוע (ראשון עד שבת) של כל השחקנים במכשיר הזה. מתאפס בכל יום ראשון.'),
    h('div.leaders', {}, rows.map((r, n) => {
      const t = TRACKS[r.track] || TRACKS.kids, rk = S.rankFor(r.points);
      return h('div.leader' + (r.me ? '.me' : ''), {}, h('span.lpos', {}, medals[n] || n + 1), h('div.lname', {}, h('b', {}, r.name), h('small', {}, `${t.em} ${t.name} · ${rk.em} ${rk.name}`)), h('b.lpts', {}, r.week.toLocaleString()));
    })),
    rows.length < 2 ? h('p.note', {}, 'רוצים תחרות? הוסיפו עוד שחקן (אח, אחות, הורה...) במסך "מי משחק?".') : null);
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
  const STG = stagesFor(u), sid = STG[k]?.id; if (!sid) return go('#/');
  const diff = Math.min(0.85, (u.grammar ? (u.track === 'teen' ? 0.45 : 0.3) : 0.15) + i * 0.025);
  if (sid === 'learn' || sid === 'sent') {
    clear(); document.body.className = 'cards-bg theme-' + u.theme;
    return learnCards(app, sid === 'learn' ? words : sents, { title: u.em + ' ' + STG[k].name, onDone: () => done(3, 10, 10), onExit: back, rule: sid === 'learn' ? u.phonics : null });
  }
  if (sid === 'rule') { clear(); document.body.className = 'cards-bg theme-' + u.theme; return ruleScreen(app, u, { onDone: (st, xp) => done(st, xp, 10), onExit: back }); }
  if (sid === 'reading') { clear(); document.body.className = 'cards-bg theme-' + u.theme; return readingScreen(app, u, { onDone: (st, xp) => done(st, xp, 15), onExit: back }); }
  if (sid === 'test') {
    clear(); document.body.className = 'cards-bg theme-' + u.theme;
    return testScreen(app, u, pool, { pick: sample, onExit: back, onDone: (st, xp, score) => results({ unit: u, k, stars: st, coins: st ? 10 + st * 5 : 0, xp, score }) });
  }
  if (sid === 'rush') {
    const qs = shuffle([...sample(u.gaps, 7).map(g => ({ kind: 'gap', item: gapItem(g) })), ...sample(u.transforms, 2).map(t => ({ kind: 'transform', item: trItem(t) })),
      ...weakFirst(words).slice(0, 3).map((it, j) => ({ kind: j % 2 ? 'he-en' : 'en-he', item: it, pool }))]);
    return rushStage(u, k, qs, { title: '⚡ Grammar Rush' });
  }
  if (sid === 'speak') {
    const ss = weakFirst(sents.filter(x => !x.gap && x.en.split(' ').length <= 12));
    const qs = [...ss.slice(0, 3).map(it => ({ kind: 'speak', item: it })), ...ss.slice(3, 5).map(it => ({ kind: 'read', item: it })), ...ss.slice(5, 7).map(it => ({ kind: 'build', item: it, pool }))];
    return rushStage(u, k, qs, { title: '🎙️ Speak Up', timed: false });
  }
  if (sid === 'story') { clear(); document.body.className = 'cards-bg theme-' + u.theme; return storyScreen(app, u, { onDone: (st, xp) => done(st, xp, 15), onExit: back }); }
  if (sid === 'boss' && u.grammar) {
    // the final boss mixes this unit with earlier ones, so old grammar keeps coming back
    const prev = UNITS.slice(Math.max(0, i - 3), i).filter(x => x.gaps);
    const rounds = shuffle([...sample(u.gaps, 4).map(g => ({ kind: 'gap', item: gapItem(g) })), ...sample(u.transforms, 2).map(t => ({ kind: 'transform', item: trItem(t) })),
      ...prev.flatMap(x => sample(x.gaps, 1)).slice(0, 2).map(g => ({ kind: 'gap', item: gapItem(g) }))]);
    const [em, name] = BOSSES[u.theme] || BOSSES.grass;
    return rushStage(u, k, rounds, { title: '👑 Boss Rush', boss: { em, name } });
  }
  if (sid === 'boss') {
    const hard = i >= 10, ws = sample(words, 3), ssent = sample(sents.filter(x => x.en.split(' ').length <= 7), 2);
    const sp = sample(sents.filter(x => x.en.split(' ').length <= 5), 1);
    const rounds = shuffle([...ws.map((it, j) => ({ kind: kindFor(it, 'boss', j), item: it })), ...ssent.map((it, j) => ({ kind: kindFor(it, 'boss', j, hard), item: it })), ...sp.map(it => ({ kind: 'speak', item: it }))]);
    const [em, name] = BOSSES[u.theme] || BOSSES.grass;
    return runStage({ unit: u, k, events: rounds, theme: u.theme, seed: 1, difficulty: diff, pool, boss: { em, name } });
  }
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
    const rd = ss.find(x => x !== shortS[0] && x.en.split(' ').length <= 7);
    if (rd) events.push({ kind: 'door', ch: { kind: 'read', item: rd } });
    events.push(...ws.slice(3, 5).map((it, j) => ({ kind: 'block', ch: { kind: j ? 'en-he' : 'he-en', item: it } })));
    if (u.gaps) events.push(...sample(u.gaps, 2).map(g => ({ kind: 'block', ch: { kind: 'gap', item: gapItem(g) } })));
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
  app.append(h('div.topbar', {}, h('button.btn.round.back', { onclick: () => go('#/') }, '→'), h('div.title', {}, '🛒 החנות'), statsBar()), prev, grid);
  draw(); render();
}

// ---------- parent area
function parent() {
  clear(); document.body.className = 'map-bg';
  const a = 3 + Math.floor(Math.random() * 7), b = 11 + Math.floor(Math.random() * 8);
  const inp = h('input.name-in', { inputmode: 'numeric', placeholder: '?' });
  app.append(h('div.topbar', {}, h('button.btn.round.back', { onclick: () => go('#/') }, '→'), h('div.title', {}, 'אזור הורים')),
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
  app.append(h('div.topbar', {}, h('button.btn.round.back', { onclick: () => go('#/') }, '→'), h('div.title', {}, 'אזור הורים')),
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
        h('label.set', {}, 'שם השחקן: ', h('input', { value: s.name, onchange: e => { s.name = e.target.value.trim(); S.save(); } })),
        h('label.set', {}, 'מסלול: ', h('select', { onchange: e => { s.track = e.target.value; S.save(); trackId = ''; toast('המסלול הוחלף ✔'); } },
          Object.values(TRACKS).map(t => h('option', { value: t.id, selected: s.track === t.id ? true : null }, `${t.em} ${t.name} – ${t.ages} (${t.grades})`))))),
      h('section', {}, h('h3', {}, 'גיבוי'),
        h('p.note', {}, 'ההתקדמות נשמרת רק בדפדפן הזה. כדאי לשמור גיבוי מדי פעם, או כדי לעבור למכשיר אחר.'),
        h('div.row', {},
          h('button.btn', { onclick: () => { const a2 = h('a', { href: URL.createObjectURL(new Blob([S.exportJson()], { type: 'application/json' })), download: `english-quest-${S.today()}.json` }); a2.click(); } }, '⬇ שמירת גיבוי'),
          h('button.btn', { onclick: () => fileIn.click() }, '⬆ שחזור'), fileIn,
          h('button.btn.danger', { onclick: async () => { if (await dialog({ icon: '🗑️', title: 'למחוק את כל ההתקדמות?', text: 'כל הכוכבים, המטבעות והמילים של השחקן הזה יימחקו. אי אפשר לבטל.', yes: 'כן, למחוק', no: 'ביטול', danger: true })) { S.reset(); go('#/'); route(); } } }, 'איפוס'))),
      h('section', {}, h('h3', {}, 'איך זה עובד'),
        h('p.note', {}, `${UNITS.length} עולמות, בכל אחד: מילים, שלב ריצה, משפטים, שלב דיבור, סיפור וקרב בוס. מילים שטעה בהן חוזרות ב"חזרה יומית" (חזרה מרווחת). זיהוי הדיבור משתמש בשירות של הדפדפן (Chrome / Edge / Safari) ודורש אינטרנט; בלי זה מופיע כפתור "אמרתי!".`))));
}

// ---------- router
function route() {
  const s = S.st();
  const m = location.hash.match(/^#\/?(\w*)\/?(\d*)\/?(\d*)/) || [];
  const setup = location.hash.match(/name=([^&]+)/);
  if (setup) {                                  // <site>/#name=Beri&track=kids creates (or renames) the player once
    const n = decodeURIComponent(setup[1]).slice(0, 20), tr = (location.hash.match(/track=(\w+)/) || [])[1];
    if (!S.currentProfile()) S.addProfile(n, TRACKS[tr] ? tr : 'kids'); else { s.name = n; S.save(); }
    history.replaceState(null, '', location.pathname); return route();
  }
  if (!S.currentProfile()) return welcome();
  setTrack();
  stopMusic();
  const [, r, a, b] = m;
  if (r === 'unit') return unitScreen(+a);
  if (r === 'play') return playStage(+a, +b);
  if (r === 'review') return review();
  if (r === 'shop') return shop();
  if (r === 'badges') return badgesScreen();
  if (r === 'players') return players();
  if (r === 'school') return schoolPage();
  if (r === 'leaders') return leaders();
  if (r === 'arcade') return arcade(+a);
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
