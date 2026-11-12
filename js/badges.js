// Achievements. Each badge checks the saved progress; newly earned ones are announced once.
import { st, save, streak, mastered, unitDone, stageStars, stagesFor } from './store.js';

const doneUnits = units => units.filter(unitDone).length;
const threeStarUnits = units => units.filter(u => stagesFor(u).every((_, k) => stageStars(u.id, k) === 3)).length;

export const BADGES = [
  { id: 'first', em: '🚀', name: 'יוצא לדרך', desc: 'סיים שלב ראשון', test: s => Object.keys(s.stages).length >= 1 },
  { id: 'world1', em: '🌱', name: 'עולם ראשון', desc: 'סיים עולם שלם', test: (s, U) => doneUnits(U) >= 1 },
  { id: 'world6', em: '🗺️', name: 'מגלה עולמות', desc: 'סיים 6 עולמות', test: (s, U) => doneUnits(U) >= 6 },
  { id: 'world12', em: '🧭', name: 'נווט', desc: 'סיים 12 עולמות', test: (s, U) => doneUnits(U) >= 12 },
  { id: 'season1', em: '🏆', name: 'אלוף עונה 1', desc: 'סיים את כל 24 העולמות הראשונים', test: (s, U) => U.slice(0, 24).every(unitDone) },
  { id: 'season2', em: '👑', name: 'אלוף עונה 2', desc: 'סיים את כל העולמות', test: (s, U) => U.length > 24 && U.every(unitDone) },
  { id: 'stars', em: '🌟', name: 'כוכבן', desc: 'השג 3 כוכבים בכל שלבי עולם אחד', test: (s, U) => threeStarUnits(U) >= 1 },
  { id: 'words50', em: '📚', name: '50 מילים', desc: 'דע היטב 50 מילים ומשפטים', test: () => mastered() >= 50 },
  { id: 'words200', em: '🧠', name: '200 מילים', desc: 'דע היטב 200 מילים ומשפטים', test: () => mastered() >= 200 },
  { id: 'words500', em: '🎓', name: '500 מילים', desc: 'דע היטב 500 מילים ומשפטים', test: () => mastered() >= 500 },
  { id: 'talk10', em: '🗣️', name: 'מדבר', desc: 'אמור 10 דברים באנגלית', test: s => s.stats.spoken >= 10 },
  { id: 'talk100', em: '🎙️', name: 'דברן', desc: 'אמור 100 דברים באנגלית', test: s => s.stats.spoken >= 100 },
  { id: 'write50', em: '✏️', name: 'כותב', desc: 'כתוב 50 מילים', test: s => s.stats.typed >= 50 },
  { id: 'gates10', em: '🔤', name: 'פותח שערים', desc: 'פתח 10 שערי אותיות', test: s => (s.stats.gates || 0) >= 10 },
  { id: 'stomp50', em: '🥾', name: 'קופץ על מפלצות', desc: 'קפוץ על 50 מפלצות', test: s => (s.stats.stomps || 0) >= 50 },
  { id: 'power20', em: '⚡', name: 'טעון בכוח', desc: 'אסוף 20 כוחות-על', test: s => (s.stats.powers || 0) >= 20 },
  { id: 'boss5', em: '⚔️', name: 'צייד בוסים', desc: 'נצח 5 בוסים', test: s => (s.stats.bosses || 0) >= 5 },
  { id: 'perfect10', em: '💯', name: 'מושלם', desc: '10 שלבי ריצה עם 3 כוכבים', test: s => (s.stats.perfect || 0) >= 10 },
  { id: 'streak3', em: '🔥', name: '3 ימים ברצף', desc: 'שחק 3 ימים ברצף', test: () => streak() >= 3 },
  { id: 'streak7', em: '📅', name: 'שבוע שלם', desc: 'שחק 7 ימים ברצף', test: () => streak() >= 7 },
  { id: 'streak30', em: '🗓️', name: 'חודש של אנגלית', desc: 'שחק 30 ימים ברצף', test: () => streak() >= 30 },
  { id: 'review', em: '🔁', name: 'חוזר ולומד', desc: 'סיים 10 חזרות יומיות', test: s => (s.stats.reviews || 0) >= 10 },
  { id: 'rich', em: '💰', name: 'עשיר', desc: 'אסוף 500 מטבעות בבת אחת', test: s => s.coins >= 500 },
  { id: 'style', em: '😎', name: 'סטייל', desc: 'קנה משהו בחנות', test: s => s.owned.length > 3 },
];

// Returns badges newly earned since the last check and remembers them.
export function checkBadges(units) {
  const s = st(); s.badges ||= [];
  const fresh = BADGES.filter(b => !s.badges.includes(b.id) && b.test(s, units));
  if (fresh.length) { s.badges.push(...fresh.map(b => b.id)); save(); }
  return fresh;
}
export const hasBadge = id => (st().badges || []).includes(id);
