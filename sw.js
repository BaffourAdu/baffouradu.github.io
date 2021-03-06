//Naming the Cahced files
const cacheName = 'currency-converter';
const cacheVersion = `${cacheName}::1.0.0`;

//Variable to hold cahce files
const cachedFiles = [
    '/',
    '/assets/css/main.css',
    '/assets/css/bootstrap.min.css',
    'https://fonts.googleapis.com/css?family=Roboto+Slab',
    '/assets/js/helpers.js',
    '/assets/js/main.js',
    '/assets/js/idb.js',
    '/assets/js/db.js'
];


/**
 * Installing Service Worker
 * ----------------------------
 * Install Service Worker by adding all urls
 * to be cached to the cache. Urls to be cached 
 * are store in the variable cachedFiles
 */
self.addEventListener('install', event => {
    console.log('[installing worker]');
    event.waitUntil(
        //Open Cache and all URLS to cache
        caches.open(cacheVersion)
            .then(cache => cache.addAll(cachedFiles))
    );
});

/**
 * Activate Worker
 * -------------------------
 * If cache is has been updated then
 * delete old cache and update it with new version
 */
self.addEventListener('activate', event => {
    console.log('[activating worker]');
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.filter(key => key.indexOf(cacheName) === 0 && key !== cacheVersion)
                    .map(key => caches.delete(key))
            )
        )
    );
});


/**
 * Fetching a Resource
 * ----------------------
 * Fetch from cache if offline and If network is available 
 * fetch network Resource and update cache else 
 */
self.addEventListener('fetch', event => {
        console.log('[fetching]', event.request.url);
        event.respondWith(
            caches.match(event.request)
                .then(response => {
                    caches.open(cacheVersion).then(cache => cache.add(event.request.url));
                    return response || fetch(event.request);
                })
        );
    
});
