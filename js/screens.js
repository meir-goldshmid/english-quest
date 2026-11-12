// Non-platformer stages: word/sentence cards, story, boss battle.
import { h, en } from './ui.js';
import { say, trio, sfx, stop } from './audio.js';
import { runChallenge } from './challenges.js';
import { st, save } from './store.js';
import { canRecognize, listenOnce, judge } from './speech.js';

// ---------- learn cards (words or sentences)
export function learnCards(root, items, { title, onDone, onExit, rule }) {
  let i = 0;
  // the reading rule (phonics) is shown as a last card
  const showRule = () => {
    count.textContent = '';
    body.innerHTML = '';
    body.append(h('div.progress', {}, h('i', { style: { width: '100%' } })),
      h('div.card.rule', {}, h('div.ask', {}, '🔎 כלל קריאה'), h('div.card-en', { dir: 'ltr' }, rule.rule), h('div.card-he', {}, rule.he),
        h('div.rule-words', { dir: 'ltr' }, rule.words.map(w => h('button.tile', { onclick: () => say(w, 'en') }, w)))),
      h('p.note', {}, 'נסה לקרוא כל מילה לבד, ורק אחר כך לחץ עליה כדי לשמוע.'),
      h('div.nav-row', {}, h('button.btn', { onclick: () => { i = items.length - 1; show(); } }, '→ הקודם'),
        h('button.btn.primary', { onclick: () => { stop(); onDone(3); } }, 'סיימתי! ⭐')));
  };
  const body = h('div.learn');
  root.append(h('div.topbar', {}, h('button.btn.round.exit', { onclick: () => { stop(); onExit(); } }, '✕'), h('div.title', {}, title), h('div.count')), body);
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
        h('button.btn.primary', { onclick: () => { if (i < items.length - 1) { i++; show(); } else if (rule) { stop(); showRule(); } else { stop(); onDone(3); } } }, i < items.length - 1 || rule ? 'הבא ←' : 'סיימתי! ⭐')));
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
  root.append(h('div.topbar', {}, h('button.btn.round.exit', { onclick: () => { stop(); onExit(); } }, '✕'),
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
    const speakAll = async (list, kind) => {
      let said = 0;
      for (const l of list) {
        const host = h('div'); foot.innerHTML = ''; foot.append(host);
        const r = await runChallenge(host, { kind, item: { en: l[1], he: l[2], sent: true } });
        if (r.ok) said++;
      }
      end(right, Math.round(said / list.length * 3));
    };
    foot.append(h('div.qbox', {}, h('div.ask', {}, 'ועכשיו – אתה מדבר!'),
      h('div.row', {},
        h('button.btn.primary', { onclick: () => speakAll(lines, 'speak') }, `🎭 אני ${me}`),
        h('button.btn.review', { onclick: () => speakAll(s.lines.slice(0, 8), 'read') }, '📖 קורא את הסיפור בקול'),
        h('button.btn.ghost', { onclick: () => end(right, 0) }, 'דלג'))));
  };
  const end = (right, said) => {
    const stars = Math.max(1, right) + (said >= 2 && right < 3 ? 1 : 0);
    onDone(Math.min(3, stars), right * 3 + said * 2);
  };
  next();
}

// ---------- grammar tracks: rule card, unseen reading, test
// an option like "no punctuation" fills the blank with nothing
export const fillGap = (g, o = g.options[g.a]) => g.s.replace('___', /^no punctuation$/i.test(o) ? '' : o);
export const gapItem = g => ({ en: fillGap(g), he: g.he || '', sent: true, gap: g, why: g.why });
export const trItem = t => ({ en: t.a, he: t.he || '', sent: true, tr: t });

export function ruleScreen(root, unit, { onDone, onExit }) {
  const g = unit.grammar;
  const body = h('div.learn');
  root.append(h('div.topbar', {}, h('button.btn.round.exit', { onclick: () => { stop(); onExit(); } }, '✕'), h('div.title', {}, '📘 ', h('span.en', { dir: 'ltr' }, unit.title))), body);
  body.append(
    h('div.card.rule', {},
      h('div.ask', {}, `כיתה ${unit.grade} · ${unit.level}`),
      h('div.card-en.rule-title', { dir: 'ltr' }, g.rule),
      h('div.rule-he', {}, g.he)),
    h('div.examples', {}, g.examples.map(([e, hh]) => h('button.example', { onclick: () => trio(e, hh) }, h('span.en', { dir: 'ltr' }, '🔊 ' + e), h('small', {}, hh)))),
    h('button.btn.primary.wide', { onclick: quick }, 'בוא נבדוק שהבנתי ←'));
  async function quick() {
    stop();
    const qs = unit.gaps.slice(0, 3).map(gapItem);
    let right = 0;
    for (const [k, it] of qs.entries()) {
      body.innerHTML = '';
      body.append(h('div.progress', {}, h('i', { style: { width: (k / qs.length * 100) + '%' } })));
      const host = h('div'); body.append(host);
      const r = await runChallenge(host, { kind: 'gap', item: it });
      if (r.ok) right++;
    }
    onDone(right === 3 ? 3 : right === 2 ? 2 : 1, right * 3);
  }
}

