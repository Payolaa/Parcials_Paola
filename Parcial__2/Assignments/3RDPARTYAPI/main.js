const express = require('express');
const https = require("https");
const app = express();

app.use(express.static(__dirname));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const apiKey = '9409aa42251b525dec0e0b73e443d0d9';

// Home route to serve the index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Weather route to fetch weather data
app.get('/weather', (req, res) => {
    const city = req.query.cityName; // Get city name from query parameter
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    https.get(url, (response) => {
        let data = '';

        // Collect the data
        response.on('data', (chunk) => {
            data += chunk;
        });

        // Process the complete response
        response.on('end', () => {
            try {
                const weatherData = JSON.parse(data); 

                if (weatherData.cod !== 200) {
                    res.send(`<h1>Error fetching weather data: ${weatherData.message}</h1>`);
                    return; // Ensure we exit to avoid sending more responses
                }

                const temp = weatherData.main.temp;
                const description = weatherData.weather[0].description;
                const icon = weatherData.weather[0].icon;
                const imgURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

                // Send the response to the client
                res.send(`
                    <br>
                    <h1><b> Weather in ${city} </b></h1>
                    <br>
                    <p>Temperature: ${temp} °C</p>
                    <p>Description: ${description}</p>
                    <img src="${imgURL}" alt="Weather icon">
                    <br>
                    <br>
                    <a href="/"> HOME </a>
                `);
            } catch (err) {
                res.send('<h1>Error processing weather data</h1>');
            }
        });
        
    }).on('error', (e) => {
        res.send('<h1>The system has failed to get data from API</h1>');
    });
});

app.listen(8000, () => {
    console.log("Listening on port 8000");
});
