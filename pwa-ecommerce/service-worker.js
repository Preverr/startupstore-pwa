const CACHE_NAME = "startupstore-nav-v1";
const OFFLINE_PAGE = "offline.html";

const FILES_TO_CACHE = [
  "index.html",
  "products.html",
  "detail.html",
  "about.html",
  "contact.html",
  "offline.html",
  "css/style.css",
  "js/main.js",
  "js/products.js",
  "js/detail.js"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  // 🔴 EN KRİTİK KISIM BURASI
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(OFFLINE_PAGE))
    );
    return;
  }

  // Diğer istekler (css, js vs.)
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
