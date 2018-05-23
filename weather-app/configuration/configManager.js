const fs = require('fs');

const CONFIG_FILE_NAME = './configuration/config.json';

var getGoogleApiKey = () => {
    try {
        var file = fs.readFileSync(CONFIG_FILE_NAME);
        return JSON.parse(file).googleApiKey;
    } catch (error) {
        console.log(error);
    }
};

var getForecastApiKey = () => {
    try {
        var file = fs.readFileSync(CONFIG_FILE_NAME);
        return JSON.parse(file).forecastIOKey;
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getGoogleApiKey,
    getForecastApiKey
};
