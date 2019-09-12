const hbs = require( 'hbs' );
const path = require( 'path' )
const express = require( 'express' );
const geoCode = require( './utils/geoCode' );
const forecast = require( './utils/forecast' );

const app = express();
const port = process.env.PORT || 3000;
//Define paths for express config
let public = path.join( __dirname, '../public' );
let viewsPath = path.join( __dirname, '../templates/views' );
let partialsPath = path.join( __dirname, '../templates/partials' );

//Set up handlebars engine and views location
app.set( 'view engine', 'hbs' );
app.set( 'views', viewsPath );

//Register partials with hbs
hbs.registerPartials( partialsPath );

//Setup static directory to serve up static files
app.use( express.static( public ) );

app.get( '', ( req, res ) => {
	res.render( 'index', {
		title: 'Welcome to SearWeatherapp',
		name: 'Joojo Quartey',
		age: 24,


	} )
} )

app.get( '/about', ( req, res ) => {
	res.render( 'about', {
		title: 'Hello And Welcome to my about page',
		body: 'When you go to the about route this is what you get',
		name: 'Joojo Quartey'
	} )
} )

app.get( '/help', ( req, res ) => {
	res.render( 'help', {
		title: 'Help Page',
		body: 'Do you need help?',
		name: 'Joojo Quartey'
	} )
} )

app.get( '/getYourForecast', ( req, res ) => {
	if ( !req.query.longitude && !req.query.latitude ) {
		return res.send( {
			error: 'Could not locate'
		} )
	}


	forecast( req.query.longitude, req.query.latitude, ( error, {
		TimeZone,
		Summary,
		ChanceOfRain,
		Temperature,
		Humidity,
		Visibility,
		WeekSummary
	} = {} ) => {
		if ( error ) {
			return res.send( {
				error
			} );
		}

		res.send( {
			forecast: [ {
				TimeZone,
				Summary,
				ChanceOfRain,
				Temperature,
				Humidity,
				Visibility,
				WeekSummary
			} ]
		} )
	} )


} )



app.get( '/getWeather', ( req, res ) => {
	if ( !req.query.address ) {
		return res.send( {
			error: 'You must provide an address'
		} )
	}

	geoCode( req.query.address, ( error, {
		placeName,
		longitude,
		latitude
	} = {} ) => {
		if ( error ) {
			return res.send( {
				error
			} );
		}


		forecast( longitude, latitude, ( error, {
			TimeZone,
			Summary,
			ChanceOfRain,
			Temperature,
			Humidity,
			Visibility,
			WeekSummary,
			DailyForecast
		} = {} ) => {
			if ( error ) {
				return res.send( {
					error
				} );
			}

			res.send( {

				address: req.query.address,
				location: placeName,
				forecast: [ {
					TimeZone,
					Summary,
					ChanceOfRain,
					Temperature,
					Humidity,
					Visibility,
					WeekSummary,
					DailyForecast
				} ]

			} );


		} )


	} )

} )



// app.get( '/help/*', ( req, res ) => {
// 	res.render( '404', {
// 		title: 'Error Article Not Found'
// 	} )
// } )

app.get( '*', ( req, res ) => {
	res.render( '404', {
		title: 'Page Not Found',
		name: 'Joojo Quartey'
	} );

} )

app.listen( port, () => {
	console.log( 'Server started on port ' + port );
} )