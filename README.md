# Osoro
Nodejs Weather Application

## About
Osoro is a weather application whose services are written in Nodejs and front-end written with basic HTML, css and javascript
Osoro makes HTTP requests with [Request](https://www.npmjs.com/package/request) and Ajax, and serves up weather information to the client.
This project also makes use of the HTML5 Geolocation API to fetch location of the client and provide corresponding weather information.

## Prerequisites
* Install [Nodejs](https://nodejs.org) from this hyperlink
or you can install using [Chocolatey](https://chocolatey.org) by running 

  ```
  choco install nodejs
  ```
  in your terminal

## Built with
* [Hbs](https://www.npmjs.com/package/hbs) - The templating engine used
* [DarkSky API](https://www.darksky.net) - The weather API used
* [Mapbox API](https://docs.mapbox.com/api/) - The Geocoding API used
* [Request](https://www.npmjs.com/package/request) - The HTTP request making module used
* [Express](https://www.npmjs.com/express) - The HTTP Server used
* Jquery
* Ajax
* [Nodejs](https://nodejs.org) - The runtime environment used 


## Deployment

### To clone this repository 
Type this into your command line,
  ```
  git clone https://github.com/eustacequartey/osoro-weather.git
  ```

### To Deploy
* In the Directory of the cloned project type 
  ```
  npm install && npm run start
  ```
* Open a new tab in your browser and navigate to http://127.0.0.1:value, where value is the port number which would be displayed on the cli
  after the program is started
  
  
  ## Author
  Joojo Quartey
