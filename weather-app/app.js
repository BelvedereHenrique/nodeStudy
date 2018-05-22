const yargs = require('yargs');

const geocode = require('./geocode/geocode')

const argv = yargs
    .command('search', 'Search for address', {
        key: {
            describe: 'Google Maps API key',
            demand: true,
            alias: 'k'
        },
        address: {
            describe: 'Address line',
            demand: true,
            alias: 'a',
            string: true
        }
    })
    .help()
    .argv;

geocode.geocodeAddress(argv.address, argv.key, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(JSON.stringify(results, undefined, 2));
    }
});


