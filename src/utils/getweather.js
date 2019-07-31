const geoCode = require('./geoCode');
const forecast = require('./forecast');


	geoCode(city, (error, data)=>{
		if (error){
			return console.log(error);
		}

		forecast(data.longitude, data.latitude, (error, item)=>{

			if(error){
				return console.log(error)
			}

			console.log(data.placeName);
			console.log(item);
		})
	})
