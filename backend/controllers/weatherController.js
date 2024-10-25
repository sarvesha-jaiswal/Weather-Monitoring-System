const axios = require('axios');
require('dotenv').config();

const Weather = require('/models/weather'); 

const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Assuming your schema is in models/weather.js

const apiKey = 'YOUR_OPENWEATHER_API_KEY'; // Replace with your OpenWeather API key

exports.searchWeather = async (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.status(400).json({ error: "City name is required" });
    }

    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
        const data = response.data;

        const temp = kelvinToCelsius(data.main.temp);
        const feels_like = kelvinToCelsius(data.main.feels_like);
        const humidity = data.main.humidity;
        const wind_speed = data.wind.speed;

        // Update or create weather entry in MongoDB
        let weatherEntry = await Weather.findOne({ city: city });
        
        if (!weatherEntry) {
            weatherEntry = new Weather({
                city: data.name,
                main: data.weather[0].main,
                temp,
                feels_like,
                humidity,
                wind_speed,
                dt: data.dt,
                alerts: [] // Add alerts if applicable
            });
        } else {
            // Update existing entry
            weatherEntry.temp = temp;
            weatherEntry.feels_like = feels_like;
            weatherEntry.humidity = humidity;
            weatherEntry.wind_speed = wind_speed;
            weatherEntry.dt = data.dt;
            weatherEntry.main = data.weather[0].main;

            // Push current weather data to history
            weatherEntry.history.push({
                temp: temp,
                humidity: humidity,
                wind_speed: wind_speed,
                main: data.weather[0].main
            });
        }

        // Save the entry
        await weatherEntry.save();

        // Get summary
        const summary = weatherEntry.getSummary();

        res.json(summary);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).send('Error fetching weather data');
    }
};

// Helper function to convert Kelvin to Celsius
function kelvinToCelsius(kelvin) {
    return (kelvin - 273.15).toFixed(2);
}



const weatherController = {
    // Search weather for a city
    async searchWeather(req, res) {
        try {
            const { city } = req.query;
            if (!city) {
                return res.status(400).json({ error: 'City parameter is required' });
            }

            // Log API Key for verification
            console.log('OpenWeather API Key:', API_KEY);

            // Get current weather
            const currentWeather = await axios.get(
                `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
            );
            console.log('Current Weather Response:', currentWeather.data);

            // Get forecast data
            const forecast = await axios.get(
                `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
            );
            console.log('Forecast Response:', forecast.data);

            // Process forecast data for summary
            const nextFiveDays = forecast.data.list.slice(0, 5);
            const summary = {
                avgTemp: (nextFiveDays.reduce((sum, day) => sum + day.main.temp, 0) / nextFiveDays.length).toFixed(2),
                maxTemp: Math.max(...nextFiveDays.map(day => day.main.temp)).toFixed(2),
                minTemp: Math.min(...nextFiveDays.map(day => day.main.temp)).toFixed(2),
                avgHumidity: (nextFiveDays.reduce((sum, day) => sum + day.main.humidity, 0) / nextFiveDays.length).toFixed(2),
                avgWindSpeed: (nextFiveDays.reduce((sum, day) => sum + day.wind.speed, 0) / nextFiveDays.length).toFixed(2),
                commonWeather: findMostCommonWeather(nextFiveDays)
            };

            // Format response
            const weatherData = {
                city: currentWeather.data.name,
                main: currentWeather.data.weather[0].main,
                temp: currentWeather.data.main.temp.toFixed(2),
                feels_like: currentWeather.data.main.feels_like.toFixed(2),
                humidity: currentWeather.data.main.humidity,
                wind_speed: currentWeather.data.wind.speed,
                dt: currentWeather.data.dt,
                alerts: [],
                forecast_summary: {
                    average_temp: summary.avgTemp,
                    max_temp: summary.maxTemp,
                    min_temp: summary.minTemp,
                    average_humidity: summary.avgHumidity,
                    average_wind_speed: summary.avgWindSpeed,
                    common_weather_condition: summary.commonWeather,
                    forecast_period: "Next 5 readings"
                }
            };

            res.json(weatherData);
        } catch (error) {
            // Enhanced error logging
            console.error('Weather search error:', error.response ? error.response.data : error.message);
            res.status(500).json({ error: error.response ? error.response.data : error.message });
        }
    }
};

// Helper function to find the most common weather condition
function findMostCommonWeather(forecastData) {
    const weatherCounts = forecastData.reduce((acc, day) => {
        const weather = day.weather[0].main;
        acc[weather] = (acc[weather] || 0) + 1;
        return acc;
    }, {});

    return Object.entries(weatherCounts)
        .reduce((a, b) => a[1] > b[1] ? a : b)[0];
}

module.exports = weatherController;
