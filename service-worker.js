'use strict';
var CACHE_NAME = 'number-rush-cache-v13';

// The files we want to cache
const urlsToCache = [
    'index.html',
    'assets/audio/beep.mp3',
    'assets/audio/incorrect.mp3',
    'assets/audio/success.mp3',
    'assets/images/favicon.ico',
    'assets/images/arrow.svg',
  //  'assets/styles/css/main.min.css',
    'assets/scripts/dist/bundle.js'
];

// Install service worker with cache name and add urls above
self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            console.log('WORKER: Opened cache');
            return cache.addAll(urlsToCache);
        })
        .then(function() {
            console.log('WORKER: Install completed');
        })
        .catch(function(err) {
           console.error('Error: ' + err);
        })
    );
});

// Listen for when the browser attempts to fetch assets
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            // Cache hit - return response
            if (response) {
                return response;
            }


            var fetchRequest = event.request.clone();

            return fetch(fetchRequest).then(
                function(response) {
                    // Check if we received a valid response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    var responseToCache = response.clone();

                    caches.open(CACHE_NAME)
                        .then(function(cache) {
                            cache.put(event.request, responseToCache);
                        });

                    return response;
                }
            );
        })
        .catch(function(err) {
           console.error('Error: ' + err)
        })
    );
});

self.addEventListener('activate', function(event) {

    var cacheWhitelist = [CACHE_NAME];

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
