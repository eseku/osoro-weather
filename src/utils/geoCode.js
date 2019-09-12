const request = require( 'request' );

const geoCodeFxn = ( address, callback ) => {
	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent( address ) + '.json?access_token=YOUR_API_KEY';
	request( {
			url,
			json: true
		},
		( error, {
			body
		} = {} ) => {
			if ( error ) {
				callback( 'Unable to connect to location services', undefined );
			} else if ( body.features.length == 0 ) {
				callback( 'Unable to find location. Try another search', undefined )
			} else {
				callback( undefined, {
					placeName: body.features[ 0 ].place_name,
					longitude: body.features[ 0 ].center[ 0 ],
					latitude: body.features[ 0 ].center[ 1 ]
				} )
			}
		} )
}

// geoCodeFxn( 'takoradi', ( error, {
// 	longitude,
// 	latitude
// } ) => {
// 	console.log( error );
// 	console.log( longitude );
// } )

module.exports = geoCodeFxn;
