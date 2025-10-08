const CACHE_NAME = 'divine-delights-cache-v1';

// List of files to cache (the "cache manifest").
// 🎯 FIXED: All paths are now absolute (starting with '/') for reliability, 
// and the incorrect icon name has been corrected (192x192).
const urlsToCache = [
    '/', // Caches the root of the site (index.html)
    // HTML Pages
    '/index.html',
    '/breads.html',
    '/pastries.html',
    '/cakes.html',
    '/about.html',
    '/contact.html',
    
    // Core Assets
    '/styles.css', // 🎯 FIXED: Corrected path for styles.css from original log error
    '/manifest.json',
    
    // Scripts
    '/scripts/cart.js',
    '/scripts/components.js',
    '/scripts/main.js',
    
    // Images and Icons (Checked against the 404 errors)
    '/images/logo.png',
    '/images/hero-background.jpg',
    '/images/carousel-cake-1.jpg',
    '/images/carousel-cake-2.jpg',
    '/images/carousel-cake-3.jpg',
    '/images/product-1.jpg',
    '/images/product-2.jpg',
    '/images/product-3.jpg',
    
    // 🎯 FIXED: Corrected icon names to match the 404 error and standard PWA practice
    '/images/icons/icon-192x192.png', 
    '/images/icons/icon-512x512.png'
];

// 1. Install Event: Caches all static assets
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                // The cache.addAll() operation will fail if even ONE file is missing 
                // or if the path is incorrect (which was the issue here).
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