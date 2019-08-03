let button = '#submitButton';
let field = '#textarea1';
let table = '#table1 tbody';
let yourtable = '#yourlocationtable tbody';
let path = '/getWeather?address='
let clearButton = '#clearButton';
let locationButton = '#locationButton'
let longitude;
let latitude;
let date = new Date();



$( () => {
	getLocation();
	$( field ).on( "keydown", ( event ) => {
		// alert( event.type + ": " + event.which );
		if ( event.which == 13 ) {
			$( button ).click();
		}
	} );

	$( button ).click( () => {
		loadData();
	} )

	$( locationButton ).click( () => {
		yourForecast( longitude, latitude );
	} )

	registerSW();

} );

const loadData = () => {
	let searchTerm = $.trim( $( field ).val() );
	let url = path + encodeURIComponent( searchTerm );
	console.log( url );


	beforeSend();


	const request = new XMLHttpRequest();
	request.open( 'get', url, true );
	request.onload = () => {
		try {
			const json1 = JSON.parse( request.responseText );
			if ( json1.error ) {
				$( '#progress2' ).toggle();
				$( button ).prop( 'disabled', false );
				return $( '#table1 tbody' ).prepend( '<tr><td colspan=\"7\">' + json1.error + '</td></tr>' )
			}


			console.log( json1 );
			$( '#progress2' ).toggle();
			$( button ).prop( 'disabled', false );
			$( '#table1 tbody' ).prepend( "<tr><td>" + json1.location + "</td><td>" + json1.forecast[ 0 ].Summary + "</td><td>" + json1.forecast[ 0 ].ChanceOfRain + "</td><td>" + json1.forecast[ 0 ].Humidity + "</td><td>" + json1.forecast[ 0 ].Temperature + "</td><td>" + json1.forecast[ 0 ].TimeZone + "</td><td>" + json1.forecast[ 0 ].Visibility + "</td></tr>" )
			$( '#weeklysummary' ).html( json1.forecast[ 0 ].WeekSummary );
			var today = date.getDay();
			json1.forecast[ 0 ].DailyForecast.forEach( item => {
				$( '#dailyparagraph' ).append( '<div style=\"width:100%; border-radius:1%; margin-bottom:5px;\" class=\"center-align col 12 grey darken-3 white-text \"><p>(' + getDayString( today ) + "): " + item.Summary + '</p></div>' )
				today++;
			} )
		} catch ( e ) {
			console.warn( 'Load failed ' + e );
		}
	};
	request.send();

	$( field ).val( '' );
};

const getDayString = ( number ) => {
	if ( number == 0 || number == 7 ) {
		return 'Sunday';
	}
	if ( number == 1 || number == 8 ) {
		return 'Monday';
	} else if ( number == 2 || number == 9 ) {
		return 'Tuesday';
	} else if ( number == 3 || number == 10 ) {
		return 'Wednesday';
	} else if ( number == 4 || number == 11 ) {
		return 'Thursday';
	} else if ( number == 5 || number == 12) {
		return 'Friday';
	} else if ( number == 6 || number ==13 ) {
		return 'Saturday';
	}
}

const getLocation = () => {

	if ( navigator.geolocation ) {
		navigator.geolocation.getCurrentPosition( showPosition );
	} else {
		alert( 'Geolocation isnt supported' )
	}
}

const showPosition = ( {
	coords
} ) => {

	longitude = coords.longitude;
	latitude = coords.latitude;
}


const beforeSend = () => {
	$( '#table1 tbody' ).empty();
	$( '#progress2' ).toggle();
	$( button ).prop( 'disabled', true )
	$( '#dailyparagraph' ).html( '' );
}

const beforeSend1 = () => {
	$( yourtable ).empty();
	$( '#locationButton' ).prop( 'disabled', true );
	$( '#progress1' ).toggle();
}

const yourForecast = ( longitude, latitude ) => {
	let url = '/getYourForecast?longitude=' + encodeURIComponent( longitude ) + '&latitude=' + encodeURIComponent( latitude );
	const request = new XMLHttpRequest();
	request.open( 'get', url );
	beforeSend1();
	request.onload = () => {
		try {
			let parsedData = JSON.parse( request.responseText );
			console.log( parsedData );
			if ( parsedData.error ) {
				$( '#progress1' ).toggle();
				$( '#locationButton' ).prop( 'disabled', false );
				return $( yourtable ).prepend( '<tr><td class=\"center-align\" colspan=\"6\">' + parsedData.error + '</td></tr>' )

			}
			$( yourtable ).prepend( "<tr><td>" + parsedData.forecast[ 0 ].Summary + "</td><td>" + parsedData.forecast[ 0 ].ChanceOfRain + "</td><td>" + parsedData.forecast[ 0 ].Humidity + "</td><td>" + parsedData.forecast[ 0 ].Temperature + "</td><td>" + parsedData.forecast[ 0 ].TimeZone + "</td><td>" + parsedData.forecast[ 0 ].Visibility + "</td></tr>" )
			if ( parsedData.forecast[ 0 ].Summary == 'Overcast' ) {
				$( ".p-image" ).attr( "src", "../img/overcast.jpg" );
				$( '.title1' ).html( parsedData.forecast[ 0 ].Summary );
				$( '.title1' ).addClass( "white-text" );
			} else if ( parsedData.forecast[ 0 ].Summary == 'Humid and Mostly Cloudy' || parsedData.forecast[ 0 ].Summary == 'Mostly Cloudy' ) {
				$( ".p-image" ).attr( "src", "../img/cloudy.jpg" );
				$( '.title1' ).html( parsedData.forecast[ 0 ].Summary );
			} else if ( parsedData.forecast[ 0 ].Summary == 'Partly Cloudy' ) {
				$( ".p-image" ).attr( "src", "../img/partlycloudy.jpg" );
				$( '.title1' ).html( parsedData.forecast[ 0 ].Summary );
			} else if ( parsedData.forecast[ 0 ].Summary == 'Partly Cloudy' ) {
				$( ".p-image" ).attr( "src", "../img/drizzle.jpg" );
				$( '.title1' ).html( parsedData.forecast[ 0 ].Summary );
			} else if ( parsedData.forecast[ 0 ].Summary == 'Humid and Overcast' ) {
				$( ".p-image" ).attr( "src", "../img/humidandovercast.jpg" );
				$( '.title1' ).html( parsedData.forecast[ 0 ].Summary );
			} else if ( parsedData.forecast[ 0 ].Summary == 'Clear' ) {
				$( ".p-image" ).attr( "src", "../img/clear.jpg" );
				$( '.title1' ).html( parsedData.forecast[ 0 ].Summary );
			}

			$( '#locationButton' ).prop( 'disabled', false );
			$( '#progress1' ).toggle();

		} catch ( e ) {
			console.warn( e );
		}
	}
	request.send();

}


async function registerSW() {
	if ( 'serviceWorker' in navigator ) {
		try {
			await navigator.serviceWorker.register( './serviceWorker.js' );
		} catch ( e ) {
			console.log( 'SW registration failed' );
		}
	}
}