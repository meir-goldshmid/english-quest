// Offline support: app files network-first (so updates arrive), voice clips cache-first (they never change).
const APP = 'eq-app-v1', AUDIO = 'eq-audio-v1';
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(APP).then(c => c.addAll(['./', 'index.html', 'print.html', 'css/style.css', 'css/print.css', 'js/main.js', 'js/content.js', 'js/store.js', 'js/audio.js', 'js/speech.js', 'js/levels.js', 'js/game.js', 'js/challenges.js', 'js/screens.js', 'js/ui.js', 'js/print.js', 'audio/en/manifest.json', 'audio/he/manifest.json']))); });
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  if (u.pathname.endsWith('.mp3')) {
    e.respondWith(caches.open(AUDIO).then(async c => (await c.match(e.request)) || fetch(e.request).then(r => { if (r.ok) c.put(e.request, r.clone()); return r; })));
    return;
  }
  e.respondWith(fetch(e.request).then(r => { if (r.ok) { const cl = r.clone(); caches.open(APP).then(c => c.put(e.request, cl)); } return r; }).catch(() => caches.match(e.request, { ignoreSearch: true })));
});
