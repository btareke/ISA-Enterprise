const CACHE_NAME = "isa-enterprise-v2";
const ASSETS = [
  "/",
  "/index.html",
  "/about.html",
  "/portfolio.html",
  "/careers.html",
  "/contact.html",
  "/services/index.html",
  "/services/concrete-saw-cutting.html",
  "/services/concrete-work.html",
  "/services/fiber-power-ductbank.html",
  "/services/flagger-service.html",
  "/services/excavation-work.html",
  "/services/manhole-installation.html",
  "/services/pole-base-installation.html",
  "/services/trucking.html",
  "/css/styles.css",
  "/js/main.js",
  "/assets/isa-logo.jpg",
  "/assets/projects/concrete-saw-cutting/cutting-01.jpg",
  "/assets/projects/concrete-saw-cutting/cutting-02.jpg",
  "/assets/projects/concrete-saw-cutting/cutting-03.jpg",
  "/assets/projects/concrete-work/concrete-01.jpg",
  "/assets/projects/concrete-work/concrete-02.jpg",
  "/assets/projects/concrete-work/concrete-03.jpg",
  "/assets/projects/ductbank/ductbank-01.jpg",
  "/assets/projects/ductbank/ductbank-02.jpg",
  "/assets/projects/ductbank/ductbank-03.jpg",
  "/assets/projects/excavation/excavation-01.jpg",
  "/assets/projects/excavation/excavation-02.jpg",
  "/assets/projects/excavation/excavation-03.jpg",
  "/assets/projects/flagger/flagger-01.jpg",
  "/assets/projects/flagger/flagger-02.jpg",
  "/assets/projects/flagger/flagger-03.jpg",
  "/assets/projects/manhole/manhole-01.jpg",
  "/assets/projects/manhole/manhole-02.jpg",
  "/assets/projects/manhole/manhole-03.jpg",
  "/assets/projects/pole-base/pole-base-01.jpg",
  "/assets/projects/pole-base/pole-base-02.jpg",
  "/assets/projects/pole-base/pole-base-03.jpg",
  "/assets/icon-192.png",
  "/assets/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
          return null;
        })
      )
    )
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
