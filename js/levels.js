// Procedural level builder. A level is a tile grid plus objects; each "event" (word block, spelling gate, speaking door)
// sits between random filler segments (gaps, stairs, enemies, platforms) so every level plays a little differently.
export const H = 12, GROUND = 10;
export const EMPTY = 0, DIRT = 1, BRICK = 2, QBLOCK = 3, USED = 4, GATE = 5, DOOR = 6, STONE = 7;
export const SOLID = new Set([DIRT, BRICK, QBLOCK, USED, GATE, DOOR, STONE]);

export function rng(seed) {
  let a = seed >>> 0 || 1;
  return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
export const hash = s => [...String(s)].reduce((h, c) => Math.imul(h ^ c.charCodeAt(0), 16777619) >>> 0, 2166136261);

// events: [{ kind: 'block', ch } | { kind: 'spell', item } | { kind: 'door', ch }]; level: 0..1 difficulty
export function buildLevel({ theme, events, seed = 1, difficulty = 0.3 }) {
  const R = rng(seed), pick = a => a[Math.floor(R() * a.length)];
  const W = 60 + events.length * 34;
  const t = new Uint8Array(W * H);
  const L = { theme, w: W, h: H, t, coins: [], enemies: [], plats: [], blocks: {}, spells: [], doors: [], checkpoints: [], finishX: 0 };
  // enemy kinds unlock with difficulty: walker → hopper → flyer → spiky (spiky can't be stomped)
  const foe = () => { const r = R(); return difficulty > 0.45 && r < 0.2 ? 'spiky' : difficulty > 0.3 && r < 0.45 ? 'flyer' : difficulty > 0.2 && r < 0.7 ? 'hopper' : 'walker'; };
  const set = (x, y, v) => { if (x >= 0 && x < W && y >= 0 && y < H) t[y * W + x] = v; };
  const ground = (x, n = 1) => { for (let i = 0; i < n; i++) for (let y = GROUND; y < H; y++) set(x + i, y, DIRT); };
  const coin = (x, y) => L.coins.push({ x: x + 0.5, y: y + 0.5 });
  let x = 0;

  const SEG = {
    flat() { const n = 5 + Math.floor(R() * 4); ground(x, n); if (R() < 0.6) for (let i = 1; i < n - 1; i += 1) coin(x + i, GROUND - 2); x += n; },
    gap() {
      const g = R() < difficulty ? 3 : 2; ground(x, 3);
      for (let i = 0; i < g; i++) coin(x + 3 + i, GROUND - 4 + (i === 0 || i === g - 1 ? 1 : 0));
      x += 3 + g; ground(x, 3); x += 3;
    },
    stairs() {
      const hgt = R() < difficulty ? 3 : 2; ground(x, 4 + hgt * 2 + 2);
      for (let s = 1; s <= hgt; s++) for (let k = 0; k < s; k++) { set(x + 1 + s, GROUND - 1 - k, STONE); set(x + 2 + hgt * 2 - s + 1, GROUND - 1 - k, STONE); }
      coin(x + 1 + hgt, GROUND - hgt - 2); coin(x + 2 + hgt, GROUND - hgt - 2);
      x += 4 + hgt * 2 + 2;
    },
    platforms() {
      ground(x, 11);
      for (let i = 0; i < 3; i++) { set(x + 4 + i, GROUND - 3, BRICK); coin(x + 4 + i, GROUND - 4); }
      if (R() < 0.5) { set(x + 8, GROUND - 5, BRICK); set(x + 9, GROUND - 5, BRICK); coin(x + 8, GROUND - 6); coin(x + 9, GROUND - 6); }
      x += 11;
    },
    enemy() {
      ground(x, 12);
      const k1 = foe(); L.enemies.push({ x: x + 7, y: k1 === 'flyer' ? GROUND - 4 : GROUND - 1, kind: k1 });
      if (R() < difficulty) { const k2 = foe(); L.enemies.push({ x: x + 10, y: k2 === 'flyer' ? GROUND - 4 : GROUND - 1, kind: k2 }); }
      if (R() < 0.5) { set(x + 2, GROUND - 1, STONE); }
      set(x + 11, GROUND - 1, STONE);
      x += 12;
    },
    pillar() { ground(x, 8); const h = 2 + (R() < difficulty ? 1 : 0); for (let k = 0; k < h; k++) set(x + 4, GROUND - 1 - k, STONE); coin(x + 4, GROUND - h - 2); x += 8; },
    mover() {                 // a wide pit crossed on a platform that slides left and right
      ground(x, 3); x += 3;
      const gap = 7; L.plats.push({ x: x + 0.5, y: GROUND - 1, w: 2, axis: 'x', range: gap - 3, speed: 0.012 + difficulty * 0.01, phase: R() * 6 });
      for (let i = 1; i < gap - 1; i += 2) coin(x + i, GROUND - 3);
      x += gap; ground(x, 3); x += 3;
    },
    elevator() {              // a tall ledge reached by a platform that moves up and down
      ground(x, 12);
      for (let k = 0; k < 4; k++) for (let i = 6; i < 10; i++) set(x + i, GROUND - 1 - k, STONE);
      L.plats.push({ x: x + 3.5, y: GROUND - 1.5, w: 2, axis: 'y', range: 3.5, speed: 0.02, phase: R() * 6 });
      coin(x + 7, GROUND - 6); coin(x + 8, GROUND - 6);
      x += 12;
    },
    pitPlatforms() {          // floating stepping stones over a wider pit
      ground(x, 2); x += 2;
      for (let i = 0; i < 2; i++) { set(x + 1 + i * 3, GROUND - 2, BRICK); set(x + 2 + i * 3, GROUND - 2, BRICK); coin(x + 1 + i * 3, GROUND - 3); }
      x += 7; ground(x, 3); x += 3;
    },
  };
  const fillers = ['flat', 'gap', 'stairs', 'platforms', 'enemy', 'pillar', 'enemy', 'gap', ...(difficulty > 0.25 ? ['mover', 'enemy'] : []), ...(difficulty > 0.35 ? ['elevator', 'pitPlatforms'] : [])];

  ground(x, 8); L.start = { x: 2, y: GROUND - 2 }; L.checkpoints.push(2); x += 8;
  events.forEach((ev, i) => {
    const nf = 1 + (R() < 0.5 ? 1 : 0);
    for (let k = 0; k < nf; k++) SEG[pick(fillers)]();
    if (ev.kind === 'block') {
      ground(x, 7);
      set(x + 2, GROUND - 4, BRICK); set(x + 3, GROUND - 4, QBLOCK); set(x + 4, GROUND - 4, BRICK);
      L.blocks[(GROUND - 4) * W + x + 3] = i;
      x += 7;
    } else if (ev.kind === 'spell') {
      const word = ev.item.en, letters = [...word].filter(c => /[a-z]/.test(c));
      const extra = 'aeioustnrlmbdgkp'.split('').filter(c => !letters.includes(c));
      const all = [...letters, pick(extra), pick(extra)];
      for (let a = all.length - 1; a > 0; a--) { const b = Math.floor(R() * (a + 1)); [all[a], all[b]] = [all[b], all[a]]; }
      const len = all.length * 2 + 5;
      ground(x, len + 4);
      const sp = { idx: i, item: ev.item, word: letters.join(''), letters: all.map((ch, k) => ({ ch, x: x + 3 + k * 2 + 0.5, y: GROUND - 3 + 0.5, taken: false, shake: 0 })), next: 0, from: x, gateX: x + len, open: false };
      for (let y = 0; y < GROUND; y++) set(sp.gateX, y, GATE);
      L.spells.push(sp); L.checkpoints.push(x + 1);
      x += len + 4; L.checkpoints.push(sp.gateX + 2);
    } else if (ev.kind === 'door') {
      ground(x, 10);
      const d = { idx: i, x: x + 6, open: false };
      for (let y = 0; y < GROUND; y++) set(d.x, y, DOOR);
      L.doors.push(d); L.checkpoints.push(x + 2);
      x += 10; L.checkpoints.push(d.x + 2);
    }
  });
  SEG.flat(); ground(x, 14); L.finishX = x + 7; x += 14;
  L.w = Math.min(W, x);
  if (L.w < W) {                                           // trim unused columns
    const t2 = new Uint8Array(L.w * H);
    for (let y = 0; y < H; y++) t2.set(t.subarray(y * W, y * W + L.w), y * L.w);
    const blocks = {};
    for (const [k, v] of Object.entries(L.blocks)) { const yy = Math.floor(k / W), xx = k % W; blocks[yy * L.w + xx] = v; }
    L.t = t2; L.blocks = blocks;
  }
  L.checkpoints.sort((a, b) => a - b);
  return L;
}

// Boss arena: a closed room with three question blocks that refill. The boss walks, hops and throws.
export function buildArena({ theme, blocks = 3 }) {
  const W = 28, t = new Uint8Array(W * H);
  const set = (x, y, v) => { t[y * W + x] = v; };
  for (let x = 0; x < W; x++) for (let y = GROUND; y < H; y++) set(x, y, DIRT);
  for (let y = 0; y < GROUND; y++) { set(0, y, STONE); set(W - 1, y, STONE); }
  const L = { theme, w: W, h: H, t, coins: [], enemies: [], plats: [], blocks: {}, spells: [], doors: [], checkpoints: [2], finishX: 1e9, start: { x: 3, y: GROUND - 2 }, arena: true };
  const xs = [5, 13, 21].slice(0, blocks);
  xs.forEach((bx, i) => { set(bx - 1, GROUND - 4, BRICK); set(bx, GROUND - 4, QBLOCK); set(bx + 1, GROUND - 4, BRICK); L.blocks[(GROUND - 4) * W + bx] = i; });
  [9, 17].forEach(px => { set(px, GROUND - 6, BRICK); set(px + 1, GROUND - 6, BRICK); });
  return L;
}
