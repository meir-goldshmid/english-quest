// Small DOM helpers.
export function h(tag, attrs = {}, ...kids) {
  const [t, ...cls] = tag.split('.');
  const e = document.createElement(t || 'div');
  if (cls.length) e.className = cls.join(' ');
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v == null || v === false) continue;
    if (k.startsWith('on')) e.addEventListener(k.slice(2), v);
    else if (k === 'style' && typeof v === 'object') for (const [sk, sv] of Object.entries(v)) { if (sk.startsWith('--')) e.style.setProperty(sk, sv); else e.style[sk] = sv; }
    else if (k === 'html') e.innerHTML = v;
    else e.setAttribute(k, v === true ? '' : v);
  }
  for (const k of kids.flat(Infinity)) if (k != null && k !== false) e.append(k.nodeType ? k : document.createTextNode(String(k)));
  return e;
}
export const $ = (s, r = document) => r.querySelector(s);
export const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
export const sample = (a, n) => shuffle(a).slice(0, n);
export const wait = ms => new Promise(r => setTimeout(r, ms));
export const en = (text, tag = 'span') => h(tag + '.en', { dir: 'ltr', lang: 'en' }, text);

export function toast(msg, ms = 2200) {
  const t = h('div.toast', {}, msg); document.body.append(t);
  setTimeout(() => t.classList.add('out'), ms); setTimeout(() => t.remove(), ms + 400);
}
export function confetti(n = 60) {
  const box = h('div.confetti'); document.body.append(box);
  const colors = ['#f472b6', '#facc15', '#38bdf8', '#4ade80', '#a78bfa', '#fb923c'];
  for (let i = 0; i < n; i++) box.append(h('i', { style: { left: Math.random() * 100 + '%', background: colors[i % colors.length], animationDelay: Math.random() * 0.6 + 's', animationDuration: 1.6 + Math.random() * 1.4 + 's', transform: `rotate(${Math.random() * 360}deg)` } }));
  setTimeout(() => box.remove(), 3600);
}

// A friendly in-app dialog instead of the browser's confirm(). Resolves true / false.
// stay: the safe choice (no) is the big highlighted button, e.g. "keep playing"
export function dialog({ icon = '🤔', title, text = '', yes = 'כן', no = 'לא', danger = false, stay = false } = {}) {
  return new Promise(res => {
    const close = v => { bg.classList.add('out'); setTimeout(() => bg.remove(), 200); document.removeEventListener('keydown', onKey); res(v); };
    const onKey = e => { if (e.key === 'Escape') close(false); if (e.key === 'Enter') close(true); };
    const bg = h('div.modal-bg.dlg-bg', { onclick: e => { if (e.target === bg) close(false); } },
      h('div.dlg', {},
        h('div.dlg-icon', {}, icon),
        h('h2', {}, title), text ? h('p', {}, text) : null,
        h('div.dlg-btns', {},
          stay ? h('button.btn.big.primary.stay', { onclick: () => close(false) }, no) : null,
          h('button.btn.' + (stay ? 'soft' : 'big.' + (danger ? 'danger' : 'primary')), { onclick: () => close(true) }, yes),
          stay ? null : h('button.btn.big.soft', { onclick: () => close(false) }, no))));
    document.body.append(bg); document.addEventListener('keydown', onKey);
    (bg.querySelector('.stay') || bg.querySelector('.btn.soft')).focus();
  });
}
