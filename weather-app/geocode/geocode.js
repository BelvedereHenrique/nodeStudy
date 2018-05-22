const request = require('request');

var geocodeAddress = (address, key, callback) => {
    request({
        url: `https://maps.google.com/maps/api/geocode/json?key=${key}&address=${encodeURIComponent(address)}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Error: ' + error);
        } else if (body.status === 'ZERO_RESULTS') {
            callback('Unable to find address.');
        } else if (body.status === 'OK') {
            var result = body.results[0];
            callback(undefined, {
                address: result.formatted_address,
                latitude: result.geometry.location.lat,
                longitude: result.geometry.location.lng
            });
        }
    });
};


module.exports.geocodeAddress = geocodeAddress;