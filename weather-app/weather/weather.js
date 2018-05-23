const request = require('request');
const config = require('./../configuration/configManager');

var getWeather = (latitude, longitude, callback) => {
    request({
        uri: `https://api.darksky.net/forecast/${config.getForecastApiKey()}/${latitude},${longitude}?lang=pt&units=si&exclude=minutely,alerts,flags,hourly`,
        json: true,
    }, (error, response, body) => {
        if (error) {
            console.log('There was an error while geting the forecast:', error);
        } else if (response.statusCode === 200) {
            callback(body);
        } else {
            console.log('No data found');
        }
    });
};

module.exports = {
    getWeather
}