// https://stackoverflow.com/questions/33262385/service-worker-force-update-of-new-assets
// https://code-boxx.com/offline-web-app-javascript/

const appName = "LiarsDice" + VERSION
const appFiles = FILES

self.addEventListener("install", (event) => {
	event.waitUntil(
		caches
			.open(appName)
			.then((cache) => cache.addAll(appFiles))
			.catch((err) => console.error(err))
	)
})

self.addEventListener("fetch", (event) => {
	event.respondWith(
		caches.match(event.request).then((res) => {
			return res || fetch(event.request)
		})
	)
})
