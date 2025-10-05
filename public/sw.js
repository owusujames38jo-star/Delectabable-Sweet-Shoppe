const CACHE_NAME = 'divine-delights-cache-v1';

// List of files to cache (the "cache manifest").
const urlsToCache = [
    '/',
    '/index.html',
    '/styles/styles.css',
    '/js/script.js', // Ensure this file exists
    '/breads.html',
    '/pastries.html',
    '/cakes.html',
    '/about.html',
    '/contact.html',
    '/manifest.json',
    '/images/logo.png',
    '/images/hero-background.jpg',
    '/images/carousel-cake-1.jpg',
    '/images/carousel-cake-2.jpg',
    '/images/carousel-cake-3.jpg',
    '/images/product-1.jpg',
    '/images/product-2.jpg',
    '/images/product-3.jpg',
    '/images/icons/icon-192x192.png',
    '/images/icons/icon-512x512.png'
];

// 1. Install Event: Caches all static assets
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache); 
            })
    );
});

// 2. Fetch Event: Intercepts network requests and serves content from the cache if available
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // This is the core "Cache First" logic:
                // Cache hit - return response
                if (response) {
                    return response;
                }
                // No cache hit - fetch from network
                return fetch(event.request);
            })
    );
});

// 3. Activate Event: Cleans up old caches (important for updates)
self.addEventListener('activate', function(event) {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});