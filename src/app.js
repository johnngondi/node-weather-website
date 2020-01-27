const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//Define Paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static diretory to server
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'John'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Author',
        name: 'John'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpMessage: 'This is how you do it',
        name: 'John'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {

        return res.send({
            error: 'You must provide an address'
        });
        
    }

    const address = req.query.address;
       
    geocode.geoCode(address, (error, data) => {

        if (error) {
            return res.send({
                error
            });
        }

        const {latitude, longitude, location} = data;
        
        forecast.forecast(latitude,longitude, (error, forecastData) => {
            
            if (error) {
                return res.send({
                    error
                });
            }
            const {summary, temperature, precipProbability} = forecastData;
            res.send({
                forecast: summary + ' It is currently ' + temperature + ' degrees out. There is a ' + precipProbability + '% chance of rain',
                location: 'Forecast data for ' + location
            });
            
        });

    });

   
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Page not Found',
        errorMessage: 'Help Article not found',
        name: 'John'
    });
});

app.get('/products', (req, res) => {

    if (!req.query.search) {
       return res.send({
           error: 'You must provide search term.'
       });
    }

    console.log(req.query);
    

    res.send({
        products: []
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page not Found',
        errorMessage: 'Page not found',
        name: 'John'
    });
});

app.listen(port, () => {
    console.log('Server is up on port ' + port + '.');
});
