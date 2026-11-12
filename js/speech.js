// English speech recognition (Web Speech API) with kid-friendly matching.
const SR = typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition);
export const canRecognize = () => !!SR;

// Listen once; resolves to alternative transcripts (best first). Rejects with an error code.
export function listenOnce(ms = 7000) {
  return new Promise((res, rej) => {
    if (!SR) return rej('unsupported');
    const r = new SR();
    r.lang = 'en-US'; r.interimResults = false; r.maxAlternatives = 5; r.continuous = false;
    let done = false;
    const finish = (fn, v) => { if (done) return; done = true; clearTimeout(t); try { r.abort(); } catch (e) { } fn(v); };
    r.onresult = e => finish(res, [...e.results[0]].map(a => a.transcript));
    r.onerror = e => (e.error === 'no-speech' || e.error === 'aborted') ? finish(res, []) : finish(rej, e.error);
    r.onend = () => finish(res, []);
    const t = setTimeout(() => finish(res, []), ms);
    try { r.start(); } catch (e) { finish(rej, 'start'); }
  });
}

const NUM = { 0: 'zero', 1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five', 6: 'six', 7: 'seven', 8: 'eight', 9: 'nine', 10: 'ten', 11: 'eleven', 12: 'twelve', 13: 'thirteen', 14: 'fourteen', 15: 'fifteen', 16: 'sixteen', 17: 'seventeen', 18: 'eighteen', 19: 'nineteen', 20: 'twenty' };
const CONTR = [[/\bi'm\b/g, 'i am'], [/\byou're\b/g, 'you are'], [/\bit's\b/g, 'it is'], [/\bhe's\b/g, 'he is'], [/\bshe's\b/g, 'she is'], [/\bwe're\b/g, 'we are'], [/\bthey're\b/g, 'they are'], [/\bdon't\b/g, 'do not'], [/\bdoesn't\b/g, 'does not'], [/\bcan't\b/g, 'can not'], [/\bcannot\b/g, 'can not'], [/\bisn't\b/g, 'is not'], [/\baren't\b/g, 'are not'], [/\bwhat's\b/g, 'what is'], [/\bwhere's\b/g, 'where is'], [/\blet's\b/g, 'let us'], [/\bi'll\b/g, 'i will'], [/\bdidn't\b/g, 'did not'], [/\bwon't\b/g, 'will not'], [/\bthat's\b/g, 'that is']];
export function norm(s) {
  let t = String(s).toLowerCase().replace(/[’`]/g, "'");
  CONTR.forEach(([re, v]) => { t = t.replace(re, v); });
  t = t.replace(/\b\d+\b/g, d => NUM[d] || d).replace(/-/g, ' ').replace(/[^a-z' ]/g, ' ').replace(/'/g, '');
  return t.replace(/\s+/g, ' ').trim();
}
function lev(a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)
    d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
}
const close = (a, b) => a === b || (b.length >= 4 && lev(a, b) <= 1) || (b.length >= 7 && lev(a, b) <= 2);

// Did the child say the target (word or sentence)? Returns { ok, heard, score }.
export function judge(alts, target) {
  const T = norm(target).split(' ').filter(Boolean);
  let best = { ok: false, heard: alts[0] || '', score: 0 };
  for (const alt of alts) {
    const A = norm(alt).split(' ').filter(Boolean);
    if (!A.length) continue;
    let score;
    if (T.length <= 2) {                         // single word / pair: must appear (allow a tiny slip, or joined words)
      const joined = A.join(''), tj = T.join('');
      score = (close(joined, tj) || T.every(w => A.some(a => close(a, w)))) ? 1 : 0;
    } else {                                     // sentence: share of target words heard in order-ish
      let hit = 0, from = 0;
      for (const w of T) { const k = A.findIndex((a, i) => i >= from && close(a, w)); if (k >= 0) { hit++; from = k + 1; } }
      score = hit / T.length;
    }
    if (score > best.score) best = { ok: score >= (T.length <= 2 ? 1 : 0.7), heard: alt, score };
  }
  return best;
}
