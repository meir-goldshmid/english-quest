// Side-scrolling platformer engine (canvas). Original art drawn with shapes – no external sprites.
import { H, GROUND, EMPTY, BRICK, QBLOCK, USED, GATE, DOOR, STONE, SOLID } from './levels.js';
import { sfx } from './audio.js';

export const T = 32;
const GRAV = 0.55, JUMP = 11.6, RUN = 4.2, ACC = 0.45, FRIC = 0.78;

export const THEMES = {
  grass: { sky: ['#5ec2ff', '#d4f3ff'], far: '#8fd694', near: '#5fbf5f', top: '#4cc94c', dirt: '#b86b2c', dirt2: '#9a5522', brick: '#d9773a', stone: '#9aa3ad', enemy: '#8b5cf6' },
  desert: { sky: ['#ffb75e', '#fff1c9'], far: '#f2c27a', near: '#e3a857', top: '#f6d58a', dirt: '#e0a54f', dirt2: '#c98d3c', brick: '#c0703a', stone: '#b9a17c', enemy: '#16a34a' },
  snow: { sky: ['#8ccfff', '#f0f9ff'], far: '#dbeafe', near: '#ffffff', top: '#ffffff', dirt: '#7dc3e8', dirt2: '#5aaad6', brick: '#93c5fd', stone: '#cbd5e1', enemy: '#ef4444' },
  cave: { sky: ['#1e1533', '#3b2d5c'], far: '#2c2148', near: '#3f3066', top: '#a78bfa', dirt: '#5b4a85', dirt2: '#4a3b70', brick: '#7c5cbf', stone: '#6b7280', enemy: '#f59e0b' },
  sky: { sky: ['#7dd3fc', '#fde7f3'], far: '#ffffff', near: '#fbcfe8', top: '#ffffff', dirt: '#fce7f3', dirt2: '#f9c6de', brick: '#f9a8d4', stone: '#e9d5ff', enemy: '#0ea5e9' },
  castle: { sky: ['#2a1438', '#7a3a5c'], far: '#4a2650', near: '#5d2f5e', top: '#9ca3af', dirt: '#6b7280', dirt2: '#4b5563', brick: '#a8553a', stone: '#71717a', enemy: '#22c55e' },
};

