// Non-platformer stages: word/sentence cards, story, boss battle.
import { h, en, shuffle, sample, wait, confetti } from './ui.js';
import { say, trio, sfx, stop } from './audio.js';
import { runChallenge, kindFor } from './challenges.js';
import { drawHero } from './game.js';
import { st, addXp, save } from './store.js';
import { canRecognize, listenOnce, judge } from './speech.js';

// ---------- learn cards (words or sentences)
export function learnCards(root, items, { title, onDone, onExit }) {
  let i = 0;
  const body = h('div.learn');
  root.append(h('div.topbar', {}, h('button.btn.round', { onclick: () => { stop(); onExit(); } }, '✕'), h('div.title', {}, title), h('div.count')), body);
  const count = root.querySelector('.count');
  const show = () => {
    const it = items[i];
    count.textContent = `${i + 1}/${items.length}`;
    const micMsg = h('div.speak-status');
    body.innerHTML = '';
    body.append(
      h('div.progress', {}, h('i', { style: { width: (i / items.length * 100) + '%' } })),
      h('div.card' + (it.sent ? '.sent' : ''), { onclick: () => trio(it.en, it.he) },
        it.em && !it.sent ? h('div.big-emoji.huge', {}, it.em) : null,
        h('div.card-en', { dir: 'ltr' }, it.en),
        h('div.card-he', {}, it.he)),
      h('div.sound-row', {},
        h('button.btn.round', { title: 'שוב', onclick: () => trio(it.en, it.he) }, '🔊'),
        h('button.btn.round', { title: 'לאט', onclick: () => say(it.en, 'en', { rate: 0.65 }) }, '🐢'),
        canRecognize() ? h('button.btn.round.mic-sm', { title: 'תגיד', onclick: async e => {
          const b = e.currentTarget; if (b.classList.contains('on')) return;
          stop(); b.classList.add('on'); micMsg.textContent = '🎙️ מקשיב...';
          try {
            const alts = await listenOnce(6000), r = judge(alts, it.en);
            micMsg.textContent = '';
            if (r.ok) { sfx('good'); micMsg.append('⭐ ', en('Great!', 'b'), ' שמעתי: ', en(r.heard)); st().stats.spoken++; st().coins++; save(); }
            else { micMsg.append(alts.length ? 'שמעתי: ' : 'לא שמעתי. ', alts.length ? en(r.heard) : 'נסה שוב', alts.length ? ' – נסה שוב' : ''); }
          } catch (err) { micMsg.textContent = 'המיקרופון לא זמין'; }
          b.classList.remove('on');
        } }, '🎤') : null),
      micMsg,
      h('div.nav-row', {},
        h('button.btn', { disabled: i === 0 ? true : null, onclick: () => { i--; show(); } }, '→ הקודם'),
        h('button.btn.primary', { onclick: () => { if (i < items.length - 1) { i++; show(); } else { stop(); onDone(3); } } }, i < items.length - 1 ? 'הבא ←' : 'סיימתי! ⭐')));
    trio(it.en, it.he);
  };
  show();
}

// ---------- story (dialog + questions + role play)
export function storyScreen(root, unit, { onDone, onExit }) {
  const s = unit.story, names = [...new Set(s.lines.map(l => l[0]))];
  let showHe = true, i = 0;
  const chat = h('div.chat');
  const foot = h('div.story-foot');
  root.append(h('div.topbar', {}, h('button.btn.round', { onclick: () => { stop(); onExit(); } }, '✕'),
    h('div.title', {}, h('span.en', { dir: 'ltr' }, s.title), ' · ', s.he),
    h('button.btn.round', { title: 'תרגום', onclick: () => { showHe = !showHe; chat.classList.toggle('no-he', !showHe); } }, 'עב')), chat, foot);
  const AV = ['🧒', '👧', '👦', '🧑'];
  const bubble = l => {
    const side = names.indexOf(l[0]) % 2 ? 'right' : 'left';
    const b = h('div.bubble.' + side, { onclick: () => say(l[1], 'en') },
      h('div.who', {}, AV[names.indexOf(l[0]) % AV.length] + ' ' + l[0]),
      h('div.say', { dir: 'ltr' }, l[1]), h('div.tr', {}, l[2]));
    chat.append(b); b.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };
  const next = () => {
    if (i < s.lines.length) { const l = s.lines[i++]; bubble(l); say(l[1], 'en'); foot.innerHTML = ''; foot.append(h('button.btn.primary.wide', { onclick: next }, i < s.lines.length ? 'הבא ←' : 'לשאלות ←')); return; }
    questions();
  };
  const questions = async () => {
    let right = 0;
    for (const [k, q] of s.questions.entries()) {
      const box = h('div.qbox'); foot.innerHTML = ''; foot.append(box);
      const r = await new Promise(res => {
        let done = false;
        box.append(h('div.ask', {}, `שאלה ${k + 1}/${s.questions.length}`),
          h('div.prompt-en.sent', { dir: 'ltr', onclick: () => say(q.q, 'en') }, '🔊 ' + q.q), h('div.sub-he', {}, q.he),
          h('div.options', {}, q.options.map((o, j) => { const b = h('button.opt', { onclick: () => {
            if (done) return; done = true;
            if (j === q.a) { b.classList.add('right'); sfx('good'); say(o, 'en'); setTimeout(() => res(true), 1100); }
            else { b.classList.add('wrong'); sfx('bad'); box.querySelectorAll('.opt')[q.a].classList.add('right'); setTimeout(() => res(false), 1800); }
          } }, en(o)); return b; })));
        say(q.q, 'en');
      });
      if (r) right++;
    }
    rolePlay(right);
  };
  const rolePlay = async right => {
    const me = names[1] || names[0], lines = s.lines.filter(l => l[0] === me).slice(0, 3);
    foot.innerHTML = '';
    foot.append(h('div.qbox', {}, h('div.ask', {}, `🎭 עכשיו אתה ${me}! תגיד את המשפטים שלו`),
      h('div.row', {}, h('button.btn.primary', { onclick: async () => {
        let said = 0;
        for (const l of lines) {
          const host = h('div'); foot.innerHTML = ''; foot.append(host);
          const r = await runChallenge(host, { kind: 'speak', item: { en: l[1], he: l[2], sent: true } });
          if (r.ok) said++;
        }
        end(right, said);
      } }, 'יאללה! 🎤'), h('button.btn.ghost', { onclick: () => end(right, 0) }, 'דלג'))));
  };
  const end = (right, said) => {
    const stars = Math.max(1, right) + (said >= 2 && right < 3 ? 1 : 0);
    onDone(Math.min(3, stars), right * 3 + said * 2);
  };
  next();
}

