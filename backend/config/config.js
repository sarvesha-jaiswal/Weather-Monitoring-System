require('dotenv').config();

module.exports = {
    port: process.env.PORT || 5000,
    openWeatherApiKey: process.env.OPENWEATHER_API_KEY,
    mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/weather-app',
    // Temperature thresholds (in Celsius)
    thresholds: {
        temperature: {
            high: 35,
            low: 0
        },
        humidity: {
            high: 80
        },
        windSpeed: {
            high: 20 // m/s
        }
    },
    // Forecast settings
    forecast: {
        daysToFetch: 5,
        updateInterval: 3600000 // 1 hour in milliseconds
    }
};