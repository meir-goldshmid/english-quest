// Challenge mode ("Rush") for the 12+ / 14+ tracks: timed questions, combo multiplier, points and a medal.
import { h, wait } from './ui.js';
import { sfx, stop } from './audio.js';
import { runChallenge } from './challenges.js';
import { grade } from './store.js';

export const MEDALS = [
  { min: 0.95, id: 'diamond', em: '💎', name: 'Diamond' },
  { min: 0.85, id: 'gold', em: '🥇', name: 'Gold' },
  { min: 0.7, id: 'silver', em: '🥈', name: 'Silver' },
  { min: 0, id: 'bronze', em: '🥉', name: 'Bronze' },
];
export const medalFor = ratio => MEDALS.find(m => ratio >= m.min);
// seconds allowed per kind (0 = no timer, e.g. speaking)
const TIME = { gap: 20, 'en-he': 12, 'he-en': 12, 'read-sent': 20, 'listen-sent': 20, build: 35, transform: 45, type: 30, spell: 25, speak: 0, read: 0 };

// challenges: [{ kind, item, pool? }]. opts: { title, timed = true, boss: { em, name } }
export function runRush(host, challenges, { title = 'Rush', timed = true, boss = null, onExit } = {}) {
  return new Promise(resolve => {
    let score = 0, combo = 0, best = 0, right = 0, k = 0, hp = challenges.length;
    const total = challenges.length;
    const scoreEl = h('b.r-score', {}, '0'), comboEl = h('span.r-combo'), qEl = h('span.r-q');
    const bar = h('div.r-timer', {}, h('i'));
    const bossBar = boss ? h('div.r-boss', {}, h('span.r-boss-em', {}, boss.em), h('div.r-hp', {}, h('i')), h('small', {}, boss.name)) : null;
    const stage = h('div.r-stage');
    host.innerHTML = '';
    host.append(h('div.rush', {},
      h('div.r-top', {}, h('button.btn.round.sm.exit', { onclick: () => { stop(); clearInterval(tick); onExit?.(); } }, '✕'),
        h('div.r-title', {}, title), qEl, h('div.r-pts', {}, scoreEl, h('small', {}, 'pts')), comboEl),
      bossBar, timed ? bar : null, stage));
    const showCombo = () => {
      const mult = Math.min(4, 1 + Math.floor(combo / 2));
      comboEl.textContent = combo >= 2 ? `🔥 x${mult}` : '';
      comboEl.classList.toggle('hot', combo >= 2); comboEl.classList.remove('bump'); void comboEl.offsetWidth; comboEl.classList.add('bump');
      return mult;
    };
    let tick = null;
    const next = async () => {
      if (k >= challenges.length) return end();
      const ch = challenges[k];
      qEl.textContent = `${Math.min(k + 1, total)}/${total}`;
      stage.innerHTML = '';
      const card = h('div.r-card'); stage.append(card);
      const limit = timed ? (TIME[ch.kind] ?? 20) : 0;
      const t0 = performance.now();
      const timer = new Promise(res => {
        clearInterval(tick);
        if (!limit) { bar.classList?.add('off'); return; }
        bar.classList.remove('off', 'low');
        tick = setInterval(() => {
          const left = 1 - (performance.now() - t0) / (limit * 1000);
          bar.firstChild.style.width = Math.max(0, left * 100) + '%';
          if (left < 0.3) bar.classList.add('low');
          if (left <= 0) { clearInterval(tick); res({ ok: false, timeout: true }); }
        }, 100);
      });
      let answeredAt = 0;
      const r = await Promise.race([runChallenge(card, { ...ch, onAnswer: () => { answeredAt = performance.now(); clearInterval(tick); } }), timer]);
      clearInterval(tick);
      if (r.timeout) {                                       // time's up: show the answer briefly
        grade(ch.item.en, false); stop(); sfx('bad');
        card.innerHTML = '';
        card.append(h('div.r-timeout', {}, h('div.big-emoji', {}, '⏰'), h('b', {}, 'נגמר הזמן'), h('div.en', { dir: 'ltr' }, ch.item.en), ch.item.why ? h('small', {}, ch.item.why) : null));
        combo = 0; showCombo(); await wait(2200);
      } else if (r.ok) {
        combo++; best = Math.max(best, combo); right++;
        const mult = showCombo(), secs = ((answeredAt || performance.now()) - t0) / 1000;
        const bonus = limit ? Math.max(0, Math.round((1 - secs / limit) * 50)) : 25;
        const pts = 100 * mult + bonus; score += pts; scoreEl.textContent = score;
        const pop = h('div.r-pop', {}, `+${pts}`); stage.append(pop); setTimeout(() => pop.remove(), 900);
        if (boss) { hp--; bossBar.querySelector('.r-hp i').style.width = (hp / total * 100) + '%'; bossBar.classList.remove('hit'); void bossBar.offsetWidth; bossBar.classList.add('hit'); sfx('hit'); }
      } else {
        combo = 0; showCombo();
        if (boss) { challenges.push(ch); }                 // a boss needs every question answered correctly
      }
      if (boss && hp <= 0) return end();
      k++;
      if (boss && k > total * 2 + 2) return end();          // safety stop for very long boss fights
      next();
    };
    const end = () => {
      clearInterval(tick); stop();
      const ratio = right / Math.max(1, boss ? Math.max(total, k) : total);
      const medal = medalFor(ratio);
      sfx(ratio >= 0.7 ? 'win' : 'good');
      resolve({ score, right, total, bestCombo: best, medal, ratio, beaten: boss ? hp <= 0 : true });
    };
    next();
  });
}
