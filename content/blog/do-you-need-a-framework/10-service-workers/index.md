---
title: Service workers
date: "2023-10-20T09:00:00.000Z"
description: |
  What are service workers and how do they work? Let's find out.
course: do-you-need-a-framework
order: 10
---

## #10 Service workers

> By the end of this section, **you should have a solid understanding of the possibilities service workers offer.**

- The incorporation of a Service Worker is essential for offline functionality.
- Native apps work offline because they store all necessary resources on the device, while classic web apps don't because they require downloading resources like HTML on demand.
- Service Workers act as middlewares, operating between the client and server, enabling PWAs to work offline. They are installed client-side, and act as a local web server, handling HTTP requests and serving files directly from the client, which enhances the app's performance.
- A Service Worker is primarily a JavaScript file that has its own thread. It can be installed silently without needing user permission and operates on secure connections (HTTPS), with exceptions allowed for localhost.
- The Service Worker can impersonate the real server, manage, and serve resources within its scope. However, it doesn’t replace the real server; it collaborates with it, deciding whether to respond with cached content or to forward the request to the real server.
- Service Workers have a unique life cycle and can execute code in the background, even when the app or browser is not active.
- The registration of a Service Worker can be deferred, and the decision lies with the developer, determined by when the Service Worker registration API is called within the application code.

## Project Progress

### serviceWorker.js

```js
const assets = [
  "/",
  "styles.css",
  "app.js",
  "sw-register.js",
  "https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
]

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("assets").then((cache) => {
      cache.addAll(assets)
    }),
  )
})

// State while revalidate strategy
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Even if the response is in the cache, we fetch it
      // and update the cache for future usage
      const fetchPromise = fetch(event.request).then(
        (networkResponse) => {
          caches.open("assets").then((cache) => {
            cache.put(
              event.request,
              networkResponse.clone(),
            )
            return networkResponse
          })
        },
      )
      // We use the currently cached version if it's there
      return cachedResponse || fetchPromise // cached or a network fetch
    }),
  )
})
```

### sw-register.js

```js
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("serviceworker.js")
}
```
