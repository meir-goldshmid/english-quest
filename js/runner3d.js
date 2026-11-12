// 3D lane runner (Three.js, loaded on demand). Answer questions by running through the right gate.
// runRunner3D(host, questions, { theme, speed, look, neon, onExit, onAnswer }) → Promise<{ score, right, total, bestCombo, medal, ratio }>
// question: { prompt: { text, em, node, audio: [text, lang] }, options: [3 labels], a: index of the right one, item, say }
// onAnswer(question, ok) lets the caller grade the answer (spaced repetition lives outside the runner).
import { h } from './ui.js';
import { say, sfx, stop } from './audio.js';
import { medalFor } from './rush.js';

const THREE_URL = 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
const LANES = [-2.4, 0, 2.4];
const THEMES3D = {
  grass: { sky: 0x8fd3ff, fog: 0xcdeeff, ground: 0x6cc56c, track: '#c98b4b', decor: 'tree' },
  desert: { sky: 0xffcf8a, fog: 0xffe9c2, ground: 0xe8c07a, track: '#c98d3c', decor: 'cactus' },
  snow: { sky: 0xa9d8ff, fog: 0xeef8ff, ground: 0xf4f9ff, track: '#7dc3e8', decor: 'pine' },
  cave: { sky: 0x261b3d, fog: 0x2e2350, ground: 0x3f3066, track: '#5b4a85', decor: 'crystal' },
  sky: { sky: 0x9fdcff, fog: 0xffe6f7, ground: 0xffffff, track: '#f9a8d4', decor: 'cloud' },
  castle: { sky: 0x3a1f4a, fog: 0x5d2f5e, ground: 0x4b5563, track: '#6b7280', decor: 'tower' },
};

let THREE = null;
async function loadThree() { if (!THREE) THREE = await import(THREE_URL); return THREE; }

function labelTexture(text, { neon, w = 512, hgt = 200 } = {}) {
  const cv = document.createElement('canvas'); cv.width = w; cv.height = hgt;
  const c = cv.getContext('2d');
  const r = 40;
  c.fillStyle = neon ? '#0b1020' : '#ffffff';
  c.beginPath(); c.moveTo(r, 0); c.arcTo(w, 0, w, hgt, r); c.arcTo(w, hgt, 0, hgt, r); c.arcTo(0, hgt, 0, 0, r); c.arcTo(0, 0, w, 0, r); c.fill();
  c.lineWidth = 12; c.strokeStyle = neon ? '#22d3ee' : '#7c3aed'; c.stroke();
  c.fillStyle = neon ? '#e8ecff' : '#1f2547';
  c.textAlign = 'center'; c.textBaseline = 'middle';
  const he = /[א-ת]/.test(text);
  c.direction = he ? 'rtl' : 'ltr';
  let size = 96;
  do { c.font = `bold ${size}px Rubik, Fredoka, "Segoe UI Emoji", "Apple Color Emoji", Arial, sans-serif`; size -= 4; } while (c.measureText(text).width > w - 50 && size > 28);
  c.fillText(text, w / 2, hgt / 2 + 4);
  const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4;
  return t;
}

