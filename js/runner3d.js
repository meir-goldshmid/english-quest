// 3D lane runner (Three.js r160, loaded on demand). Run through the portal with the right answer.
// runRunner3D(host, questions, { theme, speed, look, neon, endless, music, best, onExit, onAnswer })
//   → Promise<{ score, right, total, bestCombo, medal, ratio, distance }>
// question: { prompt: { text, em, node, audio: [text, lang] }, options: [3 labels], a: index of the right one, item, say, hint }
// onAnswer(question, ok) lets the caller grade the answer (spaced repetition lives outside the runner).
import { h } from './ui.js';
import { say, sfx, stop } from './audio.js';
import { medalFor } from './rush.js';

const THREE_URL = 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
const LANES = [-2.4, 0, 2.4];
const THEMES3D = {
  grass: { top: 0x3fa9f5, horizon: 0xc9f0ff, fog: 0xc9f0ff, ground: 0x5fbf5f, ground2: 0x52ad52, track: '#c98b4b', track2: '#b97a3c', decor: 'tree', sun: 0xfff3b0, night: false },
  desert: { top: 0xff9a3c, horizon: 0xffe3b0, fog: 0xffe3b0, ground: 0xe8c07a, ground2: 0xdcb36b, track: '#b9773a', track2: '#a86a30', decor: 'cactus', sun: 0xffffff, night: false },
  snow: { top: 0x5aaef0, horizon: 0xeef8ff, fog: 0xeef8ff, ground: 0xf5faff, ground2: 0xe6f1fb, track: '#6fb6e0', track2: '#5aa6d4', decor: 'pine', sun: 0xffffff, night: false },
  cave: { top: 0x120c24, horizon: 0x3a2a63, fog: 0x2a1f4a, ground: 0x332654, ground2: 0x2c2149, track: '#4b3b78', track2: '#43346c', decor: 'crystal', sun: 0xc4b5fd, night: true },
  sky: { top: 0x7cc8ff, horizon: 0xffe0f3, fog: 0xffe0f3, ground: 0xffffff, ground2: 0xfdf2f8, track: '#f9a8d4', track2: '#f472b6', decor: 'cloud', sun: 0xfff7d6, night: false },
  castle: { top: 0x1b0f2e, horizon: 0x6b2f63, fog: 0x4a2550, ground: 0x4b5563, ground2: 0x434b58, track: '#6b7280', track2: '#5d6470', decor: 'tower', sun: 0xfef3c7, night: true },
};
const POW = {
  magnet: { em: '🧲', color: 0xef4444, sec: 9, label: 'מגנט' },
  shield: { em: '🛡️', color: 0x38bdf8, sec: 0, label: 'מגן' },
  boost: { em: '⚡', color: 0xfacc15, sec: 4, label: 'טורבו' },
  double: { em: '✖2', color: 0xa855f7, sec: 10, label: 'נקודות כפולות' },
};

let THREE = null;
async function loadThree() { if (!THREE) THREE = await import(THREE_URL); return THREE; }

// ---------- canvas textures
function canvasTex(w, hgt, draw) {
  const cv = document.createElement('canvas'); cv.width = w; cv.height = hgt; draw(cv.getContext('2d'), w, hgt);
  const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t;
}
function labelTexture(text, neon) {
  return canvasTex(512, 200, (c, w, hgt) => {
    const r = 46;
    const g = c.createLinearGradient(0, 0, 0, hgt);
    if (neon) { g.addColorStop(0, '#1c2547'); g.addColorStop(1, '#0b1020'); } else { g.addColorStop(0, '#ffffff'); g.addColorStop(1, '#e9e5ff'); }
    c.fillStyle = g;
    c.beginPath(); c.moveTo(r, 6); c.arcTo(w - 6, 6, w - 6, hgt - 6, r); c.arcTo(w - 6, hgt - 6, 6, hgt - 6, r); c.arcTo(6, hgt - 6, 6, 6, r); c.arcTo(6, 6, w - 6, 6, r); c.fill();
    c.lineWidth = 10; c.strokeStyle = neon ? '#22d3ee' : '#7c3aed'; c.stroke();
    c.fillStyle = neon ? '#e8ecff' : '#1f2547'; c.textAlign = 'center'; c.textBaseline = 'middle';
    c.direction = /[א-ת]/.test(text) ? 'rtl' : 'ltr';
    let size = 104;
    do { c.font = `900 ${size}px Rubik, Fredoka, "Segoe UI Emoji", "Apple Color Emoji", Arial, sans-serif`; size -= 4; } while (c.measureText(text).width > w - 56 && size > 30);
    c.fillText(text, w / 2, hgt / 2 + 6);
  });
}
function toonGradient() {
  const t = canvasTex(4, 1, (c) => { ['#6b6b6b', '#b0b0b0', '#e6e6e6', '#ffffff'].forEach((col, i) => { c.fillStyle = col; c.fillRect(i, 0, 1, 1); }); });
  t.minFilter = t.magFilter = THREE.NearestFilter; t.colorSpace = THREE.NoColorSpace; return t;
}

