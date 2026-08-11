// ==========================================
// PMC Citizen Portal - Service Worker
// ==========================================

const CACHE_NAME = "pmc-citizen-portal-v2";


// ==========================================
// Files to Cache
// ==========================================

const FILES_TO_CACHE = [

    "./",
    "./index.html",

    // HTML Pages
    "./complaint.html",
    "./property-tax.html",
    "./sanitation.html",
    "./water-supply.html",

    // CSS
    "./css/style.css",
    "./css/responsive.css",
    "./css/complaint.css",
    "./css/property-tax.css",
    "./css/sanitation.css",
    "./css/water-supply.css",

    // JavaScript
    "./js/script.js",
    "./js/complaint.js",
    "./js/property-tax.js",
    "./js/sanitation.js",
    "./js/water-supply.js",

    // Manifest
    "./manifest.json",

    // PWA Icons
    "./icons/icon-192.png",
    "./icons/icon-512.png"

];


// ==========================================
// Install
// ==========================================

self.addEventListener("install", function (event) {

    console.log("Service Worker: Installing...");

    event.waitUntil(

        caches.open(CACHE_NAME)

            .then(function (cache) {

                console.log("Service Worker: Caching files");

                return cache.addAll(FILES_TO_CACHE);

            })

            .then(function () {

                console.log(
                    "Service Worker: Files cached successfully"
                );

                // Activate new service worker immediately
                return self.skipWaiting();

            })

    );

});


// ==========================================
// Activate
// ==========================================

self.addEventListener("activate", function (event) {

    console.log("Service Worker: Activated");

    event.waitUntil(

        caches.keys()

            .then(function (cacheNames) {

                return Promise.all(

                    cacheNames

                        .filter(function (cacheName) {

                            return cacheName !== CACHE_NAME;

                        })

                        .map(function (cacheName) {

                            console.log(
                                "Deleting old cache:",
                                cacheName
                            );

                            return caches.delete(cacheName);

                        })

                );

            })

            .then(function () {

                // Take control of open pages
                return self.clients.claim();

            })

    );

});


// ==========================================
// Fetch
// ==========================================

self.addEventListener("fetch", function (event) {

    event.respondWith(

        caches.match(event.request)

            .then(function (response) {

                // Return cached file
                if (response) {

                    return response;

                }

                // Otherwise request from network
                return fetch(event.request);

            })

    );

});