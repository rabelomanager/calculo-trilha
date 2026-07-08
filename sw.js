/* Service worker — Trilha de Cálculo
   Estratégia:
   - Navegação (HTML): network-first (pega atualizações) com fallback ao cache (offline).
   - Demais (JS/CSS/CDN/ícones): stale-while-revalidate (rápido e atualiza em 2º plano).
   Suba a versão do CACHE para invalidar tudo após um deploy. */
const CACHE = 'trilha-calculo-v3';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png'];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then((c) => Promise.allSettled(SHELL.map((u) => c.add(u)))));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;

  // Navegação: rede primeiro, cai pro cache se offline
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then((res) => {
        caches.open(CACHE).then((c) => c.put('./index.html', res.clone()));
        return res;
      }).catch(() => caches.match('./index.html').then((r) => r || caches.match('./')))
    );
    return;
  }

  // Recursos: stale-while-revalidate (inclui CDN, respostas opacas)
  e.respondWith(
    caches.open(CACHE).then((c) =>
      c.match(req).then((cached) => {
        const fetched = fetch(req).then((res) => { try { c.put(req, res.clone()); } catch (_) {} return res; }).catch(() => cached);
        return cached || fetched;
      })
    )
  );
});