export async function runRunner3D(host, questions, { theme = 'grass', speed = 12, look, neon = false, endless = false, music = true, best = 0, onExit, onAnswer } = {}) {
  host.innerHTML = '';
  const loading = h('div.r3-loading', {}, h('div.r3-spin', {}, '🏃‍♂️'), h('b', {}, 'טוען עולם תלת-ממדי...'));
  host.append(loading);
  try { await loadThree(); } catch (e) {
    loading.innerHTML = ''; loading.append(h('div.big-emoji', {}, '📡'), h('b', {}, 'לא הצלחנו לטעון את מצב התלת-ממד (צריך אינטרנט).'), h('button.btn.primary', { onclick: () => onExit?.() }, 'חזרה'));
    return new Promise(() => { });
  }
  return new Promise(resolve => {
    const TH = THEMES3D[theme] || THEMES3D.grass;
    const low = (navigator.hardwareConcurrency || 4) <= 4 || Math.min(screen.width, screen.height) < 380;

    // ---------- DOM: canvas + HUD
    const cv = h('canvas.r3-canvas');
    const promptEl = h('div.r3-prompt.hidden');
    const scoreEl = h('b.r3-score', {}, '0'), comboEl = h('span.r3-combo'), heartsEl = h('span.r3-hearts'), qEl = h('span.r3-q'), distEl = h('small.r3-dist', {}, '0m');
    const feverBar = h('div.r3-fever', {}, h('i'), h('span', {}, 'FEVER'));
    const powEl = h('div.r3-pows');
    const toastEl = h('div.r3-toast.hidden'), bigEl = h('div.r3-big.hidden'), flashEl = h('div.r3-flash');
    const popsEl = h('div.r3-pops');
    const hud = h('div.r3-hud', {},
      h('button.btn.round.sm.exit', { onclick: () => { finish(true); onExit?.(); } }, '✕'),
      heartsEl, qEl,
      h('div.r3-scorebox', {}, scoreEl, h('small', {}, best ? `שיא ${best.toLocaleString()}` : 'pts'), distEl), comboEl);
    const help = h('div.r3-help', {}, '← → מסלול · ↑ קפיצה · ↓ החלקה · בטלפון: החלקות');
    const root = h('div.r3' + (neon ? '.neon3' : ''), {}, cv, flashEl, popsEl, hud, feverBar, powEl, promptEl, toastEl, bigEl, help);
    host.innerHTML = ''; host.append(root);

    // ---------- renderer, scene, camera
    const renderer = new THREE.WebGLRenderer({ canvas: cv, antialias: !low, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(low ? 1 : 1.75, devicePixelRatio || 1));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05;
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(TH.fog, 45, 150);
    const camera = new THREE.PerspectiveCamera(62, 1, 0.1, 900);
    const CAM = { y: 4.2, z: 8.2, look: -9 };
    camera.position.set(0, 9, 18);

    // curved-world vertex bend shared by every world material
    const CURVE = { uCurveY: { value: 0.0016 }, uCurveX: { value: 0 } };
    const curve = m => {
      m.onBeforeCompile = sh => {
        Object.assign(sh.uniforms, CURVE);
        sh.vertexShader = 'uniform float uCurveY;\nuniform float uCurveX;\n' + sh.vertexShader.replace('#include <project_vertex>',
          '#include <project_vertex>\n  mvPosition.y -= mvPosition.z * mvPosition.z * uCurveY;\n  mvPosition.x += mvPosition.z * mvPosition.z * uCurveX;\n  gl_Position = projectionMatrix * mvPosition;');
      };
      return m;
    };
    const grad = toonGradient();
    const toon = (color, extra = {}) => curve(new THREE.MeshToonMaterial({ color, gradientMap: grad, ...extra }));
    const basic = (color, extra = {}) => curve(new THREE.MeshBasicMaterial({ color, ...extra }));
    const additive = (color, opacity = 0.6) => curve(new THREE.MeshBasicMaterial({ color, transparent: true, opacity, blending: THREE.AdditiveBlending, depthWrite: false }));

    // lights
    scene.add(new THREE.HemisphereLight(TH.night ? 0x8899ff : 0xffffff, TH.night ? 0x221133 : 0x667744, TH.night ? 1.2 : 1.6));
    const sun = new THREE.DirectionalLight(0xffffff, TH.night ? 1.0 : 2.0); sun.position.set(-6, 12, 8); scene.add(sun);
    const rim = new THREE.DirectionalLight(neon ? 0x22d3ee : 0xfff1d6, neon ? 1.4 : 0.8); rim.position.set(4, 4, -10); scene.add(rim);

    // sky dome (gradient) + sun / moon + stars + far mountains
    const sky = new THREE.Mesh(new THREE.SphereGeometry(700, 32, 16), new THREE.ShaderMaterial({
      side: THREE.BackSide, depthWrite: false, fog: false,
      uniforms: { top: { value: new THREE.Color(TH.top) }, bottom: { value: new THREE.Color(TH.horizon) } },
      vertexShader: 'varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
      fragmentShader: 'uniform vec3 top; uniform vec3 bottom; varying vec3 vP; void main(){ float k = smoothstep(-0.05, 0.55, vP.y); gl_FragColor = vec4(mix(bottom, top, k), 1.0); }',
    }));
    scene.add(sky);
    const sunDisc = new THREE.Mesh(new THREE.CircleGeometry(TH.night ? 14 : 22, 32), new THREE.MeshBasicMaterial({ color: TH.sun, fog: false, transparent: true, opacity: 0.95 }));
    sunDisc.position.set(70, 80, -480); scene.add(sunDisc);
    const halo = new THREE.Mesh(new THREE.CircleGeometry(50, 32), new THREE.MeshBasicMaterial({ color: TH.sun, fog: false, transparent: true, opacity: 0.18, blending: THREE.AdditiveBlending, depthWrite: false }));
    halo.position.set(70, 80, -481); scene.add(halo);
    if (TH.night || neon) {
      const sg = new THREE.BufferGeometry(), pts = [];
      for (let i = 0; i < 600; i++) { const a = Math.random() * Math.PI * 2, e = 0.1 + Math.random() * 0.9; pts.push(Math.cos(a) * Math.cos(e) * 600, Math.sin(e) * 600, Math.sin(a) * Math.cos(e) * 600 - 100); }
      sg.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
      scene.add(new THREE.Points(sg, new THREE.PointsMaterial({ color: 0xffffff, size: 2, fog: false, transparent: true, opacity: 0.85 })));
    }
    const mtnMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(TH.horizon).lerp(new THREE.Color(TH.top), 0.3), fog: false });
    for (let i = 0; i < 16; i++) {
      const m = new THREE.Mesh(new THREE.ConeGeometry(35 + Math.random() * 35, 25 + Math.random() * 45, 5), mtnMat);
      m.position.set(-330 + i * 44 + Math.random() * 20, -8, -470 - Math.random() * 60); scene.add(m);
    }

    // ground + track + curbs, scrolled by texture offset
    const hex = n => '#' + n.toString(16).padStart(6, '0');
    const groundTex = canvasTex(128, 128, (c) => { c.fillStyle = hex(TH.ground); c.fillRect(0, 0, 128, 128); c.fillStyle = hex(TH.ground2); c.fillRect(0, 0, 64, 64); c.fillRect(64, 64, 64, 64); });
    groundTex.wrapS = groundTex.wrapT = THREE.RepeatWrapping; groundTex.repeat.set(30, 40);
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(240, 320, 24, 64), toon(0xffffff, { map: groundTex }));
    ground.rotation.x = -Math.PI / 2; ground.position.set(0, -0.05, -140); scene.add(ground);
    const trackTex = canvasTex(256, 256, (c) => {
      c.fillStyle = neon ? '#141b34' : TH.track; c.fillRect(0, 0, 256, 256);
      c.fillStyle = neon ? '#101630' : TH.track2; c.fillRect(0, 0, 256, 128);
      c.fillStyle = neon ? 'rgba(34,211,238,.95)' : 'rgba(255,255,255,.8)'; [85, 171].forEach(xx => c.fillRect(xx - 3, 20, 6, 90));
    });
    trackTex.wrapS = trackTex.wrapT = THREE.RepeatWrapping; trackTex.repeat.set(1, 40);
    const track = new THREE.Mesh(new THREE.PlaneGeometry(7.6, 320, 4, 96), toon(0xffffff, { map: trackTex }));
    track.rotation.x = -Math.PI / 2; track.position.set(0, 0, -140); scene.add(track);
    const curbTex = canvasTex(64, 64, (c) => { c.fillStyle = neon ? '#22d3ee' : '#ef4444'; c.fillRect(0, 0, 64, 32); c.fillStyle = neon ? '#e879f9' : '#ffffff'; c.fillRect(0, 32, 64, 32); });
    curbTex.wrapS = curbTex.wrapT = THREE.RepeatWrapping; curbTex.repeat.set(1, 80);
    [-4.0, 4.0].forEach(cx => { const cb = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.25, 320, 1, 1, 96), neon ? basic(0xffffff, { map: curbTex }) : toon(0xffffff, { map: curbTex })); cb.position.set(cx, 0.12, -140); scene.add(cb); });

    // ---------- hero (rounded low-poly runner)
    const L = neon ? { hoodie: '#1e293b', cap: '#22d3ee' } : (look || { hoodie: '#ff7a1a', cap: '#2463eb' });
    const hero = new THREE.Group(), rig = new THREE.Group(); hero.add(rig);
    const mBody = toon(L.hoodie), mSkin = toon(0xf2c39b), mCap = toon(L.cap), mPants = toon(neon ? 0x0f172a : 0x1e3a8a), mShoe = toon(neon ? 0x22d3ee : 0xffffff);
    const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.38, 0.45, 4, 10), mBody); torso.position.y = 1.15;
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.36, 20, 14), mSkin); head.position.y = 1.95;
    const capM = new THREE.Mesh(new THREE.SphereGeometry(0.38, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2.1), mCap); capM.position.y = 2.0;
    const brim = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.05, 16, 1, false, 0, Math.PI), mCap); brim.rotation.y = Math.PI / 2; brim.position.set(0, 2.0, -0.28);
    const pack = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.62, 0.3), mCap); pack.position.set(0, 1.2, 0.36);
    const limb = (r, len, m) => { const g = new THREE.Group(), s = new THREE.Mesh(new THREE.CapsuleGeometry(r, len, 3, 8), m); s.position.y = -len / 2 - r; g.add(s); return g; };
    const armL = limb(0.11, 0.42, mBody), armR = limb(0.11, 0.42, mBody); armL.position.set(-0.5, 1.5, 0); armR.position.set(0.5, 1.5, 0);
    const legL = limb(0.14, 0.45, mPants), legR = limb(0.14, 0.45, mPants); legL.position.set(-0.2, 0.78, 0); legR.position.set(0.2, 0.78, 0);
    [legL, legR].forEach(lg => { const sh = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.14, 0.4), mShoe); sh.position.set(0, -0.72, -0.06); lg.add(sh); });
    rig.add(torso, head, capM, brim, pack, armL, armR, legL, legR);
    if (neon) { const ring = new THREE.Mesh(new THREE.TorusGeometry(0.62, 0.05, 8, 40), additive(0x22d3ee, 0.9)); ring.rotation.x = Math.PI / 2; ring.position.y = 0.06; hero.add(ring); }
    const shieldBubble = new THREE.Mesh(new THREE.SphereGeometry(1.25, 24, 16), additive(0x38bdf8, 0.22)); shieldBubble.position.y = 1.1; shieldBubble.visible = false; hero.add(shieldBubble);
    scene.add(hero);
    const blob = (r, o = 0.28) => { const m = new THREE.Mesh(new THREE.CircleGeometry(r, 20), curve(new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: o, depthWrite: false }))); m.rotation.x = -Math.PI / 2; m.position.y = 0.02; return m; };
    const heroShadow = blob(0.6); scene.add(heroShadow);

    // ---------- shared geometries / materials
    const G = {
      coin: new THREE.CylinderGeometry(0.38, 0.38, 0.1, 20), crate: new THREE.BoxGeometry(1.7, 2.2, 1.7), bar: new THREE.BoxGeometry(2.1, 0.5, 0.35),
      post: new THREE.BoxGeometry(0.25, 3.0, 0.25), beam: new THREE.BoxGeometry(2.3, 0.7, 0.4), train: new THREE.BoxGeometry(2.0, 2.6, 9),
      ring: new THREE.TorusGeometry(1.05, 0.13, 10, 40), disc: new THREE.CircleGeometry(1.0, 32), label: new THREE.PlaneGeometry(2.25, 0.88),
      orb: new THREE.IcosahedronGeometry(0.45, 1), spark: new THREE.BoxGeometry(0.14, 0.14, 0.14),
      trunk: new THREE.CylinderGeometry(0.2, 0.3, 1.4, 6), crown: new THREE.IcosahedronGeometry(1.15, 0), cone: new THREE.ConeGeometry(1.0, 2.8, 7),
      crystal: new THREE.OctahedronGeometry(0.9, 0), cloud: new THREE.IcosahedronGeometry(1.3, 1), tower: new THREE.CylinderGeometry(0.9, 1.0, 5, 8), roof: new THREE.ConeGeometry(1.15, 1.6, 8),
      flag: new THREE.BoxGeometry(0.9, 0.9, 0.1), line: new THREE.BoxGeometry(0.04, 0.04, 6), band: new THREE.BoxGeometry(1.74, 0.16, 1.74),
    };
    const M = {
      coin: toon(0xfacc15, { emissive: 0x6b4a00 }), crate: toon(neon ? 0x1c2547 : 0xc9853f), crateBand: toon(neon ? 0xe879f9 : 0x8a5a2b),
      bar: toon(0xef4444), barStripe: toon(0xffffff), beam: toon(neon ? 0xe879f9 : 0xf59e0b), train: toon(neon ? 0x1e293b : 0x2563eb), trainFront: basic(neon ? 0x22d3ee : 0xfde047), white: toon(0xffffff), black: basic(0x111111),
      ringA: basic(neon ? 0x22d3ee : 0x8b5cf6), disc: additive(neon ? 0x22d3ee : 0xc4b5fd, 0.14), right: basic(0x22c55e), wrong: basic(0xef4444), post: toon(neon ? 0x141b34 : 0x7c3aed),
      trunk: toon(0x8b5a2b), leaf: toon(0x2f9e44), leaf2: toon(0x40c057), cactus: toon(0x4d7c0f), pine: toon(0x1f6f4a), snowcap: toon(0xffffff),
      crystal: toon(0xa78bfa, { emissive: 0x4c1d95 }), crystal2: toon(0x22d3ee, { emissive: 0x0e7490 }), cloud: toon(0xffffff), tower: toon(0x9ca3af), roof: toon(0xb91c1c),
      line: new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false }),
    };
    const sparkMats = {};
    const sparkMat = c => (sparkMats[c] ||= additive(c, 0.95));

    const things = [];
    const add = (obj, z, data) => { obj.position.z = z; scene.add(obj); const o = { obj, z, ...data }; things.push(o); return o; };
    const parts = [];
    function burst(pos, color, n = 16, spread = 6) {
      for (let i = 0; i < (low ? Math.ceil(n / 2) : n); i++) {
        const p = new THREE.Mesh(G.spark, sparkMat(color)); p.position.copy(pos);
        p.userData = { v: new THREE.Vector3((Math.random() - 0.5) * spread, Math.random() * spread * 0.9, (Math.random() - 0.5) * spread), life: 0.6 + Math.random() * 0.5 };
        scene.add(p); parts.push(p);
      }
    }
    const speedLines = [];
    for (let i = 0; i < (low ? 14 : 30); i++) { const l = new THREE.Mesh(G.line, M.line); l.visible = false; scene.add(l); speedLines.push(l); }

    // ---------- world spawning
    function decor(z) {
      for (const side of [-1, 1]) {
        if (Math.random() < (low ? 0.45 : 0.2)) continue;
        const g = new THREE.Group(), sc = 0.8 + Math.random() * 0.8;
        if (TH.decor === 'tree') { const tr = new THREE.Mesh(G.trunk, M.trunk); tr.position.y = 0.7; const c = new THREE.Mesh(G.crown, Math.random() < 0.5 ? M.leaf : M.leaf2); c.position.y = 2.1; g.add(tr, c); }
        else if (TH.decor === 'cactus') { const c = new THREE.Mesh(G.trunk, M.cactus); c.scale.set(1.4, 2.2, 1.4); c.position.y = 1.5; const arm = new THREE.Mesh(G.trunk, M.cactus); arm.scale.set(0.8, 0.8, 0.8); arm.position.set(0.5, 1.8, 0); arm.rotation.z = -0.8; g.add(c, arm); }
        else if (TH.decor === 'pine') { for (let k = 0; k < 2; k++) { const c = new THREE.Mesh(G.cone, M.pine); c.position.y = 1.4 + k * 1.1; c.scale.setScalar(1 - k * 0.3); g.add(c); } const s = new THREE.Mesh(G.cone, M.snowcap); s.scale.set(0.35, 0.3, 0.35); s.position.y = 3.3; g.add(s); }
        else if (TH.decor === 'crystal') { for (let k = 0; k < 3; k++) { const c = new THREE.Mesh(G.crystal, k % 2 ? M.crystal2 : M.crystal); c.scale.set(0.6, 1.6 + Math.random(), 0.6); c.position.set((k - 1) * 0.7, 1.1, Math.random()); c.rotation.z = (k - 1) * 0.3; g.add(c); } }
        else if (TH.decor === 'cloud') { for (let k = 0; k < 3; k++) { const c = new THREE.Mesh(G.cloud, M.cloud); c.position.set((k - 1) * 1.3, 0.6 + Math.random() * 2.5, 0); c.scale.setScalar(0.7 + Math.random() * 0.5); g.add(c); } }
        else { const tw = new THREE.Mesh(G.tower, M.tower); tw.position.y = 2.5; const r = new THREE.Mesh(G.roof, M.roof); r.position.y = 5.8; g.add(tw, r); }
        g.position.x = side * (6 + Math.random() * 14); g.scale.setScalar(sc); g.rotation.y = Math.random() * 3;
        add(g, z, { kind: 'decor' });
      }
    }
    function coin(ln, z, yy = 0.95) {
      const c = new THREE.Group(), d = new THREE.Mesh(G.coin, M.coin); d.rotation.x = Math.PI / 2; c.add(d);
      c.position.set(LANES[ln], yy, 0); return add(c, z, { kind: 'coin', lane: ln });
    }
    function coinLine(ln, z, n = 6, arc = false) { for (let i = 0; i < n; i++) coin(ln, z - i * 2.4, 0.95 + (arc ? Math.sin(i / (n - 1) * Math.PI) * 1.9 : 0)); }
    function crate(ln, z) {
      const cr = new THREE.Group(), box = new THREE.Mesh(G.crate, M.crate); box.position.y = 1.1; cr.add(box);
      [0.45, 1.75].forEach(yy => { const band = new THREE.Mesh(G.band, M.crateBand); band.position.y = yy; cr.add(band); });
      if (neon) { const e = new THREE.LineSegments(new THREE.EdgesGeometry(G.crate), curve(new THREE.LineBasicMaterial({ color: 0xe879f9 }))); e.position.y = 1.1; cr.add(e); }
      cr.add(blob(1.1, 0.22));
      cr.position.x = LANES[ln]; return add(cr, z, { kind: 'crate', lane: ln, len: 1.0 });
    }
    function lowBar(ln, z) {
      const b = new THREE.Group(), bar = new THREE.Mesh(G.bar, M.bar); bar.position.y = 0.45; b.add(bar);
      for (let k = -1; k <= 1; k += 2) { const st = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.52, 0.37), M.barStripe); st.position.set(k * 0.5, 0.45, 0); b.add(st); }
      b.position.x = LANES[ln]; return add(b, z, { kind: 'bar', lane: ln, len: 0.5 });
    }
    function highBeam(ln, z) {
      const b = new THREE.Group(), beam = new THREE.Mesh(G.beam, M.beam); beam.position.y = 1.85; b.add(beam);
      for (let k = -1; k <= 1; k += 2) { const p = new THREE.Mesh(G.post, M.post); p.position.set(k * 1.12, 1.5, 0); b.add(p); }
      const warn = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 0.4), M.black); warn.position.set(0, 1.85, 0.21); b.add(warn);
      b.position.x = LANES[ln]; return add(b, z, { kind: 'high', lane: ln, len: 0.5 });
    }
    function train(ln, z) {
      const g = new THREE.Group(), body = new THREE.Mesh(G.train, M.train); body.position.y = 1.3; g.add(body);
      const front = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 1.2), M.trainFront); front.position.set(0, 1.6, 4.52); g.add(front);
      const stripe = new THREE.Mesh(new THREE.BoxGeometry(2.04, 0.25, 9.04), M.white); stripe.position.y = 0.6; g.add(stripe);
      g.position.x = LANES[ln]; return add(g, z, { kind: 'train', lane: ln, len: 4.6 });
    }
    const iconTex = {};
    function orb(ln, z) {
      const keys = Object.keys(POW), kind = keys[Math.floor(Math.random() * keys.length)], P = POW[kind];
      const g = new THREE.Group();
      const o = new THREE.Mesh(G.orb, additive(P.color, 0.75)); o.position.y = 1.3; g.add(o);
      iconTex[kind] ||= canvasTex(128, 128, (c) => { c.font = 'bold 84px "Segoe UI Emoji","Apple Color Emoji",Arial,sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = '#fff'; c.fillText(P.em, 64, 70); });
      const icon = new THREE.Mesh(new THREE.PlaneGeometry(0.75, 0.75), curve(new THREE.MeshBasicMaterial({ map: iconTex[kind], transparent: true, depthWrite: false })));
      icon.position.set(0, 1.3, 0.5); g.add(icon);
      g.position.x = LANES[ln]; return add(g, z, { kind: 'orb', lane: ln, pow: kind, orb: o });
    }
    function pattern(z) {
      const r = Math.random(), ln = Math.floor(Math.random() * 3), other = (ln + 1 + Math.floor(Math.random() * 2)) % 3;
      if (r < 0.2) { crate(ln, z); coinLine(other, z + 6); }
      else if (r < 0.38) { lowBar(ln, z); coinLine(ln, z + 4, 6, true); }
      else if (r < 0.54) { highBeam(ln, z); coinLine(ln, z + 3, 4); }
      else if (r < 0.7) { train(ln, z - 4); coinLine(other, z + 2, 7); }
      else if (r < 0.84) { [0, 1, 2].filter(l => l !== ln).forEach((l, k) => (k ? crate : lowBar)(l, z)); coinLine(ln, z + 3, 5); }
      else { [0, 1, 2].forEach(l => coinLine(l, z, 3)); }
      if (Math.random() < 0.22) orb(other, z - 10);
    }
    function gate(q, z) {
      const g = new THREE.Group(), portals = [];
      LANES.forEach((lx, i) => {
        const p = new THREE.Group();
        const ring = new THREE.Mesh(G.ring, M.ringA); ring.position.y = 1.35; ring.scale.set(1, 1.25, 1);
        const disc = new THREE.Mesh(G.disc, M.disc); disc.position.y = 1.35; disc.scale.set(1, 1.25, 1);
        const lab = new THREE.Mesh(G.label, curve(new THREE.MeshBasicMaterial({ map: labelTexture(String(q.options[i]), neon), transparent: true })));
        lab.position.set(0, 3.25, 0.05);
        const stand = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.6, 0.08), M.post); stand.position.y = 2.85;
        p.add(ring, disc, lab, stand); p.position.x = lx; g.add(p); portals.push({ p, ring, disc });
      });
      return add(g, z, { kind: 'gate', q, portals });
    }

    // ---------- music: a small procedural beat that follows the speed
    let actx = null, master = null, beatTimer = null, nextBeat = 0, beatN = 0;
    const SCALES = { grass: [0, 4, 7, 9], desert: [0, 1, 4, 7], snow: [0, 4, 7, 11], cave: [0, 3, 7, 10], sky: [0, 4, 7, 12], castle: [0, 3, 7, 8] };
    function startMusic() {
      if (!music) return;
      try { actx = new (window.AudioContext || window.webkitAudioContext)(); master = actx.createGain(); master.gain.value = 0.14; master.connect(actx.destination); } catch (e) { return; }
      const sc = SCALES[theme] || SCALES.grass, rootN = 45;
      const noise = actx.createBuffer(1, actx.sampleRate * 0.1, actx.sampleRate); const nd = noise.getChannelData(0); for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;
      nextBeat = actx.currentTime + 0.05;
      const note = (deg, oct) => 440 * 2 ** ((rootN + deg + oct * 12 - 69) / 12);
      const sched = () => {
        if (!actx) return;
        const bpm = 112 + Math.min(40, (v - speed) * 4) + (fever > 0 ? 12 : 0), stepT = 60 / bpm / 2;
        while (nextBeat < actx.currentTime + 0.12) {
          const t0 = nextBeat, n = beatN % 16;
          if (n % 4 === 0) { const o = actx.createOscillator(), g = actx.createGain(); o.frequency.setValueAtTime(150, t0); o.frequency.exponentialRampToValueAtTime(40, t0 + 0.12); g.gain.setValueAtTime(0.9, t0); g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.18); o.connect(g); g.connect(master); o.start(t0); o.stop(t0 + 0.2); }
          if (n % 2 === 1) { const s = actx.createBufferSource(), f = actx.createBiquadFilter(), g = actx.createGain(); s.buffer = noise; f.type = 'highpass'; f.frequency.value = 7000; g.gain.setValueAtTime(0.25, t0); g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.05); s.connect(f); f.connect(g); g.connect(master); s.start(t0); s.stop(t0 + 0.06); }
          if (n % 2 === 0) { const deg = sc[[0, 0, 2, 1, 0, 0, 3, 2][(n / 2) % 8]], o = actx.createOscillator(), g = actx.createGain(); o.type = 'triangle'; o.frequency.value = note(deg, 0); g.gain.setValueAtTime(0.35, t0); g.gain.exponentialRampToValueAtTime(0.001, t0 + stepT * 1.8); o.connect(g); g.connect(master); o.start(t0); o.stop(t0 + stepT * 2); }
          if (fever > 0 && n % 4 === 2) { const o = actx.createOscillator(), g = actx.createGain(); o.type = 'square'; o.frequency.value = note(sc[beatN % 4], 2); g.gain.setValueAtTime(0.07, t0); g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.15); o.connect(g); g.connect(master); o.start(t0); o.stop(t0 + 0.16); }
          nextBeat += stepT; beatN++;
        }
      };
      beatTimer = setInterval(sched, 40);
    }
    function stopMusic() { clearInterval(beatTimer); try { actx?.close(); } catch (e) { } actx = null; }

    // ---------- state
    let score = 0, combo = 0, bestCombo = 0, right = 0, asked = 0, hearts = 3, inv = 0;
    let lane = 1, x = 0, y = 0, vy = 0, slide = 0, t = 0, dist = 0, nextPattern = 30, nextDecor = 0, gateActive = null, qi = 0, finished = false, finishLine = null;
    let v = 0, started = false, countdown = 3.2, fever = 0, hitStop = 0, tilt = 0;
    const pw = { magnet: 0, boost: 0, double: 0, shield: false };
    const total = questions.length;
    let order = [...questions.keys()];
    const fmt = n => Math.floor(n).toLocaleString();
    const mult = () => Math.min(4, 1 + Math.floor(combo / 2));
    const updHud = () => {
      scoreEl.textContent = fmt(score);
      heartsEl.textContent = '❤️'.repeat(Math.max(0, hearts)) + '🖤'.repeat(Math.max(0, 3 - hearts));
      qEl.textContent = endless ? `✔ ${right}` : `${Math.min(asked + (gateActive ? 1 : 0), total)}/${total}`;
      comboEl.textContent = combo >= 2 ? `x${mult()}` : ''; comboEl.classList.toggle('hot', combo >= 2);
      feverBar.firstChild.style.width = (fever > 0 ? fever / 10 * 100 : Math.min(100, combo / 6 * 100)) + '%';
      feverBar.classList.toggle('on', fever > 0);
      powEl.innerHTML = '';
      Object.entries(pw).forEach(([k, val]) => { if (val) powEl.append(h('span.r3-pow', {}, POW[k].em, typeof val === 'number' ? h('small', {}, Math.ceil(val)) : null)); });
    };
    const toast = (txt, ok, ms) => { toastEl.textContent = txt; toastEl.className = 'r3-toast ' + (ok ? 'ok' : 'bad'); clearTimeout(toast.t); toast.t = setTimeout(() => toastEl.classList.add('hidden'), ms || (ok ? 900 : 2300)); };
    const big = (txt, cls = '') => { bigEl.textContent = txt; bigEl.className = 'r3-big ' + cls; clearTimeout(big.t); big.t = setTimeout(() => bigEl.classList.add('hidden'), 1100); };
    const flash = cls => { flashEl.className = 'r3-flash'; void flashEl.offsetWidth; flashEl.className = 'r3-flash go ' + cls; };
    const v3 = new THREE.Vector3();
    const pop = (txt, worldPos, cls = '') => {
      v3.copy(worldPos).project(camera);
      const r = cv.getBoundingClientRect();
      const el = h('div.r3-pop' + (cls ? '.' + cls : ''), { style: { left: ((v3.x + 1) / 2 * r.width) + 'px', top: ((1 - v3.y) / 2 * r.height) + 'px' } }, txt);
      popsEl.append(el); setTimeout(() => el.remove(), 900);
    };
    const showPrompt = q => {
      promptEl.innerHTML = '';
      promptEl.append(...[q.prompt.em ? h('span.r3-em', {}, q.prompt.em) : null, q.prompt.node || null,
        q.prompt.text ? h('span.r3-text', { dir: /[א-ת]/.test(q.prompt.text) ? 'rtl' : 'ltr' }, q.prompt.text) : null,
        q.prompt.audio ? h('button.btn.round.sm', { onclick: () => say(...q.prompt.audio) }, '🔊') : null].filter(Boolean));
      promptEl.className = 'r3-prompt'; void promptEl.offsetWidth; promptEl.className = 'r3-prompt pulse';
      if (q.prompt.audio) say(...q.prompt.audio);
    };
    updHud();

    // ---------- input
    const left = () => { if (started && lane > 0) { lane--; tilt = 1; sfx('pop'); } };
    const rightL = () => { if (started && lane < 2) { lane++; tilt = -1; sfx('pop'); } };
    const jump = () => { if (y <= 0.001 && started) { vy = 10.5; slide = 0; sfx('jump'); } };
    const duck = () => { if (!started) return; slide = 0.75; if (y > 0) vy = -16; };
    const onKey = e => {
      if (e.repeat) return;
      const k = e.key;
      if (k === 'ArrowLeft' || k === 'a' || k === 'A') left();
      else if (k === 'ArrowRight' || k === 'd' || k === 'D') rightL();
      else if (k === 'ArrowUp' || k === ' ' || k === 'w' || k === 'W') jump();
      else if (k === 'ArrowDown' || k === 's' || k === 'S') duck();
      else return;
      e.preventDefault();
    };
    let sx = 0, sy = 0, st0 = 0;
    const onDown = e => { sx = e.clientX; sy = e.clientY; st0 = performance.now(); };
    const onUp = e => {
      const dx = e.clientX - sx, dy = e.clientY - sy;
      if (Math.abs(dx) > 28 && Math.abs(dx) > Math.abs(dy)) (dx < 0 ? left : rightL)();
      else if (dy > 28) duck();
      else if (dy < -28 || performance.now() - st0 < 250) jump();
    };
    addEventListener('keydown', onKey); cv.addEventListener('pointerdown', onDown); cv.addEventListener('pointerup', onUp);
    const resize = () => { const r = host.getBoundingClientRect(); renderer.setSize(r.width, r.height, false); camera.aspect = r.width / r.height; camera.updateProjectionMatrix(); };
    resize(); addEventListener('resize', resize);

    // ---------- countdown intro (camera flies in)
    const cdEl = h('div.r3-count'); root.append(cdEl);
    let cdShown = 4;
    for (let z = -10; z > -150; z -= 7) decor(z);

    // ---------- main loop
    let last = performance.now(), raf = 0, shake = 0;
    const camTarget = new THREE.Vector3();
    function loop(now) {
      let dt = Math.min(0.05, (now - last) / 1000); last = now;
      if (hitStop > 0) { hitStop -= dt; dt *= 0.15; }
      t += dt;
      if (!finished) step(dt);
      const k = Math.min(1, dt * (started ? 5 : 1.6));
      camera.position.x += (x * 0.42 - camera.position.x) * k + (shake > 0 ? (Math.random() - 0.5) * shake : 0);
      camera.position.y += ((slide > 0 ? CAM.y - 0.5 : CAM.y) + y * 0.25 - camera.position.y) * k + (shake > 0 ? (Math.random() - 0.5) * shake : 0);
      camera.position.z += (CAM.z - camera.position.z) * k;
      camTarget.set(x * 0.25, 1.2 + y * 0.3, CAM.look); camera.lookAt(camTarget);
      camera.rotation.z += tilt * 0.03;
      const fov = 62 + Math.max(0, v - speed) * 0.9 + (pw.boost > 0 ? 12 : 0) + (camera.aspect < 1 ? 14 : 0);
      if (Math.abs(camera.fov - fov) > 0.05) { camera.fov += (fov - camera.fov) * 0.08; camera.updateProjectionMatrix(); }
      shake = Math.max(0, shake - dt * 2.2);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    }
    function step(dt) {
      if (!started) {
        countdown -= dt;
        const n = Math.ceil(countdown - 0.2);
        if (n !== cdShown && n >= 0) { cdShown = n; cdEl.textContent = n > 0 ? n : 'GO!'; cdEl.className = 'r3-count'; void cdEl.offsetWidth; cdEl.className = 'r3-count beat'; sfx(n > 0 ? 'pop' : 'good'); }
        if (countdown <= 0.2) { started = true; v = speed; setTimeout(() => cdEl.remove(), 700); startMusic(); setTimeout(() => help.classList.add('fade'), 4000); }
        animateHero(dt, true);
        return;
      }
      const maxV = speed * (endless ? 2.1 : 1.45);
      v = Math.min(maxV, v + dt * (endless ? 0.22 : 0.12));
      const dz = v * (pw.boost > 0 ? 1.55 : 1) * dt; dist += dz;
      score += dz * 0.2 * (pw.double > 0 || fever > 0 ? 2 : 1);
      trackTex.offset.y += dz / 8; groundTex.offset.y += dz / 8; curbTex.offset.y += dz / 4;
      CURVE.uCurveX.value = Math.sin(dist / 140) * 0.0012;
      for (const k of ['magnet', 'boost', 'double']) if (pw[k] > 0) { pw[k] = Math.max(0, pw[k] - dt); if (!pw[k]) updHud(); }
      if (fever > 0) { fever = Math.max(0, fever - dt); if (!fever) { combo = Math.min(combo, 3); updHud(); } }
      if (Math.floor(t * 4) !== Math.floor((t - dt) * 4)) { updHud(); distEl.textContent = Math.floor(dist) + 'm'; }
      // hero physics
      x += (LANES[lane] - x) * Math.min(1, dt * 13);
      vy -= 30 * dt; y = Math.max(0, y + vy * dt); if (y === 0) vy = Math.max(0, vy);
      if (slide > 0) slide -= dt;
      tilt *= 0.85;
      animateHero(dt, false);
      if (inv > 0) inv -= dt;
      hero.visible = inv > 0 && pw.boost <= 0 ? Math.floor(inv * 12) % 2 === 0 : true;
      shieldBubble.visible = pw.shield || pw.boost > 0;
      // trail particles (rainbow in fever, dust otherwise)
      if (!low && Math.random() < (fever > 0 ? 0.9 : 0.25)) {
        const c = fever > 0 ? new THREE.Color().setHSL((t * 0.8) % 1, 1, 0.6).getHex() : (neon ? 0x22d3ee : 0xe5d3b3);
        burst(new THREE.Vector3(x, 0.2 + y, 0.4), c, 1, 1.5);
      }
      // speed lines while boosting / fever / very fast
      const showLines = pw.boost > 0 || fever > 0 || v > speed * 1.3;
      for (const l of speedLines) {
        if (!showLines) { l.visible = false; continue; }
        if (!l.visible || l.position.z > 10) { l.visible = true; const a = Math.random() * Math.PI * 2, r = 3 + Math.random() * 5; l.position.set(Math.cos(a) * r, 2.5 + Math.sin(a) * r * 0.6, -40 - Math.random() * 20); }
        l.position.z += dz * 3;
      }
      // spawning
      if (dist > nextDecor) { decor(-150); nextDecor = dist + 5; }
      if (!gateActive && !finishLine && (endless || qi < total)) {
        if (endless && qi >= order.length) { order = [...questions.keys()].sort(() => Math.random() - 0.5); qi = 0; }
        const q = questions[endless ? order[qi] : qi]; qi++;
        gateActive = gate(q, -125); showPrompt(q); updHud();
      }
      if (!endless && !gateActive && qi >= total && !finishLine) {
        const fl = new THREE.Group();
        for (let i = 0; i < 9; i++) for (let r = 0; r < 2; r++) { const c = new THREE.Mesh(G.flag, (i + r) % 2 ? M.black : M.white); c.position.set(-3.6 + i * 0.9, 3.6 + r * 0.9, 0); fl.add(c); }
        [-4.2, 4.2].forEach(px => { const p = new THREE.Mesh(G.post, M.post); p.position.set(px, 2, 0); p.scale.y = 1.4; fl.add(p); });
        finishLine = add(fl, -80, { kind: 'finish' });
        promptEl.classList.add('hidden');
      }
      if (dist > nextPattern) {
        const gz = gateActive ? gateActive.z : -999;
        if (Math.abs(-130 - gz) > 26 && !finishLine) pattern(-130);
        nextPattern = dist + Math.max(13, 24 - (v - speed) * 0.8) + Math.random() * 8;
      }
      // move & collide
      const hx = x, footY = y;
      for (const o of things) {
        o.z += dz; o.obj.position.z = o.z;
        if (o.kind === 'coin') {
          o.obj.rotation.y += dt * 5;
          if (pw.magnet > 0 && !o.hit && o.z > -22 && o.z < 1) { o.obj.position.x += (hx - o.obj.position.x) * Math.min(1, dt * 8); o.obj.position.y += (footY + 1 - o.obj.position.y) * Math.min(1, dt * 8); }
          if (!o.hit && Math.abs(o.z) < 0.8 && Math.abs(o.obj.position.x - hx) < 0.95 && Math.abs(o.obj.position.y - (footY + 1)) < 1.25) {
            o.hit = true; o.obj.visible = false; score += (pw.double > 0 || fever > 0) ? 20 : 10; sfx('coin');
            burst(o.obj.position.clone(), 0xfacc15, 6, 3);
          }
        } else if (o.kind === 'orb') {
          o.orb.rotation.y += dt * 2; o.orb.rotation.x += dt;
          if (!o.hit && Math.abs(o.z) < 0.9 && Math.abs(LANES[o.lane] - hx) < 1.1 && footY < 2) { o.hit = true; o.obj.visible = false; powerUp(o.pow, o.obj.position.clone().setY(1.3)); }
        } else if ((o.kind === 'crate' || o.kind === 'bar' || o.kind === 'high' || o.kind === 'train') && !o.hit) {
          const half = o.len || 0.6;
          if (o.z > -half - 0.4 && o.z < half + 0.4 && Math.abs(LANES[o.lane] - hx) < 1.15) {
            const clear = (o.kind === 'bar' && footY > 0.85) || (o.kind === 'high' && slide > 0 && footY < 0.4) || (o.kind === 'crate' && footY > 2.3);
            if (!clear) { o.hit = true; hurt(o); if (finished) return; }
          }
        } else if (o.kind === 'gate' && !o.done && o.z > -0.3) resolveGate(o);
        else if (o.kind === 'gate') o.portals.forEach(p => { p.ring.rotation.z += dt * 1.5; });
        else if (o.kind === 'finish' && o.z > 0) { sfx('win'); big('🏁 FINISH!', 'gold'); return finish(false); }
      }
      for (let i = things.length - 1; i >= 0; i--) if (things[i].z > 14) { scene.remove(things[i].obj); things.splice(i, 1); }
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i], u = p.userData; u.life -= dt;
        p.position.addScaledVector(u.v, dt); u.v.y -= 9 * dt; p.position.z += dz; p.rotation.x += dt * 6;
        p.scale.setScalar(Math.max(0.05, u.life * 1.4));
        if (u.life <= 0) { scene.remove(p); parts.splice(i, 1); }
      }
    }
    function animateHero(dt, idle) {
      hero.position.set(x, y, 0);
      const runT = t * (idle ? 3 : v * 0.75), sw = y > 0 ? 0.9 : Math.sin(runT) * 0.9;
      legL.rotation.x = sw; legR.rotation.x = -sw; armL.rotation.x = -sw * 0.9; armR.rotation.x = sw * 0.9;
      rig.position.y = idle ? Math.abs(Math.sin(t * 3)) * 0.05 : (y > 0 ? 0 : Math.abs(Math.sin(runT)) * 0.12);
      rig.rotation.z = (LANES[lane] - x) * -0.18;
      rig.rotation.x = y > 0 ? -0.25 : -0.12;
      const s = slide > 0 ? 0.55 : 1; rig.scale.y += (s - rig.scale.y) * 0.3; rig.scale.z += ((slide > 0 ? 1.3 : 1) - rig.scale.z) * 0.3;
      heroShadow.position.x = x; heroShadow.scale.setScalar(1 - Math.min(0.6, y / 4));
    }
    function powerUp(kind, pos) {
      const P = POW[kind]; sfx('gate'); burst(pos, P.color, 22, 7);
      if (kind === 'shield') pw.shield = true; else pw[kind] = P.sec;
      big(`${P.em} ${P.label}!`, 'pow'); updHud();
    }
    function hurt(o) {
      if (pw.boost > 0) { burst(o.obj.position.clone().setY(1.2), 0xffffff, 18, 9); o.obj.visible = false; shake = 0.25; sfx('stomp'); score += 25; return; }
      if (inv > 0) return;
      if (pw.shield) { pw.shield = false; inv = 1; shake = 0.4; sfx('bump'); burst(new THREE.Vector3(x, 1.2, 0), 0x38bdf8, 24, 8); big('🛡️', 'pow'); updHud(); return; }
      hearts--; inv = 1.6; shake = 0.9; hitStop = 0.25; v *= 0.75; combo = 0; fever = 0; sfx('hurt'); flash('hurt');
      burst(new THREE.Vector3(x, 1.2, 0), 0xef4444, 20, 7); updHud();
      if (hearts <= 0) { big('💥', 'bad'); finished = true; stopMusic(); setTimeout(() => finish(false), 900); }
    }
    function resolveGate(o) {
      o.done = true; gateActive = null; asked++;
      const q = o.q, chosen = Math.max(0, Math.min(2, Math.round((x - LANES[0]) / (LANES[1] - LANES[0])))), ok = chosen === q.a;
      o.portals[q.a].ring.material = M.right;
      if (!ok) o.portals[chosen].ring.material = M.wrong;
      onAnswer?.(q, ok);
      const at = new THREE.Vector3(LANES[chosen], 1.4, -0.5);
      if (ok) {
        combo++; bestCombo = Math.max(bestCombo, combo); right++;
        const pts = 100 * mult() * (pw.double > 0 || fever > 0 ? 2 : 1); score += pts;
        sfx('good'); burst(at, 0x22c55e, 26, 9); burst(at, 0xfacc15, 14, 7); flash('good');
        pop(`+${pts}`, at, 'gold');
        big(['NICE!', 'GREAT!', 'AWESOME!', 'PERFECT!'][Math.min(3, mult() - 1)], 'good');
        if (combo === 6 && fever <= 0) { fever = 10; setTimeout(() => big('🔥 FEVER x2', 'fever'), 700); sfx('win'); }
        v = Math.min(speed * (endless ? 2.1 : 1.45), v + 0.4);
      } else {
        combo = 0; fever = 0; shake = 0.5; sfx('bad'); flash('hurt'); burst(at, 0xef4444, 18, 6);
        toast(`✗ ${q.options[q.a]}${q.hint ? ' · ' + q.hint : ''}`, false);
      }
      if (q.say) say(...q.say);
      promptEl.classList.add('hidden');
      updHud();
    }
    function finish(quit) {
      if (finish.done) return; finish.done = true; finished = true;
      cancelAnimationFrame(raf); stop(); stopMusic();
      removeEventListener('keydown', onKey); removeEventListener('resize', resize);
      setTimeout(() => { renderer.dispose(); things.length = 0; }, 50);
      if (quit) return;
      const n = endless ? Math.max(1, asked) : total, ratio = right / Math.max(1, n);
      resolve({ score: Math.floor(score), right, total: n, bestCombo, medal: medalFor(ratio), ratio, distance: Math.floor(dist) });
    }
    raf = requestAnimationFrame(loop);
  });
}
