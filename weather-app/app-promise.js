const yargs = require('yargs');
const axios = require('axios');
const config = require('./configuration/configManager');

const argv = yargs
    .options({
        a: {
            describe: 'Address line',
            demand: true,
            alias: 'address',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var geocodeUrl = `https://maps.google.com/maps/api/geocode/json?key=${config.getGoogleApiKey()}&address=${encodeURIComponent(argv.address)}`;
axios.get(geocodeUrl).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find address.')
    }
    var latitude = response.data.results[0].geometry.location.lat;
    var longitude = response.data.results[0].geometry.location.lng;
    var weatherURL = `https://api.darksky.net/forecast/${config.getForecastApiKey()}/${latitude},${longitude}?lang=pt&units=si&exclude=minutely,alerts,flags,hourly`

    console.log(response.data.results[0].formatted_address);

    return axios.get(weatherURL);
}).then((response) => {

    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;

    console.log(`It's currently ${temperature} and it feels like ${apparentTemperature}`)
}).catch((e) => {
    if (e.code === 'ECONNREFUSED') {
        console.log('Unable to connect to API servers.', )
    } else {
        console.log(e.message);
    }
});