// ---------- hero drawing (also used by the shop & boss screens)
export function drawHero(c, x, y, { face = 1, frame = 0, look, air = false, scale = 1 } = {}) {
  // x,y = bottom-centre
  c.save(); c.translate(x, y); c.scale(face * scale, scale);
  const sw = air ? 0 : Math.sin(frame * 0.35) * 5;
  if (look.extra === 'cape') { c.fillStyle = '#dc2626'; c.beginPath(); c.moveTo(-6, -36); c.quadraticCurveTo(-20 - sw, -18, -16, -6); c.lineTo(-2, -12); c.fill(); }
  // legs
  c.fillStyle = '#1e3a8a';
  c.fillRect(-7 + sw * 0.6, -14, 6, 12); c.fillRect(1 - sw * 0.6, -14, 6, 12);
  c.fillStyle = '#222'; c.fillRect(-8 + sw * 0.6, -3, 8, 3); c.fillRect(0 - sw * 0.6, -3, 9, 3);
  // body
  c.fillStyle = look.hoodie; rr(c, -10, -30, 20, 18, 6); c.fill();
  c.fillStyle = 'rgba(0,0,0,.12)'; c.fillRect(-10, -16, 20, 3);
  // backpack
  c.fillStyle = look.cap; rr(c, -15, -29, 6, 13, 3); c.fill();
  // arm
  c.fillStyle = look.hoodie; c.save(); c.translate(2, -26); c.rotate(air ? -1.2 : -sw * 0.08); rr(c, -2.5, 0, 5, 12, 2.5); c.fill(); c.fillStyle = '#f2c39b'; c.beginPath(); c.arc(0, 13, 3, 0, 7); c.fill(); c.restore();
  // head
  c.fillStyle = '#f2c39b'; c.beginPath(); c.arc(0, -38, 9, 0, 7); c.fill();
  c.fillStyle = '#3b2412'; c.beginPath(); c.arc(-1, -41, 8.5, Math.PI, 0); c.fill();
  c.fillStyle = '#fff'; c.beginPath(); c.arc(4, -38, 2.6, 0, 7); c.fill();
  c.fillStyle = '#111'; c.beginPath(); c.arc(4.8, -38, 1.4, 0, 7); c.fill();
  c.strokeStyle = '#7a3b1e'; c.lineWidth = 1.2; c.beginPath(); c.arc(4, -34, 2.6, 0.2, 2.6); c.stroke();
  if (look.extra === 'shades') { c.fillStyle = '#111'; rr(c, 0, -40, 9, 4, 2); c.fill(); }
  hat(c, look);
  c.restore();
}
function hat(c, look) {
  const h = look.hat;
  if (h === 'cap') { c.fillStyle = look.cap; c.beginPath(); c.arc(0, -42, 9, Math.PI, 0); c.fill(); c.fillRect(2, -43, 12, 3); }
  else if (h === 'crown') { c.fillStyle = '#facc15'; c.beginPath(); c.moveTo(-8, -44); c.lineTo(-8, -54); c.lineTo(-4, -48); c.lineTo(0, -56); c.lineTo(4, -48); c.lineTo(8, -54); c.lineTo(8, -44); c.fill(); c.fillStyle = '#ef4444'; c.beginPath(); c.arc(0, -47, 1.8, 0, 7); c.fill(); }
  else if (h === 'wizard') { c.fillStyle = '#6d28d9'; c.beginPath(); c.moveTo(-11, -43); c.lineTo(11, -43); c.lineTo(-2, -66); c.fill(); c.fillStyle = '#fde047'; c.font = '8px sans-serif'; c.fillText('★', -3, -50); }
  else if (h === 'helmet') { c.fillStyle = '#e5e7eb'; c.beginPath(); c.arc(0, -41, 10.5, Math.PI, 0); c.fill(); c.fillStyle = '#ef4444'; c.fillRect(-1.5, -52, 3, 9); }
  else if (h === 'cowboy') { c.fillStyle = '#92400e'; c.fillRect(-14, -45, 28, 3); rr(c, -7, -55, 14, 11, 3); c.fill(); }
  else if (h === 'kippah') { c.fillStyle = look.cap; c.beginPath(); c.ellipse(-1, -46, 7, 3.5, 0, Math.PI, 0); c.fill(); }
}
function rr(c, x, y, w, h, r) { c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); }

