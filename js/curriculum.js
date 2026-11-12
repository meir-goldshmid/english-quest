// The courses. Kids: Season 1 (content.js) + Season 2 (content2a/b.js) with a reading rule per world.
// Middle (about 11–13) and Teen (about 14–16): grammar tracks aligned with the Israeli English curriculum.
import { UNITS as S1 } from './content.js';
import { UNITS_2A, PHONICS_S1A } from './content2a.js';
import { UNITS_2B, PHONICS_S1B } from './content2b.js';
import { UNITS_MA } from './track_middle_a.js';
import { UNITS_MB } from './track_middle_b.js';
import { UNITS_TA } from './track_teen_a.js';
import { UNITS_TB } from './track_teen_b.js';

const P1 = { ...PHONICS_S1A, ...PHONICS_S1B };
const KIDS = [
  ...S1.map(u => ({ ...u, season: 1, phonics: u.phonics || P1[u.id] || null })),
  ...[...UNITS_2A, ...UNITS_2B].map(u => ({ ...u, season: 2 })),
];

export const TRACKS = {
  kids: { id: 'kids', em: '🧒', name: 'צעירים', ages: 'גילאי 8–10', grades: 'כיתות ג׳–ה׳', level: 'Pre-A1 → A1', blurb: 'מתחילים מאפס: מילים, צלילים, משפטים ודיבור', units: KIDS },
  middle: { id: 'middle', em: '🧑‍🎓', name: 'חטיבה', ages: 'גילאי 11–13', grades: 'כיתות ו׳–ח׳', level: 'A1 → A2', blurb: 'דקדוק בית הספר: רבים, זמנים, השוואות, סביל ועוד + מבחנים', units: [...UNITS_MA, ...UNITS_MB].map(u => ({ ...u, track: 'middle' })) },
  teen: { id: 'teen', em: '🎓', name: 'תיכון ובגרות', ages: 'גילאי 14–16', grades: 'כיתות ט׳–י״א', level: 'A2 → B1/B2', blurb: 'זמנים מתקדמים, תנאי, דיבור עקיף, מילות קישור, אנסין בסגנון בגרות', units: [...UNITS_TA, ...UNITS_TB].map(u => ({ ...u, track: 'teen' })) },
};
export const unitsFor = track => (TRACKS[track] || TRACKS.kids).units;
// kept for tools that only need the kids course
export const UNITS = KIDS;
