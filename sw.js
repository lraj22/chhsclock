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
	console.log("Installing...");
	event.waitUntil(caches.open(cacheName));
});

// remove cached items when new cache exists
self.addEventListener('activate', (e) => {
	console.log("Activating...");
	e.waitUntil(
		caches.keys().then((keyList) => {
			console.log(keyList);
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
	var parsedUrl = new URL(event.request.url).pathname;
	if (parsedUrl === "/") parsedUrl = "/index.html";
	// Check if this is one of our cached URLs
	if (cachedItems.includes(parsedUrl)) {
		// Open the cache
		event.respondWith(caches.open(cacheName).then((cache) => {
			// Go to the network first
			return fetch(event.request.url).then((fetchedResponse) => {
				console.log("Network first! " + parsedUrl)
				cache.put(event.request, fetchedResponse.clone());
				return fetchedResponse;
			}).catch(() => {
				// If the network is unavailable, get
				console.log("From the cache: " + parsedUrl);
				return cache.match(event.request.url);
			});
		}));
	} else {
		console.log("Not on the list: " + parsedUrl);
		return;
	}
});