// ---------- engine
export class Game {
  constructor(canvas, level, look, hooks) {
    this.cv = canvas; this.c = canvas.getContext('2d'); this.L = level; this.look = look; this.hooks = hooks;
    this.th = THEMES[level.theme] || THEMES.grass;
    this.input = { left: false, right: false, jump: false };
    this.p = { x: level.start.x * T, y: level.start.y * T, w: 18, h: 42, vx: 0, vy: 0, face: 1, ground: false, coyote: 0, buf: 0, inv: 0, frame: 0 };
    this.coins = 0; this.hearts = 3; this.paused = false; this.over = false; this.tick = 0;
    this.enemies = level.enemies.map(e => ({ x: e.x * T, y: e.y * T, w: 26, h: 24, vx: -1, alive: true, squish: 0 }));
    this.coinsLeft = level.coins.map(c => ({ ...c, taken: false }));
    this.bumps = []; this.parts = []; this.popups = []; this.doorCool = 0; this.zone = null; this.cp = level.checkpoints[0];
    this.resize(); this._onResize = () => this.resize(); addEventListener('resize', this._onResize);
    this._kd = e => this.key(e, true); this._ku = e => this.key(e, false);
    addEventListener('keydown', this._kd); addEventListener('keyup', this._ku);
    this.last = performance.now(); this.acc = 0; this.running = true;
    requestAnimationFrame(t => this.loop(t));
    this.hud();
  }
  destroy() { this.running = false; removeEventListener('resize', this._onResize); removeEventListener('keydown', this._kd); removeEventListener('keyup', this._ku); }
  key(e, down) {
    if (e.target.closest?.('input,textarea')) return;
    const k = e.key;
    if (k === 'ArrowLeft' || k === 'a' || k === 'A') this.input.left = down;
    else if (k === 'ArrowRight' || k === 'd' || k === 'D') this.input.right = down;
    else if (k === 'ArrowUp' || k === ' ' || k === 'w' || k === 'W') { if (down && !this.input.jump) this.p.buf = 8; this.input.jump = down; }
    else return;
    if (!this.paused) e.preventDefault();
  }
  pressJump(down) { if (down && !this.input.jump) this.p.buf = 8; this.input.jump = down; }
  resize() {
    const r = this.cv.parentElement.getBoundingClientRect(), dpr = Math.min(2, devicePixelRatio || 1);
    // fit the 12-row world to the height; on a tall (portrait) screen fit ~13 columns to the width and fill the top with sky
    this.vh = H * T; this.scale = Math.min(r.height / this.vh, r.width / (13 * T)); this.vw = r.width / this.scale;
    this.oy = Math.max(0, r.height / this.scale - this.vh);
    this.cv.width = Math.round(r.width * dpr); this.cv.height = Math.round(r.height * dpr);
    this.cv.style.width = r.width + 'px'; this.cv.style.height = r.height + 'px';
    this.dpr = dpr;
  }
  tile(tx, ty) { if (tx < 0 || tx >= this.L.w) return 7; if (ty < 0) return (this.tile(tx, 0) === GATE || this.tile(tx, 0) === DOOR) ? GATE : EMPTY; if (ty >= H) return EMPTY; return this.L.t[ty * this.L.w + tx]; }
  setTile(tx, ty, v) { this.L.t[ty * this.L.w + tx] = v; }
  solid(tx, ty) { return SOLID.has(this.tile(tx, ty)); }
  hud() { this.hooks.hud?.({ coins: this.coins, hearts: this.hearts, zone: this.zone, progress: Math.min(1, this.p.x / (this.L.finishX * T)) }); }

  loop(now) {
    if (!this.running) return;
    this.acc += Math.min(100, now - this.last); this.last = now;
    while (this.acc >= 1000 / 60) { if (!this.paused && !this.over) this.step(); this.acc -= 1000 / 60; }
    this.draw();
    requestAnimationFrame(t => this.loop(t));
  }

