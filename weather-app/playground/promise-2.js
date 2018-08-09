const request = require('request');
const config = require('./../configuration/configManager');

var geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        request({
            url: `https://maps.google.com/maps/api/geocode/json?key=${config.getGoogleApiKey()}&address=${encodeURIComponent(address)}`,
            json: true
        }, (error, response, body) => {
            if (error) {
                reject('Error: ' + error);
            } else if (body.status != 'OK') {
                console.log(body.status);
                reject('Unable to find address.');
            } else{
                var result = body.results[0];
                resolve({
                    address: result.formatted_address,
                    latitude: result.geometry.location.lat,
                    longitude: result.geometry.location.lng
                });
            }
        });
    });
}

geocodeAddress('14801420').then((result) => {
    console.log(result);
}, (error) => {
    console.log(error);

})