//  Create Static Cache
self.addEventListener('install', async function () {
  let createdcach = await caches.open('static-cache');
  await createdcach.addAll([
    './index.html',
    './travel.html',
    './projects.html',
    './about.html',
    './images/js1.jpg',
    './images/js2.png',
    './images/icon-192x192.png',
    './styles/index.css',
    './fallback.json',
    './styles/css/bootstrap.min.css',
    './scripts/js/bootstrap.bundle.min.js',
  ]);
  await self.skipWaiting();
});
self.addEventListener('fetch', async function (event) {
  if (!navigator.onLine) {
    return await event.respondWith(cache(event.request));
  } else {
    return await event.respondWith(NetworkResponseCheck(event.request));
  }
});
async function cache(req) {
  return (await caches.match(req)) || (await caches.match('fallback.json'));
}
async function NetworkResponseCheck(req) {
  let dynamiccach = await caches.open('cache-dynamic');
  let res = await fetch(req);
  await dynamiccach.put(req, resp.clone());
  return res;
}
