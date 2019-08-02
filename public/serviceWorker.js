const cacheName = 'weather-v1';
const staticAssets = [
  './',
  './css/custom.css',
  './css/materialize.css/materialize.min.css',
  './css/materialize.css/materialize.css',
  './css/fontawesome-pro-5.8.2-web/css/',
  './img/clear.jpg',
  './img/cloudy.jpg',
  './img/drizzle.jpg',
  './img/humidandovercast.jpg',
  './img/overcast.jpg',
  './img/partlycloudy.jpg',
  './img/sun.jpg',
  './img/suntrans.png',
  './js/jquery.js',
  './js/script1.js',
  './js/materialize.js',
  './js/materialize.min.js',
  '../templates/views/index.hbs',
  '../templates/views/about.hbs',
  '../templates/views/help.hbs',
  '../templates/views/404.hbs'
];

self.addEventListener( 'install', async e => {
	const cache = await caches.open( cacheName );
	await cache.addAll( staticAssets );
	return self.skipWaiting();
} );

self.addEventListener( 'activate', e => {
	self.clients.claim();
} )


self.addEventListener( 'fetch', async e => {
	const req = e.request;
	const url = new URL( req.URL );

	if ( url.origin == location.origin ) {
		e.respondWith( cacheFirst( req ) );
	} else {
		e.respondWith( networkAndCache( req ) );
	}
} );


self.addEventListener( 'get', async e => {
	const req = e.request;
	const url = new URL( req.URL );

	if ( url.origin == location.origin ) {
		e.respondWith( cacheFirst( req ) );
	} else {
		e.respondWith( networkAndCache( req ) );
	}
} );



async function cacheFirst( req ) {
	const cache = await caches.open( cacheName );
	const cached = await cache.match( req );
	return cached || fetch( req );
}

async function networkAndCache( req ) {
	const cache = await caches.open( cacheName );
	try {
		const fresh = await fetch( req );
		await cache.put( req, fresh.clone() );
		return fresh;
	} catch ( error ) {
		const cached = await cache.match( req );
		return cached;
	}
}