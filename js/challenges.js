// Challenge cards: listening, reading, spelling, typing, speaking and sentence building.
// runChallenge(host, ch) renders into host and resolves { ok } (ok = right on the first try).
import { h, en, shuffle, sample, wait } from './ui.js';
import { say, trio, sfx, stop } from './audio.js';
import { grade, st, save } from './store.js';
import { canRecognize, listenOnce, judge } from './speech.js';

const PRAISE = ['Great job!', 'Awesome!', 'Super!', 'Well done!', 'Excellent!', 'You got it!', 'Fantastic!'];
const praise = () => PRAISE[Math.floor(Math.random() * PRAISE.length)];
const tokens = s => s.replace(/[.,!?]/g, '').split(/\s+/).filter(Boolean);
const clean = s => s.toLowerCase().replace(/[’`]/g, "'").replace(/[^a-z' ]/g, ' ').replace(/\s+/g, ' ').trim();

export const WORD_KINDS = ['listen-pic', 'pic-word', 'he-en', 'en-he', 'spell'];
export const SENT_KINDS = ['read-sent', 'listen-sent', 'build'];

function distract(item, pool, n, key) {
  const seen = new Set([item.en.toLowerCase(), item.he, item.em].filter(Boolean));
  const out = [];
  for (const p of shuffle(pool)) {
    // skip look-alikes (mom/mother share Hebrew and picture) so there is exactly one right answer
    if (p.sent === item.sent && ![p.en.toLowerCase(), p.he, p.em].some(v => v && seen.has(v))) { [p.en.toLowerCase(), p.he, p.em].forEach(v => v && seen.add(v)); out.push(p); }
    if (out.length >= n) break;
  }
  return shuffle([item, ...out]);
}
function soundBtns(item) {
  return h('div.sound-row', {},
    h('button.btn.round', { title: 'הקשב', onclick: () => say(item.en, 'en') }, '🔊'),
    h('button.btn.round', { title: 'לאט', onclick: () => say(item.en, 'en', { rate: 0.65 }) }, '🐢'));
}

export function runChallenge(host, ch) {
  return new Promise(resolve => {
    const { kind, item, pool = [] } = ch;
    host.innerHTML = '';
    const card = h('div.chal', {}); host.append(card);
    let done = false;
    const finish = async (ok, { noGrade, silent } = {}) => {
      if (done) return; done = true;
      if (!noGrade) grade(item.en, ok);
      if (ok) {
        sfx('good');
        card.append(h('div.praise', { dir: 'ltr' }, '⭐ ' + praise()));
        if (!silent) await say(item.en, 'en'); else await wait(500);
        await wait(500);
        resolve({ ok: true });
      } else {
        const fb = h('div.feedback', {},
          h('div.fb-title', {}, 'התשובה הנכונה:'),
          h('div.fb-answer', {}, item.em && !item.sent ? h('span.big-emoji.sm', {}, item.em) : null, en(item.en, 'b'), h('span.he', {}, ' – ' + item.he)),
          h('button.btn.primary', { onclick: () => { stop(); resolve({ ok: false }); } }, 'המשך ←'));
        card.append(fb);
        trio(item.en, item.he);
      }
    };
    const choose = (opts, label, isRight, onPick) => h('div.options' + (opts.length > 3 ? '.grid' : ''), {}, opts.map(o => {
      const b = h('button.opt', { onclick: () => {
        if (done || card.classList.contains('locked')) return;
        card.classList.add('locked');
        if (isRight(o)) { b.classList.add('right'); finish(true, { silent: onPick?.(o) }); }
        else { b.classList.add('wrong'); sfx('bad'); card.querySelectorAll('.opt').forEach(x => { if (x._o && isRight(x._o)) x.classList.add('right'); }); finish(false); }
      } }, label(o));
      b._o = o; return b;
    }));
    const allEmoji = opts => opts.every(o => o.em);

    if (kind === 'listen-pic') {
      const opts = distract(item, pool, 3, 'en');
      card.append(h('div.ask', {}, '👂 הקשב ובחר את התשובה'), soundBtns(item),
        choose(opts, o => allEmoji(opts) ? h('span.big-emoji', {}, o.em) : h('span.he', {}, o.he), o => o.en === item.en));
      say(item.en, 'en');
    } else if (kind === 'pic-word') {
      const opts = distract(item, pool, 3, 'en');
      card.append(h('div.ask', {}, '🤔 איך אומרים באנגלית?'),
        item.em ? h('div.big-emoji.huge', {}, item.em) : h('div.prompt-he', {}, item.he),
        choose(opts, o => en(o.en), o => o.en === item.en));
    } else if (kind === 'he-en') {
      const opts = distract(item, pool, 3, 'en');
      card.append(h('div.ask', {}, '🔤 בחר את המילה באנגלית'),
        h('div.prompt-he', { onclick: () => say(item.he, 'he') }, item.em ? item.em + ' ' : '', item.he),
        choose(opts, o => en(o.en), o => o.en === item.en));
      say(item.he, 'he');
    } else if (kind === 'en-he') {
      const opts = distract(item, pool, 3, 'he');
      card.append(h('div.ask', {}, '📖 קרא – מה זה אומר?'), h('div.prompt-en', { dir: 'ltr' }, item.en),
        choose(opts, o => h('span.he', {}, o.he), o => o.he === item.he));
    } else if (kind === 'read-sent') {
      const opts = distract(item, pool, 2, 'he');
      card.append(h('div.ask', {}, '📖 קרא את המשפט – מה הוא אומר?'), h('div.prompt-en.sent', { dir: 'ltr' }, item.en),
        choose(opts, o => h('span.he', {}, o.he), o => o.he === item.he));
    } else if (kind === 'listen-sent') {
      const opts = distract(item, pool, 2, 'en');
      card.append(h('div.ask', {}, '👂 הקשב – איזה משפט שמעת?'), soundBtns(item),
        choose(opts, o => en(o.en), o => o.en === item.en, () => true));
      say(item.en, 'en');
    } else if (kind === 'spell' || kind === 'build') {
      const isSent = kind === 'build';
      const target = isSent ? tokens(item.en) : [...item.en.replace(/[^a-z]/gi, '').toLowerCase()];
      let extra = [];
      if (isSent) extra = sample(pool.filter(p => !p.sent).map(p => p.en).filter(w => !/\s/.test(w) && !target.map(x => x.toLowerCase()).includes(w.toLowerCase())), target.length > 5 ? 1 : 2);
      else extra = sample('aeioustnrlmbdgkhp'.split('').filter(c => !target.includes(c)), target.length > 6 ? 1 : 2);
      const tiles = shuffle([...target, ...extra]).map((v, i) => ({ v, i, used: false }));
      const picked = [];
      let tries = 0;
      const slots = h('div.slots' + (isSent ? '.sent' : ''), { dir: 'ltr' });
      const bank = h('div.bank' + (isSent ? '.sent' : ''), { dir: 'ltr' });
      const render = () => {
        slots.innerHTML = ''; bank.innerHTML = '';
        if (isSent) picked.forEach((t, k) => slots.append(h('button.tile.in', { onclick: () => { if (done) return; picked.splice(k, 1); t.used = false; render(); } }, t.v)));
        else target.forEach((_, k) => { const t = picked[k]; slots.append(h('button.slot' + (t ? '.full' : ''), { onclick: () => { if (!t || done) return; picked.splice(k, 1); t.used = false; render(); } }, t ? t.v : '')); });
        if (isSent && !picked.length) slots.append(h('span.slot-hint', {}, 'לחץ על המילים לפי הסדר'));
        tiles.forEach(t => bank.append(h('button.tile' + (t.used ? '.used' : ''), { onclick: () => {
          if (t.used || done || picked.length >= target.length) return;
          t.used = true; picked.push(t); sfx('pop'); render();
          if (picked.length === target.length) check();
        } }, t.v)));
      };
      const check = async () => {
        const got = picked.map(t => t.v), ok = got.every((v, k) => v.toLowerCase() === target[k].toLowerCase());
        if (ok) { slots.classList.add('good'); if (!isSent) st().stats.typed++; return finish(tries === 0); }
        tries++; sfx('bad'); slots.classList.add('shake');
        await wait(700); slots.classList.remove('shake');
        // keep the correct prefix, return the rest
        let k = 0; while (k < got.length && got[k].toLowerCase() === target[k].toLowerCase()) k++;
        picked.splice(k).forEach(t => { t.used = false; });
        if (tries >= 3) { finish(false); return; }
        render();
      };
      card.append(h('div.ask', {}, isSent ? '🧩 בנה את המשפט באנגלית' : '✏️ כתוב את המילה באנגלית'),
        isSent ? h('div.prompt-he', {}, item.he) : h('div.prompt-row', {}, item.em ? h('span.big-emoji', {}, item.em) : null, h('span.prompt-he', {}, item.he)),
        soundBtns(item), slots, bank,
        h('button.btn.ghost', { onclick: () => { if (done) return; const k = picked.findIndex((t, i) => t.v.toLowerCase() !== target[i].toLowerCase()); if (k >= 0 || picked.length < target.length) { tries = Math.max(tries, 1); const at = k >= 0 ? k : picked.length; picked.splice(at).forEach(t => t.used = false); const nt = tiles.find(t => !t.used && t.v.toLowerCase() === target[at].toLowerCase()); if (nt) { nt.used = true; picked.push(nt); } render(); if (picked.length === target.length) check(); } } }, '💡 רמז'));
      render();
      say(isSent ? item.en : item.en, 'en');
    } else if (kind === 'type') {
      let tries = 0;
      const inp = h('input.type-in', { dir: 'ltr', autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false', autocorrect: 'off', placeholder: '...' });
      const msg = h('div.type-msg');
      const submit = async () => {
        if (done) return;
        const ok = clean(inp.value) === clean(item.en);
        if (ok) { st().stats.typed++; save(); return finish(tries === 0); }
        tries++; sfx('bad'); inp.classList.add('shake'); setTimeout(() => inp.classList.remove('shake'), 500);
        const t = clean(item.en), v = clean(inp.value); let k = 0; while (k < v.length && v[k] === t[k]) k++;
        msg.textContent = tries >= 3 ? '' : `כמעט! ${k ? 'ההתחלה נכונה: ' : ''}`;
        if (k) msg.append(en(item.en.slice(0, k), 'b'));
        if (tries >= 3) finish(false);
      };
      card.append(h('div.ask', {}, '⌨️ הקלד באנגלית'),
        item.sent ? h('div.prompt-he', {}, item.he) : h('div.prompt-row', {}, item.em ? h('span.big-emoji', {}, item.em) : null, h('span.prompt-he', {}, item.he)),
        soundBtns(item),
        h('form.type-form', { onsubmit: e => { e.preventDefault(); submit(); } }, inp, h('button.btn.primary', { type: 'submit' }, 'בדיקה ✓')),
        msg,
        h('button.btn.ghost', { onclick: () => { if (done) return; tries = Math.max(tries, 1); const t = item.en; let v = inp.value; let k = 0; while (k < v.length && v[k].toLowerCase() === t[k]?.toLowerCase()) k++; inp.value = t.slice(0, k + 1); inp.focus(); } }, '💡 עוד אות'));
      say(item.en, 'en');
      setTimeout(() => inp.focus(), 100);
    } else if (kind === 'speak') {
      let tries = 0;
      const status = h('div.speak-status', {}, canRecognize() ? 'לחץ על המיקרופון ואמור באנגלית' : 'אמור בקול באנגלית, ואז לחץ "אמרתי!"');
      const mic = h('button.btn.mic', { onclick: async () => {
        if (done || mic.classList.contains('on')) return;
        stop(); mic.classList.add('on'); status.textContent = '🎙️ מקשיב... דבר עכשיו';
        let alts;
        try { alts = await listenOnce(6000); } catch (e) {
          mic.classList.remove('on');
          status.textContent = e === 'not-allowed' ? 'צריך לאשר מיקרופון בדפדפן. אפשר גם לומר בקול וללחוץ "אמרתי!"' : 'הזיהוי לא זמין כרגע. אמור בקול ולחץ "אמרתי!"';
          selfBtn.hidden = false; return;
        }
        mic.classList.remove('on');
        const r = judge(alts, item.en);
        if (r.ok) { st().stats.spoken++; save(); status.textContent = ''; status.append('שמעתי: ', en(r.heard, 'b'), ' ✔'); return finish(tries === 0); }
        tries++; sfx('bad');
        status.textContent = alts.length ? 'שמעתי: ' : 'לא שמעתי טוב. ';
        if (alts.length) status.append(en(r.heard || alts[0], 'b'), ' – בוא ננסה שוב!'); else status.append('דבר חזק וקרוב לטלפון 🙂');
        if (tries >= 2) skipBtn.hidden = false;
        say(item.en, 'en');
      } }, '🎤');
      const selfBtn = h('button.btn.primary', { hidden: canRecognize() ? true : null, onclick: () => { st().stats.spoken++; save(); grade(item.en, true); finish(true, { noGrade: true }); } }, 'אמרתי! ✓');
      const skipBtn = h('button.btn.ghost', { hidden: true, onclick: () => finish(false) }, 'דלג ←');
      card.append(h('div.ask', {}, '🗣️ תגיד באנגלית!'),
        item.em && !item.sent ? h('div.big-emoji.huge', {}, item.em) : null,
        h('div.prompt-en' + (item.sent ? '.sent' : ''), { dir: 'ltr' }, item.en), h('div.sub-he', {}, item.he),
        soundBtns(item), h('div.mic-row', {}, mic), status, h('div.row', {}, selfBtn, skipBtn));
      say(item.en, 'en');
    }
  });
}

// Pick a fitting kind for an item (word or sentence) and a level of the game.
export function kindFor(item, mode, i, hard = false) {
  if (mode === 'speak') return 'speak';
  // typing whole sentences only in later worlds; earlier bosses build sentences from word tiles
  if (item.sent) return mode === 'boss' ? (hard && i % 2 ? 'type' : 'build') : SENT_KINDS[i % SENT_KINDS.length];
  const okSpell = /^[a-z]{2,8}$/.test(item.en);
  if (mode === 'boss') return okSpell ? (i % 2 ? 'type' : 'spell') : 'pic-word';
  const ks = okSpell ? WORD_KINDS : WORD_KINDS.filter(k => k !== 'spell');
  return ks[i % ks.length];
}