  step() {
    const p = this.p, I = this.input; this.tick++;
    // horizontal
    if (I.left === I.right) p.vx *= FRIC; else { p.vx += (I.right ? ACC : -ACC); p.face = I.right ? 1 : -1; }
    p.vx = Math.max(-RUN, Math.min(RUN, p.vx)); if (Math.abs(p.vx) < 0.05) p.vx = 0;
    // jump (coyote time + buffer + variable height)
    p.coyote = p.ground ? 6 : p.coyote - 1; p.buf--;
    if (p.buf > 0 && p.coyote > 0) { p.vy = -JUMP; p.coyote = 0; p.buf = 0; p.ground = false; sfx('jump'); }
    if (!I.jump && p.vy < -4) p.vy *= 0.82;
    p.vy = Math.min(13, p.vy + GRAV);
    this.moveX(p); this.moveY(p);
    if (Math.abs(p.vx) > 0.3 && p.ground) p.frame++; else if (p.ground) p.frame = 0;
    if (p.inv > 0) p.inv--; if (this.doorCool > 0) this.doorCool--;
    if (p.y > H * T + 60) { this.hurt(true); return; }
    // coins
    for (const c of this.coinsLeft) if (!c.taken && Math.abs(c.x * T - (p.x + p.w / 2)) < 18 && Math.abs(c.y * T - (p.y + p.h / 2)) < 26) { c.taken = true; this.coins++; sfx('coin'); this.hud(); }
    // enemies
    for (const e of this.enemies) {
      if (!e.alive) { e.squish++; continue; }
      if (Math.abs(e.x - p.x) > this.vw * 1.2) continue;
      e.vy = Math.min(12, (e.vy || 0) + GRAV);
      const nx = e.x + e.vx, front = e.vx < 0 ? nx : nx + e.w, ty = Math.floor((e.y + e.h - 2) / T);
      if (this.solid(Math.floor(front / T), ty) || !this.solid(Math.floor(front / T), ty + 1)) e.vx = -e.vx; else e.x = nx;
      e.y += e.vy; const by = Math.floor((e.y + e.h) / T);
      if (this.solid(Math.floor((e.x + e.w / 2) / T), by)) { e.y = by * T - e.h; e.vy = 0; }
      if (p.x < e.x + e.w && p.x + p.w > e.x && p.y < e.y + e.h && p.y + p.h > e.y) {
        if (p.vy > 0 && p.y + p.h - e.y < 16) { e.alive = false; p.vy = -8; this.coins += 2; sfx('stomp'); this.burst(e.x + e.w / 2, e.y, this.th.enemy, 10); this.popup(e.x, e.y, '+2'); this.hud(); }
        else if (!p.inv) this.hurt(false, e);
      }
    }
    // spelling letters
    const zone = this.L.spells.find(s => !s.open && p.x / T > s.from - 1 && p.x / T < s.gateX + 1) || null;
    if (zone !== this.zone) { this.zone = zone; this.hooks.zone?.(zone); this.hud(); }
    if (zone) for (const l of zone.letters) {
      if (l.taken) continue; if (l.shake > 0) { l.shake--; continue; }
      if (Math.abs(l.x * T - (p.x + p.w / 2)) < 22 && Math.abs(l.y * T - (p.y + p.h / 2)) < 30) {
        if (l.ch === zone.word[zone.next]) {
          l.taken = true; zone.next++; sfx('letter'); this.burst(l.x * T, l.y * T, '#fde047', 8); this.hooks.letter?.(zone, l.ch, true); this.hud();
          if (zone.next >= zone.word.length) this.openSpell(zone);
        } else { l.shake = 40; sfx('bad'); this.hooks.letter?.(zone, l.ch, false); }
      }
    }
    // finish
    if (p.x + p.w > this.L.finishX * T - 4 && !this.over) { this.over = true; sfx('win'); this.hooks.finish?.({ coins: this.coins }); }
    // checkpoint
    for (const cx of this.L.checkpoints) if (p.ground && p.x / T > cx && cx > this.cp) this.cp = cx;
    this.parts = this.parts.filter(q => (q.x += q.vx, q.y += q.vy, q.vy += 0.3, --q.life > 0));
    this.popups = this.popups.filter(q => (q.y -= 0.6, --q.life > 0));
    this.bumps = this.bumps.filter(b => --b.t > 0);
  }
  moveX(p) {
    p.x += p.vx;
    const top = Math.floor(p.y / T), bot = Math.floor((p.y + p.h - 1) / T);
    const side = p.vx > 0 ? Math.floor((p.x + p.w) / T) : Math.floor(p.x / T);
    for (let ty = top; ty <= bot; ty++) if (this.solid(side, ty)) {
      const tt = this.tile(side, ty);
      if (tt === DOOR) this.touchDoor(side);
      p.x = p.vx > 0 ? side * T - p.w - 0.01 : (side + 1) * T + 0.01; p.vx = 0; break;
    }
  }
  moveY(p) {
    p.y += p.vy; p.ground = false;
    const l = Math.floor(p.x / T), r = Math.floor((p.x + p.w - 1) / T);
    if (p.vy > 0) {
      const ty = Math.floor((p.y + p.h) / T);
      for (let tx = l; tx <= r; tx++) if (this.solid(tx, ty)) { p.y = ty * T - p.h; p.vy = 0; p.ground = true; break; }
    } else if (p.vy < 0) {
      const ty = Math.floor(p.y / T);
      // hit the block nearest the hero's centre
      const cands = [];
      for (let tx = l; tx <= r; tx++) if (this.solid(tx, ty)) cands.push(tx);
      if (cands.length) {
        const cx = (p.x + p.w / 2) / T, tx = cands.sort((a, b) => Math.abs(a + 0.5 - cx) - Math.abs(b + 0.5 - cx))[0];
        p.y = (ty + 1) * T; p.vy = 0;
        this.headBump(tx, ty);
      }
    }
  }
  headBump(tx, ty) {
    const tt = this.tile(tx, ty);
    this.bumps.push({ tx, ty, t: 10 });
    if (tt === QBLOCK) {
      this.setTile(tx, ty, USED); sfx('pop');
      const idx = this.L.blocks[ty * this.L.w + tx];
      this.ask(this.hooks.block?.(idx), tx * T + T / 2, ty * T);
    } else sfx('bump');
  }
  async ask(promise, x, y) {
    if (!promise) return undefined;
    this.paused = true; this.input.left = this.input.right = this.input.jump = false;
    const ok = await promise;
    this.paused = false; this.last = performance.now();
    if (ok) { this.coins += 5; this.burst(x, y, '#facc15', 16); this.popup(x - 10, y - 10, '+5'); sfx('coin'); }
    this.hud();
    return ok;
  }
  async touchDoor(side) {
    if (this.doorCool > 0 || this.paused) return;
    const d = this.L.doors.find(d => d.x === side && !d.open); if (!d) return;
    this.doorCool = 60;
    const ok = await this.ask(this.hooks.door?.(d.idx), side * T, (GROUND - 3) * T);
    if (ok !== undefined) { this.openColumn(d.x, DOOR); d.open = true; }   // the speaking challenge always ends (retry / skip), so the door opens
  }
  openSpell(s) { s.open = true; this.openColumn(s.gateX, GATE); this.coins += 5; this.hooks.spelled?.(s); this.hud(); }
  openColumn(x, type) {
    sfx('gate');
    for (let y = 0; y < H; y++) if (this.tile(x, y) === type) { this.setTile(x, y, EMPTY); this.burst(x * T + T / 2, y * T + T / 2, type === GATE ? '#fde047' : '#94a3b8', 3); }
  }
  hurt(fell, e) {
    this.hearts--; sfx('hurt'); const p = this.p;
    if (this.hearts <= 0 || fell) {
      if (this.hearts <= 0) this.hearts = 3;
      p.x = this.cp * T; p.y = (GROUND - 3) * T; p.vx = p.vy = 0; p.inv = 90;
      this.hooks.oops?.(this.hearts);
    } else { p.inv = 90; p.vy = -6; p.vx = e && e.x > p.x ? -5 : 5; }
    this.hud();
  }
  burst(x, y, color, n) { for (let i = 0; i < n; i++) this.parts.push({ x, y, vx: (Math.random() - 0.5) * 6, vy: -Math.random() * 6, life: 30 + Math.random() * 20, color }); }
  popup(x, y, text) { this.popups.push({ x, y, text, life: 50 }); }

