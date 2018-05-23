const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
    .command('search', 'Search for address', {
        address: {
            describe: 'Address line',
            demand: true,
            alias: 'a',
            string: true
        }
    }).help().argv;


geocode.geocodeAddress(argv.address, (errorMessage, result) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        weather.getWeather(result.latitude, result.longitude, (body) => showForecast(body));
    };
});

var showForecast = (json) => {
    console.log('Latitude:', json.latitude);
    console.log('Longitude', json.longitude);

    var currently = {
        Resumo: json.currently.summary,
        Temperatura: json.currently.temperature + "°C"
    };
    var week = {
        Resumo: json.daily.summary,
        Diariamente: []
    };

    console.log('Atual:', JSON.stringify(currently, undefined, 2));
    json.daily.data.forEach((element, i) => {
        week.Diariamente.push({
            Dia: i,
            Resumo: element.summary,
            TemperaturaMaxima: element.temperatureHigh + "°C",
            TemperaturaMinima: element.temperatureLow + "°C"
        });
    });
    console.log('Próximos 7 dias (contando hoje):', JSON.stringify(week, undefined, 2));
};

