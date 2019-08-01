const cacheName = 'OsoroCache';
const filesToCache = [
  // '/index.html',
  // '/js/materialize.js',
  // '/js/materialize.min.js',
  // '/js/jquery.min.js',
  // '/js/FuelStationLocations.js',
  // '/js/googleapis.js',
	//
	//
  // '/css/materialize.css',
  // '/css/materialize.min.css',
  // '/css/locations.css',
  // '/css/modal.css',


];



self.addEventListener( 'install', e => {
	console.log( 'Service Worker: Installed' );

	e.waitUntil(
		caches.open( cacheName )
		.then( cache => {
			console.log( 'Caching Files...' );
			cache.addAll( filesToCache );
		} )
		.then( () => self.skipWaiting() )
	);
} );

self.addEventListener( 'activate', e => {
	console.log( 'Service Worker: Activated' );
	//remove unwanted caches
	e.waitUntil(
		caches.keys().then( cacheNames => {
			return Promise.all(
				cacheNames.map( cache => {
					if ( cache != cacheName ) {
						console.log( 'Service Worker: Clearing old Cache...' );
						return caches.delete( cache );
					}
				} )
			)
		} )
	);
} );

self.addEventListener( 'fetch', e => {
	console.log( 'Service worker: Fetching...' );
	e.respondWith(
		fetch( e.request ).catch( () => caches.match( e.request ) )
	);
} );