  // ---------- drawing
  draw() {
    const c = this.c, th = this.th, p = this.p, s = this.scale * this.dpr, vw = this.vw, vh = this.vh;
    const camX = Math.max(0, Math.min(this.L.w * T - vw, p.x - vw * 0.38));
    c.setTransform(s, 0, 0, s, 0, 0);
    const g = c.createLinearGradient(0, -this.oy, 0, vh); g.addColorStop(0, th.sky[0]); g.addColorStop(1, th.sky[1]);
    c.translate(0, this.oy);
    c.fillStyle = g; c.fillRect(0, -this.oy, vw, vh + this.oy);
    this.drawBack(c, camX, vw, vh);
    c.save(); c.translate(-Math.round(camX), 0);
    const x0 = Math.floor(camX / T) - 1, x1 = Math.ceil((camX + vw) / T) + 1;
    for (let ty = 0; ty < H; ty++) for (let tx = x0; tx <= x1; tx++) {
      if (tx < 0 || tx >= this.L.w) continue;
      const tt = this.L.t[ty * this.L.w + tx]; if (!tt) continue;
      const b = this.bumps.find(b => b.tx === tx && b.ty === ty), dy = b ? -Math.sin(b.t / 10 * Math.PI) * 8 : 0;
      this.drawTile(c, tt, tx * T, ty * T + dy, tx, ty);
    }
    // checkpoints flags
    for (const cx of this.L.checkpoints.slice(1)) this.drawFlag(c, cx * T, GROUND * T, cx <= this.cp);
    // goal portal
    this.drawGoal(c, this.L.finishX * T, GROUND * T);
    // coins
    for (const k of this.coinsLeft) if (!k.taken) {
      const w = Math.abs(Math.cos(this.tick / 12 + k.x)) * 9 + 2;
      c.fillStyle = '#facc15'; c.beginPath(); c.ellipse(k.x * T, k.y * T, w, 11, 0, 0, 7); c.fill();
      c.fillStyle = '#fde68a'; c.beginPath(); c.ellipse(k.x * T - 1, k.y * T - 1, w * 0.5, 7, 0, 0, 7); c.fill();
    }
    // spelling letters
    for (const s2 of this.L.spells) for (const l of s2.letters) {
      if (l.taken) continue;
      const bob = Math.sin(this.tick / 15 + l.x) * 3, sh = l.shake ? Math.sin(l.shake) * 4 : 0;
      c.fillStyle = l.shake ? '#fecaca' : '#fff'; c.strokeStyle = '#7c3aed'; c.lineWidth = 3;
      c.beginPath(); c.arc(l.x * T + sh, l.y * T + bob, 15, 0, 7); c.fill(); c.stroke();
      c.fillStyle = '#4c1d95'; c.font = 'bold 20px Fredoka, Arial'; c.textAlign = 'center'; c.textBaseline = 'middle';
      c.fillText(l.ch, l.x * T + sh, l.y * T + bob + 1);
    }
    // enemies
    for (const e of this.enemies) {
      if (!e.alive && e.squish > 25) continue;
      this.drawEnemy(c, e);
    }
    // hero
    if (!(p.inv && Math.floor(p.inv / 5) % 2)) drawHero(c, p.x + p.w / 2, p.y + p.h, { face: p.face, frame: p.frame, look: this.look, air: !p.ground });
    for (const q of this.parts) { c.globalAlpha = Math.min(1, q.life / 20); c.fillStyle = q.color; c.fillRect(q.x - 3, q.y - 3, 6, 6); }
    c.globalAlpha = 1;
    c.font = 'bold 16px Fredoka, Arial'; c.textAlign = 'center';
    for (const q of this.popups) { c.globalAlpha = Math.min(1, q.life / 20); c.fillStyle = '#fff'; c.strokeStyle = '#000'; c.lineWidth = 3; c.strokeText(q.text, q.x, q.y); c.fillText(q.text, q.x, q.y); }
    c.globalAlpha = 1;
    c.restore();
  }
  drawBack(c, camX, vw, vh) {
    const th = this.th, theme = this.L.theme;
    // far layer
    c.fillStyle = th.far;
    for (let i = -1; i < vw / 240 + 2; i++) {
      const bx = i * 240 - (camX * 0.2) % 240;
      c.beginPath();
      if (theme === 'snow' || theme === 'castle') { c.moveTo(bx, vh * 0.75); c.lineTo(bx + 120, vh * 0.3); c.lineTo(bx + 240, vh * 0.75); }
      else if (theme === 'cave') { c.moveTo(bx + 40, 0); c.lineTo(bx + 70, vh * 0.25); c.lineTo(bx + 100, 0); c.moveTo(bx + 160, 0); c.lineTo(bx + 180, vh * 0.15); c.lineTo(bx + 200, 0); }
      else c.ellipse(bx + 120, vh * 0.78, 150, 110, 0, Math.PI, 0);
      c.fill();
      if (theme === 'snow') { c.fillStyle = '#fff'; c.beginPath(); c.moveTo(bx + 90, vh * 0.42); c.lineTo(bx + 120, vh * 0.3); c.lineTo(bx + 150, vh * 0.42); c.fill(); c.fillStyle = th.far; }
    }
    // clouds / stars
    if (theme === 'cave' || theme === 'castle') {
      c.fillStyle = 'rgba(255,255,255,.6)';
      for (let i = 0; i < 30; i++) { const sx = ((i * 137 - camX * 0.05) % (vw + 20) + vw + 20) % (vw + 20), sy = (i * 53) % (vh * 0.6); c.fillRect(sx, sy, 2, 2); }
      if (theme === 'castle') { c.fillStyle = '#fef3c7'; c.beginPath(); c.arc(vw * 0.8, 60, 26, 0, 7); c.fill(); }
    } else {
      c.fillStyle = 'rgba(255,255,255,.9)';
      for (let i = 0; i < 6; i++) { const cx = ((i * 190 - camX * 0.35) % (vw + 200) + vw + 200) % (vw + 200) - 100, cy = 40 + (i * 37) % 90; c.beginPath(); c.arc(cx, cy, 18, 0, 7); c.arc(cx + 20, cy - 8, 22, 0, 7); c.arc(cx + 42, cy, 17, 0, 7); c.fill(); }
      if (theme === 'desert') { c.fillStyle = '#fff7d6'; c.beginPath(); c.arc(vw * 0.82, 60, 30, 0, 7); c.fill(); }
    }
    // near layer
    c.fillStyle = th.near;
    for (let i = -1; i < vw / 160 + 2; i++) {
      const bx = i * 160 - (camX * 0.5) % 160;
      c.beginPath();
      if (theme === 'castle') { c.rect(bx + 30, vh * 0.55, 50, vh); for (let k = 0; k < 3; k++) c.rect(bx + 30 + k * 20, vh * 0.55 - 10, 10, 10); }
      else if (theme === 'desert') { c.fillStyle = '#4d7c0f'; c.rect(bx + 80, vh * 0.62, 10, 60); c.rect(bx + 70, vh * 0.66, 10, 6); c.rect(bx + 70, vh * 0.6, 6, 12); c.fill(); c.fillStyle = th.near; c.beginPath(); c.ellipse(bx + 80, vh * 0.85, 120, 40, 0, Math.PI, 0); }
      else if (theme === 'grass') { c.ellipse(bx + 80, vh * 0.85, 90, 70, 0, Math.PI, 0); c.fill(); c.fillStyle = '#2f855a'; c.beginPath(); c.rect(bx + 30, vh * 0.62, 6, 40); c.fill(); c.fillStyle = '#38a169'; c.beginPath(); c.arc(bx + 33, vh * 0.6, 16, 0, 7); c.fill(); c.fillStyle = th.near; c.beginPath(); }
      else c.ellipse(bx + 80, vh * 0.88, 90, 60, 0, Math.PI, 0);
      c.fill();
    }
  }
  drawTile(c, tt, x, y, tx, ty) {
    const th = this.th;
    if (tt === 1) {
      const top = ty === 0 || this.tile(tx, ty - 1) !== 1;
      c.fillStyle = (tx + ty) % 2 ? th.dirt : th.dirt2; c.fillRect(x, y, T, T);
      c.fillStyle = 'rgba(0,0,0,.08)'; c.fillRect(x + 6, y + 14, 5, 5); c.fillRect(x + 20, y + 22, 4, 4);
      if (top) { c.fillStyle = th.top; c.fillRect(x, y, T, 9); c.beginPath(); for (let i = 0; i < 4; i++) c.arc(x + 4 + i * 8, y + 9, 4, 0, Math.PI); c.fill(); }
    } else if (tt === BRICK) {
      c.fillStyle = th.brick; c.fillRect(x, y, T, T); c.strokeStyle = 'rgba(0,0,0,.25)'; c.lineWidth = 2;
      c.strokeRect(x + 1, y + 1, T - 2, T - 2); c.beginPath(); c.moveTo(x, y + 16); c.lineTo(x + T, y + 16); c.moveTo(x + 16, y); c.lineTo(x + 16, y + 16); c.moveTo(x + 8, y + 16); c.lineTo(x + 8, y + T); c.moveTo(x + 24, y + 16); c.lineTo(x + 24, y + T); c.stroke();
    } else if (tt === QBLOCK) {
      const pulse = 0.85 + Math.sin(this.tick / 10) * 0.15;
      c.fillStyle = '#7c3aed'; rr(c, x + 1, y + 1, T - 2, T - 2, 6); c.fill();
      c.fillStyle = `rgba(255,255,255,${0.25 * pulse})`; rr(c, x + 4, y + 4, T - 8, 8, 3); c.fill();
      c.fillStyle = '#fde047'; c.font = 'bold 22px Fredoka, Arial'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('?', x + T / 2, y + T / 2 + 2);
    } else if (tt === USED) {
      c.fillStyle = '#a78b6d'; rr(c, x + 1, y + 1, T - 2, T - 2, 6); c.fill(); c.fillStyle = '#8b6f52'; c.fillRect(x + 8, y + 14, 16, 4);
    } else if (tt === STONE) {
      c.fillStyle = th.stone; rr(c, x + 1, y + 1, T - 2, T - 2, 5); c.fill(); c.fillStyle = 'rgba(255,255,255,.25)'; c.fillRect(x + 4, y + 4, T - 8, 4); c.fillStyle = 'rgba(0,0,0,.15)'; c.fillRect(x + 4, y + T - 7, T - 8, 3);
    } else if (tt === GATE) {
      c.fillStyle = '#6d28d9'; c.fillRect(x + 4, y, T - 8, T); c.fillStyle = '#a78bfa'; c.fillRect(x + 8, y, 4, T); c.fillRect(x + 20, y, 4, T);
      if (ty === GROUND - 2) { c.fillStyle = '#fde047'; c.beginPath(); c.arc(x + T / 2, y + T / 2, 10, 0, 7); c.fill(); c.fillStyle = '#6d28d9'; c.font = 'bold 13px Fredoka, Arial'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('ABC', x + T / 2, y + T / 2 + 1); }
    } else if (tt === DOOR) {
      c.fillStyle = '#57534e'; c.fillRect(x, y, T, T); c.strokeStyle = '#292524'; c.lineWidth = 2; c.strokeRect(x + 1, y + 1, T - 2, T - 2);
      if (ty === GROUND - 2) { c.fillStyle = '#f97316'; c.beginPath(); c.arc(x + T / 2, y + T / 2, 12, 0, 7); c.fill(); c.font = '16px serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('🎤', x + T / 2, y + T / 2 + 1); }
    }
  }
  drawFlag(c, x, y, on) {
    c.fillStyle = '#e5e7eb'; c.fillRect(x, y - 64, 3, 64);
    c.fillStyle = on ? '#22c55e' : '#9ca3af'; c.beginPath(); c.moveTo(x + 3, y - 64); c.lineTo(x + 24, y - 56); c.lineTo(x + 3, y - 48); c.fill();
  }
  drawGoal(c, x, y) {
    const t = this.tick / 20;
    c.save(); c.translate(x, y - 70);
    for (let i = 0; i < 3; i++) { c.strokeStyle = ['#f472b6', '#facc15', '#38bdf8'][i]; c.lineWidth = 5; c.beginPath(); c.ellipse(0, 0, 26 - i * 7, 50 - i * 12, 0, t + i, t + i + Math.PI * 1.6); c.stroke(); }
    c.fillStyle = '#facc15'; c.font = '28px serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('⭐', 0, Math.sin(t * 2) * 5);
    c.restore();
  }
  drawEnemy(c, e) {
    const sq = e.alive ? 0 : Math.min(1, e.squish / 6), x = e.x + e.w / 2, y = e.y + e.h;
    const hgt = e.h * (1 - sq * 0.7), bob = e.alive ? Math.abs(Math.sin(this.tick / 6)) * 2 : 0;
    c.fillStyle = this.th.enemy; c.beginPath(); c.ellipse(x, y - hgt / 2 - bob, e.w / 2 + sq * 4, hgt / 2, 0, 0, 7); c.fill();
    c.fillStyle = '#111'; c.fillRect(x - 11, y - 3, 8, 3); c.fillRect(x + 3, y - 3, 8, 3);
    if (e.alive) {
      const d = e.vx < 0 ? -2 : 2;
      c.fillStyle = '#fff'; c.beginPath(); c.arc(x - 5 + d, y - hgt * 0.6 - bob, 4.5, 0, 7); c.arc(x + 5 + d, y - hgt * 0.6 - bob, 4.5, 0, 7); c.fill();
      c.fillStyle = '#111'; c.beginPath(); c.arc(x - 5 + d * 1.5, y - hgt * 0.6 - bob, 2, 0, 7); c.arc(x + 5 + d * 1.5, y - hgt * 0.6 - bob, 2, 0, 7); c.fill();
      c.strokeStyle = '#111'; c.lineWidth = 2; c.beginPath(); c.moveTo(x - 9, y - hgt * 0.85 - bob); c.lineTo(x - 2, y - hgt * 0.75 - bob); c.moveTo(x + 9, y - hgt * 0.85 - bob); c.lineTo(x + 2, y - hgt * 0.75 - bob); c.stroke();
    }
  }
}
