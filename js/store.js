// Progress, settings and spaced repetition. One JSON blob in localStorage (easy to sync to a cloud DB later).
const KEY = 'english-quest-v1';
export const STAGES = [
  { id: 'learn', em: '📖', name: 'לומדים מילים', short: 'מילים' },
  { id: 'run1', em: '🏃', name: 'שלב ריצה: מילים', short: 'ריצה 1' },
  { id: 'sent', em: '💬', name: 'לומדים משפטים', short: 'משפטים' },
  { id: 'run2', em: '🗣️', name: 'שלב ריצה: מדברים', short: 'ריצה 2' },
  { id: 'story', em: '📜', name: 'סיפור', short: 'סיפור' },
  { id: 'boss', em: '👑', name: 'קרב בוס', short: 'בוס' },
];

const DEF = () => ({
  v: 1, name: '', coins: 0,
  look: { hoodie: '#ff7a1a', cap: '#2463eb', hat: 'cap', extra: '' },
  owned: ['hoodie:#ff7a1a', 'cap:#2463eb', 'hat:cap'],
  stages: {},       // 'unitId:stageIdx' -> { stars, at }
  items: {},        // english text -> { b: box 0..5, due: ms, r: right, w: wrong }
  days: {},         // 'YYYY-MM-DD' -> { xp, sec }
  stats: { spoken: 0, typed: 0, answers: 0, right: 0 },
  settings: { order: 'ehe', slow: false, music: true, sfx: true, unlockAll: false, autoHe: true },
});

let S;
export function load() {
  try { S = Object.assign(DEF(), JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) { S = DEF(); }
  S.settings = Object.assign(DEF().settings, S.settings);
  S.stats = Object.assign(DEF().stats, S.stats);
  return S;
}
export const st = () => S || load();
export function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* private mode – progress lives for this visit */ } }

export const today = (d = new Date()) => new Date(d.getTime() - d.getTimezoneOffset() * 6e4).toISOString().slice(0, 10);
export function addXp(n) { const d = S.days[today()] ||= { xp: 0, sec: 0 }; d.xp += n; save(); }
export function addTime(sec) { const d = S.days[today()] ||= { xp: 0, sec: 0 }; d.sec += sec; save(); }
export function streak() {
  let n = 0; const d = new Date();
  if (!S.days[today(d)]) d.setDate(d.getDate() - 1);          // today not played yet – streak still alive from yesterday
  while (S.days[today(d)]) { n++; d.setDate(d.getDate() - 1); }
  return n;
}
export const DAILY_GOAL = 60;

// ---- stage progress
export const stageKey = (u, i) => `${u}:${i}`;
export const stageStars = (u, i) => S.stages[stageKey(u, i)]?.stars || 0;
export function finishStage(u, i, stars) {
  const k = stageKey(u, i), old = S.stages[k]?.stars || 0;
  S.stages[k] = { stars: Math.max(old, stars), at: Date.now() };
  save();
  return stars > old;
}
export function unitDone(u) { return stageStars(u.id, STAGES.length - 1) > 0; }
export function unitUnlocked(units, idx) { return S.settings.unlockAll || idx === 0 || unitDone(units[idx - 1]); }
export function stageUnlocked(units, idx, si) {
  return unitUnlocked(units, idx) && (S.settings.unlockAll || si === 0 || stageStars(units[idx].id, si - 1) > 0);
}
export function currentUnit(units) {
  let i = 0; while (i < units.length - 1 && unitDone(units[i])) i++; return i;
}

// ---- spaced repetition (Leitner): box 0..5, interval in days
const GAP = [0, 1, 2, 4, 8, 16];
export function grade(text, ok) {
  const it = S.items[text] ||= { b: 0, due: 0, r: 0, w: 0 };
  if (ok) { it.r++; it.b = Math.min(5, it.b + 1); } else { it.w++; it.b = 0; }
  it.due = Date.now() + GAP[it.b] * 864e5 - 36e5;      // an hour of slack so "tomorrow" means tomorrow morning too
  S.stats.answers++; if (ok) S.stats.right++;
  save();
}
export const seen = text => !!S.items[text];
export const box = text => S.items[text]?.b ?? -1;
export const isDue = text => { const it = S.items[text]; return !!it && it.due <= Date.now(); };
export const mastered = () => Object.values(S.items).filter(i => i.b >= 3).length;

export function reset() { S = DEF(); save(); }
export function exportJson() { return JSON.stringify(S); }
export function importJson(txt) { const o = JSON.parse(txt); if (!o || o.v !== 1) throw new Error('bad file'); S = Object.assign(DEF(), o); save(); }