export async function runRunner3D(host, questions, { theme = 'grass', speed = 12, look, neon = false, onExit, onAnswer } = {}) {
  host.innerHTML = '';
  const loading = h('div.r3-loading', {}, h('div.big-emoji', {}, '🏃‍♂️'), h('b', {}, 'טוען עולם תלת-ממדי...'));
  host.append(loading);
  try { await loadThree(); } catch (e) {
    loading.innerHTML = ''; loading.append(h('div.big-emoji', {}, '📡'), h('b', {}, 'לא הצלחנו לטעון את מצב התלת-ממד (צריך אינטרנט).'), h('button.btn.primary', { onclick: () => onExit?.() }, 'חזרה'));
    return new Promise(() => { });
  }
  return new Promise(resolve => {
    const TH = THEMES3D[theme] || THEMES3D.grass;
    const low = (navigator.hardwareConcurrency || 4) <= 4 || Math.min(screen.width, screen.height) < 400;
    // ---------- DOM: canvas + HUD
    const cv = h('canvas.r3-canvas');
    const promptEl = h('div.r3-prompt.hidden');
    const scoreEl = h('b.r-score', {}, '0'), comboEl = h('span.r-combo'), heartsEl = h('span.pill.r3-hearts'), qEl = h('span.r3-q');
    const toastEl = h('div.r3-toast.hidden');
    const hud = h('div.r3-hud', {},
      h('button.btn.round.sm.exit', { onclick: () => { finish(true); onExit?.(); } }, '✕'),
      heartsEl, qEl, h('div.r-pts', {}, scoreEl, h('small', {}, 'pts')), comboEl);
    const help = h('div.r3-help', {}, '← → לעבור מסלול · רווח / ↑ לקפוץ · בטלפון: החלקה');
    host.innerHTML = '';
    host.append(h('div.r3', {}, cv, hud, promptEl, toastEl, help));
    setTimeout(() => help.classList.add('fade'), 5000);

    // ---------- three.js scene
    const renderer = new THREE.WebGLRenderer({ canvas: cv, antialias: !low, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(low ? 1 : 1.5, devicePixelRatio || 1));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(TH.sky);
    scene.fog = new THREE.Fog(TH.fog, 30, 120);
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 200);
    camera.position.set(0, 4.4, 7.8); camera.lookAt(0, 1, -8);
    scene.add(new THREE.HemisphereLight(0xffffff, neon ? 0x223355 : 0x667744, neon ? 1.0 : 1.2));
    const sun = new THREE.DirectionalLight(0xffffff, neon ? 0.8 : 1.4); sun.position.set(5, 10, 6); scene.add(sun);

    const mat = (color, extra = {}) => new THREE.MeshLambertMaterial({ color, ...extra });
    const glow = color => new THREE.MeshBasicMaterial({ color });
    // ground + track with scrolling lane texture
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(200, 260), mat(TH.ground));
    ground.rotation.x = -Math.PI / 2; ground.position.set(0, -0.02, -100); scene.add(ground);
    const tcv = document.createElement('canvas'); tcv.width = 256; tcv.height = 256;
    const tc = tcv.getContext('2d');
    tc.fillStyle = neon ? '#141b34' : TH.track; tc.fillRect(0, 0, 256, 256);
    tc.fillStyle = neon ? 'rgba(34,211,238,.9)' : 'rgba(255,255,255,.65)';
    [85, 171].forEach(x => { tc.fillRect(x - 3, 0, 6, 110); });
    tc.fillStyle = 'rgba(0,0,0,.06)'; for (let i = 0; i < 10; i++) tc.fillRect(Math.random() * 240, Math.random() * 240, 18, 6);
    const trackTex = new THREE.CanvasTexture(tcv); trackTex.wrapS = trackTex.wrapT = THREE.RepeatWrapping; trackTex.repeat.set(1, 26); trackTex.colorSpace = THREE.SRGBColorSpace;
    const track = new THREE.Mesh(new THREE.PlaneGeometry(7.6, 260), new THREE.MeshLambertMaterial({ map: trackTex }));
    track.rotation.x = -Math.PI / 2; track.position.set(0, 0, -100); scene.add(track);
    if (neon) [-3.85, 3.85].forEach(x => { const edge = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.08, 260), glow(x < 0 ? 0x22d3ee : 0xe879f9)); edge.position.set(x, 0.04, -100); scene.add(edge); });

    // ---------- hero (low-poly version of the 2D hero)
    const hero = new THREE.Group();
    const L = neon ? { hoodie: '#1e293b', cap: '#22d3ee' } : (look || { hoodie: '#ff7a1a', cap: '#2463eb' });   // teens get a sleek dark suit
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.85, 0.5), mat(L.hoodie)); body.position.y = 1.05;
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.34, 16, 12), mat(0xf2c39b)); head.position.y = 1.8;
    const cap = new THREE.Mesh(new THREE.SphereGeometry(0.36, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), mat(L.cap)); cap.position.y = 1.86;
    const brim = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.05, 0.3), mat(L.cap)); brim.position.set(0, 1.86, -0.36);
    const pack = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.6, 0.25), mat(L.cap)); pack.position.set(0, 1.1, 0.35);
    const legL = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.6, 0.28), mat(0x1e3a8a)); legL.position.set(-0.2, 0.32, 0);
    const legR = legL.clone(); legR.position.x = 0.2;
    const armL = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.6, 0.2), mat(L.hoodie)); armL.position.set(-0.52, 1.05, 0);
    const armR = armL.clone(); armR.position.x = 0.52;
    hero.add(body, head, cap, brim, pack, legL, legR, armL, armR);
    if (neon) { const ring = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.05, 8, 32), glow(0x22d3ee)); ring.rotation.x = Math.PI / 2; ring.position.y = 0.05; hero.add(ring); }
    scene.add(hero);
    const shadow = new THREE.Mesh(new THREE.CircleGeometry(0.55, 20), new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.25 }));
    shadow.rotation.x = -Math.PI / 2; shadow.position.y = 0.01; scene.add(shadow);

    // ---------- reusable geometries
    const G = {
      coin: new THREE.CylinderGeometry(0.35, 0.35, 0.08, 18),
      crate: new THREE.BoxGeometry(1.6, 1.6, 1.6),
      bar: new THREE.BoxGeometry(2.0, 0.55, 0.4),
      post: new THREE.BoxGeometry(0.22, 3.0, 0.22),
      beam: new THREE.BoxGeometry(2.3, 0.22, 0.22),
      trunk: new THREE.CylinderGeometry(0.18, 0.25, 1.2, 6),
      crown: new THREE.IcosahedronGeometry(1.0, 0),
      cone: new THREE.ConeGeometry(0.9, 2.4, 7),
      crystal: new THREE.OctahedronGeometry(0.8, 0),
      cloud: new THREE.IcosahedronGeometry(1.2, 0),
      tower: new THREE.CylinderGeometry(0.8, 0.9, 4, 8),
      roof: new THREE.ConeGeometry(1.0, 1.4, 8),
      label: new THREE.PlaneGeometry(2.2, 0.86),
    };
    const M = {
      coin: new THREE.MeshLambertMaterial({ color: 0xfacc15, emissive: 0x7a5a00 }),
      crate: mat(neon ? 0x1c2547 : 0xb7793e), crateEdge: glow(0xe879f9),
      bar: mat(neon ? 0xe879f9 : 0xef4444), barStripe: mat(0xffffff),
      post: neon ? glow(0x22d3ee) : mat(0x7c3aed), wrong: mat(0xef4444), right: mat(0x22c55e),
      trunk: mat(0x8b5a2b), leaf: mat(0x2f9e44), cactus: mat(0x4d7c0f), pine: mat(0x1f6f4a), snowcap: mat(0xffffff),
      crystal: new THREE.MeshLambertMaterial({ color: 0xa78bfa, emissive: 0x3b1d7a }), cloud: mat(0xffffff), tower: mat(0x9ca3af), roof: mat(0xb91c1c),
    };

    const things = [];   // { obj, z, kind, lane, ... } moving toward the camera
    const add = (obj, z, data) => { obj.position.z = z; scene.add(obj); const t = { obj, z, ...data }; things.push(t); return t; };
    function decor(z) {
      for (const side of [-1, 1]) {
        if (Math.random() < (low ? 0.45 : 0.75)) continue;
        const g = new THREE.Group(), x = side * (6 + Math.random() * 10);
        if (TH.decor === 'tree') { const t = new THREE.Mesh(G.trunk, M.trunk); t.position.y = 0.6; const c = new THREE.Mesh(G.crown, M.leaf); c.position.y = 1.8; g.add(t, c); }
        else if (TH.decor === 'cactus') { const c = new THREE.Mesh(G.trunk, M.cactus); c.scale.set(1.4, 2, 1.4); c.position.y = 1.2; g.add(c); }
        else if (TH.decor === 'pine') { const c = new THREE.Mesh(G.cone, M.pine); c.position.y = 1.2; const s = new THREE.Mesh(G.cone, M.snowcap); s.scale.set(0.45, 0.35, 0.45); s.position.y = 2.2; g.add(c, s); }
        else if (TH.decor === 'crystal') { const c = new THREE.Mesh(G.crystal, M.crystal); c.scale.y = 1.8; c.position.y = 1.2; g.add(c); }
        else if (TH.decor === 'cloud') { const c = new THREE.Mesh(G.cloud, M.cloud); c.position.y = 0.5 + Math.random() * 2; c.scale.set(1.6, 0.8, 1); g.add(c); }
        else { const t = new THREE.Mesh(G.tower, M.tower); t.position.y = 2; const r = new THREE.Mesh(G.roof, M.roof); r.position.y = 4.7; g.add(t, r); }
        g.position.x = x; g.rotation.y = Math.random() * 3;
        add(g, z, { kind: 'decor' });
      }
    }
    function coins(lane, z, n = 5, arc = false) {
      for (let i = 0; i < n; i++) {
        const c = new THREE.Group(), disc = new THREE.Mesh(G.coin, M.coin); disc.rotation.x = Math.PI / 2; c.add(disc);   // face the camera, spin around the vertical axis
        c.position.set(LANES[lane], 0.9 + (arc ? Math.sin(i / (n - 1) * Math.PI) * 1.6 : 0), 0);
        add(c, z - i * 2.2, { kind: 'coin', lane });
      }
    }
    function obstaclePattern(z) {
      const r = Math.random();
      if (r < 0.4) {                                      // one crate, coins in another lane
        const lane = Math.floor(Math.random() * 3), cr = new THREE.Mesh(G.crate, M.crate);
        cr.position.set(LANES[lane], 0.8, 0);
        if (neon) { const e = new THREE.LineSegments(new THREE.EdgesGeometry(G.crate), new THREE.LineBasicMaterial({ color: 0xe879f9 })); cr.add(e); }
        add(cr, z, { kind: 'crate', lane });
        coins((lane + 1 + Math.floor(Math.random() * 2)) % 3, z + 4);
      } else if (r < 0.75) {                              // low bar: jump it (coins arc over it)
        const lane = Math.floor(Math.random() * 3), b = new THREE.Group();
        const bar = new THREE.Mesh(G.bar, M.bar); bar.position.y = 0.4; b.add(bar);
        const st = new THREE.Mesh(new THREE.BoxGeometry(2.02, 0.12, 0.42), M.barStripe); st.position.y = 0.45; b.add(st);
        b.position.x = LANES[lane];
        add(b, z, { kind: 'bar', lane });
        coins(lane, z + 4, 5, true);
      } else {                                            // two crates, one free lane
        const free = Math.floor(Math.random() * 3);
        [0, 1, 2].filter(l => l !== free).forEach(l => { const cr = new THREE.Mesh(G.crate, M.crate); cr.position.set(LANES[l], 0.8, 0); add(cr, z, { kind: 'crate', lane: l }); });
        coins(free, z + 2, 4);
      }
    }
    function gate(q, z) {
      const g = new THREE.Group(), arches = [];
      LANES.forEach((x, i) => {
        const a = new THREE.Group();
        const p1 = new THREE.Mesh(G.post, M.post); p1.position.set(-1.1, 1.5, 0);
        const p2 = p1.clone(); p2.position.x = 1.1;
        const beam = new THREE.Mesh(G.beam, M.post); beam.position.y = 3.0;
        const lab = new THREE.Mesh(G.label, new THREE.MeshBasicMaterial({ map: labelTexture(String(q.options[i]), { neon }), transparent: true }));
        lab.position.set(0, 3.65, 0.05);
        a.add(p1, p2, beam, lab); a.position.x = x; g.add(a); arches.push({ a, posts: [p1, p2, beam] });
      });
      return add(g, z, { kind: 'gate', q, arches });
    }

    // ---------- state
    let score = 0, combo = 0, best = 0, right = 0, asked = 0, hearts = 3, inv = 0;
    let lane = 1, x = 0, y = 0, vy = 0, t = 0, dist = 0, nextObstacle = 40, nextDecor = 0, gateActive = null, qi = 0, finished = false, finishLine = null;
    let v = speed;
    const total = questions.length;
    const updHud = () => {
      scoreEl.textContent = score; heartsEl.textContent = '❤️'.repeat(hearts) + '🤍'.repeat(Math.max(0, 3 - hearts));
      qEl.textContent = `${Math.min(asked + (gateActive ? 1 : 0), total)}/${total}`;
      const mult = Math.min(4, 1 + Math.floor(combo / 2)); comboEl.textContent = combo >= 2 ? `🔥 x${mult}` : '';
    };
    const toast = (txt, ok) => { toastEl.textContent = txt; toastEl.className = 'r3-toast ' + (ok ? 'ok' : 'bad'); clearTimeout(toast.t); toast.t = setTimeout(() => toastEl.classList.add('hidden'), ok ? 900 : 2200); };
    const showPrompt = q => {
      promptEl.innerHTML = '';
      promptEl.append(...[q.prompt.em ? h('span.r3-em', {}, q.prompt.em) : null, q.prompt.node || null, q.prompt.text ? h('span.r3-text', { dir: /[א-ת]/.test(q.prompt.text) ? 'rtl' : 'ltr' }, q.prompt.text) : null,
        q.prompt.audio ? h('button.btn.round.sm', { onclick: () => say(...q.prompt.audio) }, '🔊') : null].filter(Boolean));
      promptEl.classList.remove('hidden');
      if (q.prompt.audio) say(...q.prompt.audio);
    };
    updHud();

    // ---------- input
    const left = () => { lane = Math.max(0, lane - 1); }, rightL = () => { lane = Math.min(2, lane + 1); };
    const jump = () => { if (y <= 0.001) { vy = 9.5; sfx('jump'); } };
    const onKey = e => {
      if (e.repeat) return;
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') left();
      else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') rightL();
      else if (e.key === 'ArrowUp' || e.key === ' ' || e.key === 'w' || e.key === 'W') jump();
      else return;
      e.preventDefault();
    };
    let sx = 0, sy = 0, st0 = 0;
    const onDown = e => { sx = e.clientX; sy = e.clientY; st0 = performance.now(); };
    const onUp = e => {
      const dx = e.clientX - sx, dy = e.clientY - sy;
      if (Math.abs(dx) > 30 && Math.abs(dx) > Math.abs(dy)) (dx < 0 ? left : rightL)();
      else if (dy < -30 || performance.now() - st0 < 250) jump();
    };
    addEventListener('keydown', onKey); cv.addEventListener('pointerdown', onDown); cv.addEventListener('pointerup', onUp);
    const resize = () => { const r = host.getBoundingClientRect(); renderer.setSize(r.width, r.height, false); camera.aspect = r.width / r.height; camera.fov = r.width < r.height ? 75 : 60; camera.updateProjectionMatrix(); };
    resize(); addEventListener('resize', resize);

    // ---------- loop
    let last = performance.now(), raf = 0, shake = 0;
    function loop(now) {
      const dt = Math.min(0.05, (now - last) / 1000); last = now; t += dt;
      if (!finished) step(dt);
      // camera follows lane a little, with shake on hits
      camera.position.x += ((x * 0.35) - camera.position.x) * Math.min(1, dt * 5) + (shake > 0 ? (Math.random() - 0.5) * shake : 0);
      shake = Math.max(0, shake - dt * 2);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    }
    function step(dt) {
      v = Math.min(speed * 1.4, v + dt * 0.12);
      const dz = v * dt; dist += dz;
      trackTex.offset.y += dz / 10;
      // hero
      x += (LANES[lane] - x) * Math.min(1, dt * 12);
      vy -= 26 * dt; y = Math.max(0, y + vy * dt); if (y === 0) vy = Math.max(0, vy);
      hero.position.set(x, y, 0); hero.rotation.z = (LANES[lane] - x) * -0.12;
      const sw = y > 0 ? 0.6 : Math.sin(t * v * 0.9) * 0.7;
      legL.rotation.x = sw; legR.rotation.x = -sw; armL.rotation.x = -sw; armR.rotation.x = sw;
      shadow.position.x = x; shadow.scale.setScalar(1 - Math.min(0.5, y / 4));
      if (inv > 0) { inv -= dt; hero.visible = Math.floor(inv * 10) % 2 === 0; } else hero.visible = true;
      // spawn
      if (dist > nextDecor) { decor(-120); nextDecor = dist + 6; }
      if (!gateActive && qi < total && !finishLine) { gateActive = gate(questions[qi], -110); showPrompt(questions[qi]); qi++; updHud(); }
      if (!gateActive && qi >= total && !finishLine) {
        const fl = new THREE.Group();
        for (let i = 0; i < 8; i++) { const c = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.95, 0.1), mat(i % 2 ? 0x111111 : 0xffffff)); c.position.set(-3.33 + i * 0.95, 3.2, 0); fl.add(c); }
        [-3.9, 3.9].forEach(px => { const p = new THREE.Mesh(G.post, M.post); p.position.set(px, 1.5, 0); p.scale.y = 1.15; fl.add(p); });
        finishLine = add(fl, -60, { kind: 'finish' });
        promptEl.classList.add('hidden');
      }
      if (dist > nextObstacle) {
        const gz = gateActive ? gateActive.z : -999;
        if (Math.abs(-118 - gz) > 24 && !finishLine) obstaclePattern(-118);
        nextObstacle = dist + 16 + Math.random() * 10 - Math.min(6, v - speed);
      }
      // move & collide
      for (const o of things) {
        o.z += dz; o.obj.position.z = o.z;
        if (o.kind === 'coin') { o.obj.rotation.y += dt * 4; if (!o.hit && Math.abs(o.z) < 0.6 && Math.abs(LANES[o.lane] - x) < 0.9 && Math.abs(o.obj.position.y - (y + 1)) < 1.1) { o.hit = true; o.obj.visible = false; score += 10; sfx('coin'); updHud(); } }
        else if ((o.kind === 'crate' || o.kind === 'bar') && !o.hit && Math.abs(o.z) < 0.9 && Math.abs(LANES[o.lane] - x) < 1.2) {
          const clears = o.kind === 'bar' && y > 0.75;
          if (!clears && inv <= 0) { o.hit = true; hearts--; inv = 1.5; shake = 0.6; v *= 0.8; sfx('hurt'); updHud(); if (hearts <= 0) return finish(false); }
        } else if (o.kind === 'gate' && !o.done && o.z > -0.2) resolveGate(o);
        else if (o.kind === 'finish' && o.z > 0) { sfx('win'); return finish(false); }
        else if (o.kind === 'gate' && o.done && o.flash > 0) { o.flash -= dt; }
      }
      for (let i = things.length - 1; i >= 0; i--) if (things[i].z > 12) { scene.remove(things[i].obj); things.splice(i, 1); }
    }
    function resolveGate(o) {
      o.done = true; gateActive = null; asked++;
      const q = o.q, chosen = Math.round((x - LANES[0]) / (LANES[1] - LANES[0])), ok = chosen === q.a;
      o.arches[q.a].posts.forEach(p => { p.material = M.right; });
      if (!ok && o.arches[chosen]) o.arches[chosen].posts.forEach(p => { p.material = M.wrong; });
      onAnswer?.(q, ok);
      if (ok) {
        combo++; best = Math.max(best, combo); right++;
        const pts = 100 * Math.min(4, 1 + Math.floor(combo / 2)); score += pts;
        sfx('good'); toast(`+${pts} ✓`, true);
        if (q.say) say(...q.say);
      } else {
        combo = 0; shake = 0.4; sfx('bad');
        toast(`✗ ${q.options[q.a]}${q.hint ? ' · ' + q.hint : ''}`, false);
        if (q.say) say(...q.say);
      }
      promptEl.classList.add('hidden');
      updHud();
    }
    function finish(quit) {
      if (finished) return; finished = true;
      cancelAnimationFrame(raf); stop();
      removeEventListener('keydown', onKey); removeEventListener('resize', resize);
      setTimeout(() => { renderer.dispose(); things.length = 0; }, 50);
      if (quit) return;
      const ratio = right / Math.max(1, total);
      resolve({ score, right, total, bestCombo: best, medal: medalFor(ratio), ratio });
    }
    raf = requestAnimationFrame(loop);
  });
}
