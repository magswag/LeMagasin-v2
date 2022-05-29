self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request)
        .then(cachedResponse => {
          const fetchPromise = fetch(event.request).then(networkResponse => {
            cache.put(event.request, networkResponse.clone());
  
            return networkResponse;
          })
          // So if there's a cached version available, use it,
          // but fetch an update for next time.
          return cachedResponse || fetchPromise;
        }
      )
    );
  });