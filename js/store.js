// Players, progress, settings and spaced repetition. Each player is one JSON blob in localStorage.
const BASE = 'english-quest-v1', PKEY = 'english-quest-profiles';

// Stages per track. Kids: words, run, sentences, speaking run, story, boss.
// Grammar tracks (12+ / 14+): rule, words, timed grammar rush, reading, speaking round, test, boss rush (the platformer is an optional arcade).
export const STAGES_KIDS = [
  { id: 'learn', em: '📖', name: 'לומדים מילים' },
  { id: 'run1', em: '🏃', name: 'שלב ריצה: מילים' },
  { id: 'sent', em: '💬', name: 'לומדים משפטים' },
  { id: 'run2', em: '🗣️', name: 'שלב ריצה: מדברים' },
  { id: 'story', em: '📜', name: 'סיפור' },
  { id: 'boss', em: '👑', name: 'קרב בוס' },
];
export const STAGES_G = [
  { id: 'rule', em: '📘', name: 'כלל הדקדוק' },
  { id: 'learn', em: '📖', name: 'אוצר מילים' },
  { id: 'rush', em: '⚡', name: 'Grammar Rush' },
  { id: 'reading', em: '📰', name: 'הבנת הנקרא' },
  { id: 'speak', em: '🎙️', name: 'Speak Up' },
  { id: 'test', em: '📝', name: 'מבחן' },
  { id: 'boss', em: '👑', name: 'Boss Rush' },
];
export const stagesFor = u => (u && u.grammar ? STAGES_G : STAGES_KIDS);

const DEF = () => ({
  v: 1, name: '', track: 'kids', coins: 0, points: 0,
  look: { hoodie: '#ff7a1a', cap: '#2463eb', hat: 'cap', extra: '' },
  owned: ['hoodie:#ff7a1a', 'cap:#2463eb', 'hat:cap'],
  stages: {},       // 'unitId:stageIdx' -> { stars, at, score? }
  items: {},        // english text -> { b: box 0..5, due: ms, r: right, w: wrong }
  days: {},         // 'YYYY-MM-DD' -> { xp, sec }
  stats: { spoken: 0, typed: 0, answers: 0, right: 0 },
  badges: [],
  settings: { order: 'ehe', slow: false, music: true, sfx: true, unlockAll: false },
});

// ---- players
function readProfiles() {
  let P = null;
  try { P = JSON.parse(localStorage.getItem(PKEY) || 'null'); } catch (e) { }
  if (!P || !Array.isArray(P.list)) {
    P = { list: [], cur: null };
    try { const old = JSON.parse(localStorage.getItem(BASE) || 'null'); if (old?.name) { P.list.push({ id: 'p1', name: old.name, track: old.track || 'kids' }); P.cur = 'p1'; } } catch (e) { }
  }
  return P;
}
let P = readProfiles();
const keyFor = id => id === 'p1' ? BASE : `${BASE}:${id}`;     // the first player keeps the original key (no data migration needed)
function writeProfiles() { try { localStorage.setItem(PKEY, JSON.stringify(P)); } catch (e) { } }
export const profiles = () => P.list;
export const currentProfile = () => P.list.find(p => p.id === P.cur) || null;
export function addProfile(name, track) {
  const id = P.list.some(p => p.id === 'p1') ? 'p' + Date.now().toString(36) : 'p1';
  P.list.push({ id, name, track }); P.cur = id; writeProfiles();
  S = Object.assign(DEF(), { name, track }); save();
  return id;
}
export function switchProfile(id) { if (P.list.some(p => p.id === id)) { P.cur = id; writeProfiles(); S = null; load(); } }
export function removeProfile(id) {
  P.list = P.list.filter(p => p.id !== id); try { localStorage.removeItem(keyFor(id)); } catch (e) { }
  P.cur = P.list[0]?.id || null; writeProfiles(); S = null; load();
}
function syncProfile() { const p = currentProfile(); if (p && S) { p.name = S.name; p.track = S.track; writeProfiles(); } }

let S;
export function load() {
  const p = currentProfile();
  if (!p) { S = DEF(); return S; }
  try { S = Object.assign(DEF(), JSON.parse(localStorage.getItem(keyFor(p.id)) || '{}')); } catch (e) { S = DEF(); }
  S.settings = Object.assign(DEF().settings, S.settings);
  S.stats = Object.assign(DEF().stats, S.stats);
  S.track ||= p.track || 'kids'; S.name ||= p.name;
  return S;
}
export const st = () => S || load();
export function save() {
  const p = currentProfile(); if (!p) return;
  try { localStorage.setItem(keyFor(p.id), JSON.stringify(S)); } catch (e) { /* private mode – progress lives for this visit */ }
  syncProfile();
}

export const today = (d = new Date()) => new Date(d.getTime() - d.getTimezoneOffset() * 6e4).toISOString().slice(0, 10);
export function addXp(n) { const d = S.days[today()] ||= { xp: 0, sec: 0 }; d.xp += n; save(); }
export function addTime(sec) { if (!currentProfile()) return; const d = S.days[today()] ||= { xp: 0, sec: 0 }; d.sec += sec; save(); }
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
export const stageScore = (u, i) => S.stages[stageKey(u, i)]?.score ?? null;
export function finishStage(u, i, stars, score) {
  const k = stageKey(u, i), old = S.stages[k] || {};
  S.stages[k] = { stars: Math.max(old.stars || 0, stars), at: Date.now() };
  const best = Math.max(old.score ?? -1, score ?? -1);
  if (best >= 0) S.stages[k].score = best;
  save();
  return stars > (old.stars || 0);
}
export function unitDone(u) { return stageStars(u.id, stagesFor(u).length - 1) > 0; }
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
export const box = text => S.items[text]?.b ?? -1;
export const isDue = text => { const it = S.items[text]; return !!it && it.due <= Date.now(); };
export const mastered = () => Object.values(S.items).filter(i => i.b >= 3).length;

export function reset() { const { name, track } = S; S = Object.assign(DEF(), { name, track }); save(); }
export function exportJson() { return JSON.stringify(S); }
export function importJson(txt) { const o = JSON.parse(txt); if (!o || o.v !== 1) throw new Error('bad file'); S = Object.assign(DEF(), o); save(); }

// ---- points, ranks and the family leaderboard (weekly xp, Sunday to Saturday)
export const RANKS = [
  { min: 25000, em: '💎', name: 'Diamond' }, { min: 12000, em: '🏆', name: 'Platinum' }, { min: 5000, em: '🥇', name: 'Gold' },
  { min: 1500, em: '🥈', name: 'Silver' }, { min: 0, em: '🥉', name: 'Bronze' },
];
export const rankFor = pts => RANKS.find(r => pts >= r.min);
export const nextRank = pts => [...RANKS].reverse().find(r => r.min > pts) || null;
export function addPoints(n) { S.points = (S.points || 0) + n; save(); }
function weekKeys() { const d = new Date(); d.setDate(d.getDate() - d.getDay()); return [...Array(7)].map((_, i) => { const x = new Date(d); x.setDate(d.getDate() + i); return today(x); }); }
export function leaderboard() {
  const keys = weekKeys();
  return P.list.map(p => {
    let data = {}; try { data = JSON.parse(localStorage.getItem(keyFor(p.id)) || '{}'); } catch (e) { }
    const week = keys.reduce((a, k) => a + (data.days?.[k]?.xp || 0), 0);
    return { id: p.id, name: p.name, track: p.track, week, points: data.points || 0, me: p.id === P.cur };
  }).sort((a, b) => b.week - a.week);
}
