// Establish a cache name
const cacheName = 'CHHSClockCache_Nov2023';
const cachedItems = [
	"/index.html",
	"/main.js",
	"/main.css",
	"/images/favicon-32.png",
	"/images/favicon-16.png",
];

self.addEventListener('install', (event) => {
	event.waitUntil(caches.open(cacheName));
});

// remove cached items when new cache exists
self.addEventListener('activate', (e) => {
	e.waitUntil(
		caches.keys().then((keyList) => {
			return Promise.all(
				keyList.map((key) => {
					if (key === cacheName) {
						return;
					}
					return caches.delete(key);
				}),
			);
		}),
	);
});

// Network first, cache fallback strategy
self.addEventListener('fetch', (event) => {
	// Check if this is one of our cached URLs
	if (cachedItems.includes(event.request.url)) {
		// Open the cache
		event.respondWith(caches.open(cacheName).then((cache) => {
			// Go to the network first
			return fetch(event.request.url).then((fetchedResponse) => {
				cache.put(event.request, fetchedResponse.clone());
				return fetchedResponse;
			}).catch(() => {
				// If the network is unavailable, get
				return cache.match(event.request.url);
			});
		}));
	} else {
		return;
	}
});