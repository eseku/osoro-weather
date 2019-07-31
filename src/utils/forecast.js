const request = require( 'request' );

const forecastFxn = ( longitude, latitude, callback ) => {
	const url = 'https://api.darksky.net/forecast/a975433485929984f3f4d58df4912049/' + encodeURIComponent( latitude ) + ',' + encodeURIComponent( longitude ) + '?units=si';
	request( {
		url,
		json: true
	}, ( error, {
		body
	} ={} ) => {
		if ( error ) {
			callback( 'Unable to connect with Weather Services. Make sure you have an active internet connection and try again', undefined );
		} else if ( body.error ) {
			callback( 'Unable to locate area. Please try again with a different search term', undefined );
		} else {
			callback( undefined, {
				TimeZone: body.timezone,
				Summary: body.currently.summary,
				ChanceOfRain: body.currently.precipProbability,
				Temperature: body.currently.temperature,
				Humidity: body.currently.humidity,
				Visibility: body.currently.visibility,
				WeekSummary: body.daily.summary,
				DailyForecast: [ {
					Summary: body.daily.data[ 0 ].summary,
					TemperatureHigh: body.daily.data[ 0 ].temperatureHigh,
					TemperatureLow: body.daily.data[ 0 ].temperatureLow,
					Humidity: body.daily.data[ 0 ].humidity,
					PrecipProbaility: body.daily.data[ 0 ].precipProbability
				}, {
					Summary: body.daily.data[ 1 ].summary,
					TemperatureHigh: body.daily.data[ 1 ].temperatureHigh,
					TemperatureLow: body.daily.data[ 1 ].temperatureLow,
					Humidity: body.daily.data[ 1 ].humidity,
					PrecipProbaility: body.daily.data[ 1 ].precipProbability
				}, {
					Summary: body.daily.data[ 2 ].summary,
					TemperatureHigh: body.daily.data[ 2 ].temperatureHigh,
					TemperatureLow: body.daily.data[ 2 ].temperatureLow,
					Humidity: body.daily.data[ 2 ].humidity,
					PrecipProbaility: body.daily.data[ 2 ].precipProbability
				}, {
					Summary: body.daily.data[ 3 ].summary,
					TemperatureHigh: body.daily.data[ 3 ].temperatureHigh,
					TemperatureLow: body.daily.data[ 3 ].temperatureLow,
					Humidity: body.daily.data[ 3 ].humidity,
					PrecipProbaility: body.daily.data[ 3 ].precipProbability
				}, {
					Summary: body.daily.data[ 4 ].summary,
					TemperatureHigh: body.daily.data[ 4 ].temperatureHigh,
					TemperatureLow: body.daily.data[ 4 ].temperatureLow,
					Humidity: body.daily.data[ 4 ].humidity,
					PrecipProbaility: body.daily.data[ 4 ].precipProbability
				}, {
					Summary: body.daily.data[ 5 ].summary,
					TemperatureHigh: body.daily.data[ 5 ].temperatureHigh,
					TemperatureLow: body.daily.data[ 5 ].temperatureLow,
					Humidity: body.daily.data[ 5 ].humidity,
					PrecipProbaility: body.daily.data[ 5 ].precipProbability
				}, {
					Summary: body.daily.data[ 6 ].summary,
					TemperatureHigh: body.daily.data[ 6 ].temperatureHigh,
					TemperatureLow: body.daily.data[ 6 ].temperatureLow,
					Humidity: body.daily.data[ 6 ].humidity,
					PrecipProbaility: body.daily.data[ 6 ].precipProbability
				}, {
					Summary: body.daily.data[ 7 ].summary,
					TemperatureHigh: body.daily.data[ 7 ].temperatureHigh,
					TemperatureLow: body.daily.data[ 7 ].temperatureLow,
					Humidity: body.daily.data[ 7 ].humidity,
					PrecipProbaility: body.daily.data[ 7 ].precipProbability
				} ]

			} )
		}
	} )
}


// forecastFxn( 4.901209, -1.774001, ( error, data ) => {
// 	console.log( error );
// 	console.log( data );
// } )


module.exports = forecastFxn;
