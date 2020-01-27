const request = require('request');

const geoCode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoiam9obm5nb25kaSIsImEiOiJjazVtcW1yMzcwb2RpM21ydzh0NWF5aHZqIn0.vIdxHVzN-ZSJ4C1muZjErw&limit=1"
   
    request({url, json: true }, (error, {body} = {}) => {
        
        
        if (error) {
            
            callback('Unable to connect to location services', undefined);
        
        } else if (body.features.length === 0) {
            
            callback('Unable to find location. Try another search', undefined);
        
        } else {
          
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
        
            
    });
}

module.exports = {
    geoCode
}