const request = require('request');

const forecast = (latitude, longitude, callback) => {
    
    const url = 'https://api.darksky.net/forecast/3de404e650c235f363b03a6557d5c8b1/' + latitude + ',' + longitude + '?units=si';

    request({ url, json: true }, (error, {body} = {}) => {
        
        if (error) {

            callback('Unable to connect to weather service', undefined);
            
        } else if (body.error) {

            callback('Unable to find location', undefined);
        
        } else {
            const {temperature, precipProbability} = body.currently

            callback(undefined, {

                summary: body.daily.data[0].summary,
                temperature,
                precipProbability
            })
            
        }
            
    });
}

module.exports = {
    forecast
}