// Voice clips (pre-recorded with tools/make_audio.py), browser-voice fallback, sound effects and a tiny chiptune.
import { st } from './store.js';

const MAN = { en: null, he: null };
export async function loadManifests() {
  await Promise.all(['en', 'he'].map(async l => {
    try { MAN[l] = await (await fetch(`audio/${l}/manifest.json`)).json(); } catch (e) { MAN[l] = {}; }
  }));
}
export const clipUrl = (text, lang) => MAN[lang]?.[text] ? `audio/${lang}/${MAN[lang][text]}` : null;
export const isHe = s => /[א-ת]/.test(s);

let cur = null, token = 0;
export function stop() { token++; if (cur) { cur.pause(); cur = null; } try { speechSynthesis.cancel(); } catch (e) { } }

function playUrl(url, rate) {
  return new Promise(res => {
    const a = new Audio(url); cur = a;
    a.playbackRate = rate; a.preservesPitch = true;
    a.onended = a.onerror = () => res(); a.play().catch(() => res());
  });
}
function tts(text, lang, rate) {
  return new Promise(res => {
    if (!window.speechSynthesis) return res();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang === 'he' ? 'he-IL' : 'en-US'; u.rate = 0.9 * rate;
    const v = speechSynthesis.getVoices().find(v => v.lang.replace('_', '-').startsWith(u.lang.slice(0, 2)));
    if (v) u.voice = v;
    u.onend = u.onerror = () => res();
    speechSynthesis.speak(u);
    setTimeout(res, 1500 + text.length * 120);
  });
}

// Say one text. lang: 'en' | 'he' (auto when omitted). Interrupts anything playing.
export async function say(text, lang, { rate, keep } = {}) {
  if (!text) return;
  if (!keep) stop();
  const my = token;
  lang ||= isHe(text) ? 'he' : 'en';
  rate ??= lang === 'en' && st().settings.slow ? 0.75 : 1;
  const url = clipUrl(text, lang);
  if (my !== token) return;
  return url ? playUrl(url, rate) : tts(text, lang, rate);
}
const wait = ms => new Promise(r => setTimeout(r, ms));

// English + Hebrew in the order chosen in settings (ehe = English, Hebrew, English; heh = Hebrew, English, Hebrew).
export async function trio(en, he, order = st().settings.order) {
  stop(); const my = token;
  const seq = order === 'heh' ? [[he, 'he'], [en, 'en'], [he, 'he']] : order === 'eh' ? [[en, 'en'], [he, 'he']] : [[en, 'en'], [he, 'he'], [en, 'en']];
  for (const [t, l] of seq) {
    if (my !== token) return;
    await say(t, l, { keep: true });
    await wait(350);
  }
}

// ---------- sound effects (synthesised, no files)
let ac;
const ctx = () => (ac ||= new (window.AudioContext || window.webkitAudioContext)());
export function unlockAudio() { try { ctx().resume(); } catch (e) { } }
function tone(f, d, { type = 'square', vol = 0.08, slide = 0, at = 0 } = {}) {
  const c = ctx(), t = c.currentTime + at, o = c.createOscillator(), g = c.createGain();
  o.type = type; o.frequency.setValueAtTime(f, t);
  if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(30, f + slide), t + d);
  g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
  o.connect(g); g.connect(c.destination); o.start(t); o.stop(t + d + 0.02);
}
const FX = {
  jump: () => tone(300, 0.15, { slide: 400, vol: 0.05 }),
  coin: () => { tone(988, 0.07, { vol: 0.05 }); tone(1319, 0.2, { at: 0.07, vol: 0.05 }); },
  bump: () => tone(140, 0.1, { type: 'triangle', vol: 0.12 }),
  stomp: () => tone(500, 0.12, { slide: -380, vol: 0.08 }),
  hurt: () => { tone(400, 0.12, { type: 'sawtooth', slide: -200, vol: 0.06 }); tone(200, 0.25, { type: 'sawtooth', slide: -100, at: 0.12, vol: 0.06 }); },
  good: () => [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.14, { at: i * 0.08, vol: 0.06, type: 'triangle' })),
  bad: () => { tone(220, 0.18, { type: 'sawtooth', vol: 0.05 }); tone(185, 0.3, { type: 'sawtooth', at: 0.18, vol: 0.05 }); },
  letter: () => tone(660, 0.1, { type: 'triangle', slide: 300, vol: 0.07 }),
  gate: () => [392, 523, 659, 784, 1047].forEach((f, i) => tone(f, 0.2, { at: i * 0.07, vol: 0.05 })),
  win: () => [523, 523, 659, 784, 659, 784, 1047].forEach((f, i) => tone(f, 0.22, { at: i * 0.12, vol: 0.06, type: 'triangle' })),
  pop: () => tone(880, 0.06, { type: 'sine', vol: 0.08 }),
  hit: () => { tone(120, 0.2, { type: 'square', slide: -60, vol: 0.1 }); tone(900, 0.08, { type: 'square', vol: 0.04 }); },
};
export function sfx(name) { if (!st().settings.sfx) return; try { FX[name]?.(); } catch (e) { } }

// ---------- tiny background tune (quiet; pauses while voices play is unnecessary – it's soft)
const SONGS = {
  grass: [[67, 2], [72, 2], [76, 2], [72, 2], [74, 2], [77, 2], [76, 4], [72, 2], [67, 2], [69, 2], [71, 2], [72, 8]],
  desert: [[62, 2], [63, 2], [66, 2], [67, 2], [69, 4], [67, 2], [66, 2], [63, 2], [62, 6], [0, 2]],
  snow: [[76, 4], [74, 2], [72, 2], [74, 4], [76, 4], [79, 4], [76, 4], [72, 8]],
  cave: [[57, 2], [60, 2], [64, 2], [60, 2], [59, 2], [62, 2], [65, 2], [62, 2], [57, 8]],
  sky: [[72, 2], [76, 2], [79, 2], [84, 2], [83, 2], [79, 2], [76, 4], [77, 2], [81, 2], [79, 8]],
  castle: [[60, 2], [63, 2], [67, 2], [63, 2], [62, 2], [65, 2], [68, 4], [67, 8]],
};
let musicTimer = null;
export function music(theme) {
  stopMusic();
  if (!st().settings.music || !theme) return;
  const song = SONGS[theme] || SONGS.grass, beat = 0.16;
  let i = 0;
  const step = () => {
    const [n, len] = song[i % song.length]; i++;
    if (n) {
      const f = 440 * 2 ** ((n - 69) / 12);
      try { tone(f, len * beat * 0.9, { type: 'triangle', vol: 0.025 }); tone(f / 2, len * beat * 0.9, { type: 'sine', vol: 0.02 }); } catch (e) { }
    }
    musicTimer = setTimeout(step, len * beat * 1000);
  };
  step();
}
export function stopMusic() { clearTimeout(musicTimer); musicTimer = null; }
