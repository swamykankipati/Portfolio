//  Register the ServiceWorker

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service.js')
    .then(function(registration) {
      registration.addEventListener('updatefound', function() {
        var installingWorker = registration.installing;
        console.log('Sw working:',
          installingWorker);
      });
    })
    .catch(function(eror) {
      console.log('serviceWorker failed:', eror);
    });
} else {
  console.log('serviceWorker is supported.');
}

//  ServiceWorker Fetch and Catch data from offline store

C_value = 'version';
this.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(C_value)
    .then((cache) => {
      cache.addAll([

      ])
    })
  )
})
self.addEventListener('activate', function(event) {
  console.log("activating Service Worker");
  var updateded = ['old', 'new'];
  event.waitUntil(
    caches.keys().then(function(value) {
      return Promise.all(value.map(function(data) {
        if (updateded.indexOf(data) === -1) {
          return caches.delete(data);
        }
      }));
    })
  );
});
// fetch event
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(C_value)
    .then((cache) => {
      return cache.match(event.request)
        .then((callback) => {
          return callback || fetch(event.request)
            .then((callback) => {
              cache.put(event.request, callback.clone());
              return callback;
            });
        });
    })
  )
})