// ---------- boss battle
const BOSSES = { grass: ['🐲', 'Dragon Dino'], desert: ['🦂', 'King Scorpion'], snow: ['🐻‍❄️', 'Ice Bear'], cave: ['🦇', 'Bat Boss'], sky: ['🌩️', 'Storm Cloud'], castle: ['🧌', 'Big Troll'] };
export function bossScreen(root, unit, items, { onDone, onExit, hard = false }) {
  const [bem, bname] = BOSSES[unit.theme] || BOSSES.grass;
  const words = items.filter(x => !x.sent), sents = items.filter(x => x.sent);
  const rounds = shuffle([...sample(words, 4).map((it, k) => ({ it, kind: kindFor(it, 'boss', k) })),
    ...sample(sents.filter(s => s.en.split(' ').length <= 7), 3).map((it, k) => ({ it, kind: kindFor(it, 'boss', k, hard) })),
    ...sample(sents.filter(s => s.en.split(' ').length <= 5), 1).map(it => ({ it, kind: 'speak' }))]);
  const total = rounds.length, base = [...rounds];
  let hp = total, hearts = 3, r = 0, perfect = 0;
  const cv = h('canvas.boss-hero', { width: 120, height: 150 });
  const bossEl = h('div.boss', {}, bem);
  const hpBar = h('div.hp', {}, h('i'));
  const heartsEl = h('div.hearts');
  const panel = h('div.boss-panel');
  root.append(h('div.topbar', {}, h('button.btn.round', { onclick: () => { stop(); onExit(); } }, '✕'), h('div.title', {}, '👑 ', h('span.en', { dir: 'ltr' }, bname)), heartsEl),
    h('div.arena.theme-' + unit.theme, {}, h('div.fighter', {}, cv), h('div.vs', {}, 'VS'), h('div.fighter', {}, bossEl, hpBar)), panel);
  const look = st().look;
  const drawMe = (pose = 0) => { const c = cv.getContext('2d'); c.clearRect(0, 0, 120, 150); drawHero(c, 60, 140, { look, scale: 2, frame: pose, air: pose > 0 }); };
  const upd = () => { hpBar.firstChild.style.width = (hp / total * 100) + '%'; heartsEl.textContent = '❤️'.repeat(hearts) + '🤍'.repeat(3 - hearts); };
  const shot = async () => {
    const star = h('div.shot', {}, '⭐'); root.querySelector('.arena').append(star);
    drawMe(5); await wait(450); star.remove(); drawMe(0);
    bossEl.classList.add('hit'); sfx('hit'); await wait(450); bossEl.classList.remove('hit');
  };
  const attack = async () => {
    bossEl.classList.add('attack'); await wait(350); sfx('hurt');
    root.querySelector('.arena').classList.add('shake'); await wait(400);
    bossEl.classList.remove('attack'); root.querySelector('.arena').classList.remove('shake');
  };
  const play = async () => {
    upd(); drawMe();
    while (r < rounds.length) {
      const { it, kind } = rounds[r];
      const res = await runChallenge(panel, { kind, item: it, pool: items });
      if (res.ok) { perfect++; addXp(3); hp--; upd(); await shot(); r++; }
      else {
        await attack(); hearts--; upd();
        if (hearts <= 0) {
          panel.innerHTML = '';
          panel.append(h('div.chal', {}, h('div.big-emoji.huge', {}, '😵'), h('div.ask', {}, 'אופס! הבוס ניצח הפעם'), h('button.btn.primary', { onclick: () => { hearts = 3; hp = total; r = 0; perfect = 0; rounds.splice(0, rounds.length, ...base); play(); } }, 'עוד פעם! 💪')));
          return;
        }
        rounds.push(rounds[r]); r++;          // the same question comes back at the end of the battle
      }
    }
    bossEl.classList.add('dead'); sfx('win'); confetti();
    await wait(900);
    onDone(hearts, perfect * 3);
  };
  play();
}