export function readingScreen(root, unit, { onDone, onExit }) {
  const R = unit.reading;
  const gloss = new Map(unit.words.map(([e, hh]) => [e.toLowerCase(), hh]));
  const tip = h('div.gloss-tip.hidden');
  // match the unit's words also when inflected (discoveries → discovery, noticed → notice, saving → save)
  const find = w => [w, w.replace(/ies$/, 'y'), w.replace(/es$/, ''), w.replace(/s$/, ''), w.replace(/ied$/, 'y'), w.replace(/ed$/, ''), w.replace(/d$/, ''), w.replace(/ing$/, ''), w.replace(/ing$/, 'e'), w.replace(/ly$/, '')].find(k => gloss.has(k));
  const words = R.text.split(/(\s+)/).map(tok => {
    const key = find(tok.toLowerCase().replace(/[^a-z'-]/g, ''));
    return key ? h('button.gloss', { onclick: () => { tip.textContent = `${key} = ${gloss.get(key)}`; tip.classList.remove('hidden'); say(key, 'en'); } }, tok) : tok;
  });
  const foot = h('div.story-foot');
  root.append(h('div.topbar', {}, h('button.btn.round.exit', { onclick: () => { stop(); onExit(); } }, '✕'), h('div.title', {}, '📰 ', h('span.en', { dir: 'ltr' }, R.title), ' · ', R.he)),
    h('div.paper', { dir: 'ltr' }, h('h3', {}, R.title), h('p', {}, words)), tip,
    h('div.sound-row', {}, h('button.btn', { onclick: () => say(R.text, 'en') }, '🔊 הקרא לי'), h('button.btn', { onclick: () => say(R.text, 'en', { rate: 0.8 }) }, '🐢 לאט')),
    h('p.note', {}, 'קרא לבד קודם. מילים מסומנות – לחץ לתרגום.'), foot);
  foot.append(h('button.btn.primary.wide', { onclick: questions }, 'לשאלות ←'));
  async function questions() {
    stop(); let right = 0;
    for (const [k, q] of R.questions.entries()) {
      const box = h('div.qbox'); foot.innerHTML = ''; foot.append(box);
      box.scrollIntoView({ behavior: 'smooth', block: 'end' });
      const ok = await new Promise(res => {
        let done = false;
        box.append(h('div.ask', {}, `שאלה ${k + 1}/${R.questions.length}`),
          h('div.prompt-en.sent', { dir: 'ltr' }, q.q), h('div.sub-he', {}, q.he),
          h('div.options', {}, q.options.map((o, j) => { const b = h('button.opt', { dir: 'ltr', onclick: () => {
            if (done) return; done = true;
            if (j === q.a) { b.classList.add('right'); sfx('good'); setTimeout(() => res(true), 900); }
            else { b.classList.add('wrong'); sfx('bad'); box.querySelectorAll('.opt')[q.a].classList.add('right'); setTimeout(() => res(false), 1900); }
          } }, o); return b; })));
      });
      if (ok) right++;
    }
    const n = R.questions.length;
    onDone(right >= n ? 3 : right >= n - 1 ? 2 : 1, right * 3);
  }
}

export const gradeWord = sc => sc >= 95 ? 'מצוין' : sc >= 85 ? 'טוב מאוד' : sc >= 75 ? 'טוב' : sc >= 65 ? 'כמעט טוב' : sc >= 55 ? 'מספיק' : 'עוד לא – כדאי לחזור על הכלל';
export function testScreen(root, unit, pool, { onDone, onExit, pick }) {
  const qs = [
    ...pick(unit.gaps.slice(3), 6).map(g => ({ kind: 'gap', item: gapItem(g) })),
    ...pick(unit.transforms, 3).map(t => ({ kind: 'transform', item: trItem(t) })),
    ...pick(unit.words, 3).map(([e, hh, em], k) => ({ kind: k % 2 ? 'he-en' : 'en-he', item: { en: e, he: hh, em, sent: false } })),
  ];
  const body = h('div.learn');
  root.append(h('div.topbar', {}, h('button.btn.round.exit', { onclick: () => { stop(); onExit(); } }, '✕'), h('div.title', {}, '📝 מבחן · ', h('span.en', { dir: 'ltr' }, unit.title)), h('div.count')), body);
  const count = root.querySelector('.count');
  (async () => {
    const wrong = []; let right = 0;
    for (const [k, q] of qs.entries()) {
      count.textContent = `${k + 1}/${qs.length}`;
      body.innerHTML = '';
      body.append(h('div.progress', {}, h('i', { style: { width: (k / qs.length * 100) + '%' } })));
      const host = h('div'); body.append(host);
      const r = await runChallenge(host, { ...q, pool });
      if (r.ok) right++; else wrong.push(q.item);
    }
    const score = Math.round(right / qs.length * 100);
    const stars = score >= 90 ? 3 : score >= 75 ? 2 : score >= 55 ? 1 : 0;
    body.innerHTML = '';
    body.append(h('div.card.test-result', {},
      h('div.score' + (stars ? '' : '.low'), {}, score),
      h('div.ask', {}, gradeWord(score)),
      h('p.note', {}, stars ? 'עברת את המבחן! הבוס מחכה 👑' : 'צריך 55 לפחות כדי לעבור. עבור שוב על הכלל ונסה שוב 💪')),
      wrong.length ? h('div.qbox', {}, h('div.ask', {}, 'לתיקון:'), wrong.map(it => h('div.fix-row', {}, h('b', { dir: 'ltr' }, it.en), h('small', {}, it.why || it.he)))) : null,
      h('button.btn.primary.wide', { onclick: () => onDone(stars, right * 3, score) }, 'המשך ←'));
    sfx(stars ? 'win' : 'bad');
  })();
}
