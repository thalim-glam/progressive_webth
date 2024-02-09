const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST); // Here the precacheAndRoute() method takes an array of URLs to precache.
// The self._WB_MANIDEST is an array that contains the list of URLs to precache.

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});
//-------------------------------------------------------------------------------------------
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching
//---------------------------------- Setting asset cache -----------------------------------------
registerRoute(
  ({ request }) => ['style', 'script', 'worker'].includes(request.destination), //defining the callback function that will filter the requests needed in cache
  new StaleWhileRevalidate({
    cacheName: 'asset-cache', // naming the asset cache storage
    plugins: [
      //setting up plugins to save cache response to a certain time limit
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      })
    ],
  })
);
