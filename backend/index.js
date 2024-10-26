// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

// In-memory storage for weather history
const weatherStorage = {
    history: {},
    getHistory(city) {
        return this.history[city] || [];
    },
    addRecord(city, record) {
        if (!this.history[city]) {
            this.history[city] = [];
        }
        this.history[city].push({
            ...record,
            timestamp: new Date()
        });

        // Keep only last 24 hours of data
        const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        this.history[city] = this.history[city].filter(
            record => record.timestamp > oneDayAgo
        );
    },
    getSummary(city) {
        const records = this.getHistory(city);
        if (records.length === 0) {
            return null;
        }

        return {
            average_temp: (records.reduce((sum, record) => sum + parseFloat(record.temp), 0) / records.length).toFixed(2),
            average_humidity: (records.reduce((sum, record) => sum + record.humidity, 0) / records.length).toFixed(2),
            average_wind_speed: (records.reduce((sum, record) => sum + record.wind_speed, 0) / records.length).toFixed(2),
            record_count: records.length,
            last_updated: records[records.length - 1].timestamp
        };
    }
};

const apiKey = '87620f01823f76df681831b7b4069001';

// Helper function to convert Kelvin to Celsius
const kelvinToCelsius = (kelvin) => (kelvin - 273.15).toFixed(2);

// Function to check alert thresholds
const checkThresholds = (temp) => {
    const alerts = [];
    const tempNum = parseFloat(temp);
    
    if (tempNum > 35) {
        alerts.push({
            type: 'warning',
            message: `High temperature alert: ${temp}°C exceeds threshold of 35°C`
        });
    }
    if (tempNum < 15) {
        alerts.push({
            type: 'warning',
            message: `Low temperature alert: ${temp}°C below threshold of 15°C`
        });
    }
    return alerts;
};

// Weather search endpoint with summary
app.get('/api/weather/search', async (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.status(400).json({ error: "City name is required" });
    }

    try {
        // Get current weather
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
        );
        const data = response.data;
        
        // Get forecast
        const forecastResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
        );
        const forecastData = forecastResponse.data;

        // Process current weather
        const temp = kelvinToCelsius(data.main.temp);
        const weatherInfo = {
            city: data.name,
            main: data.weather[0].main,
            temp,
            feels_like: kelvinToCelsius(data.main.feels_like),
            humidity: data.main.humidity,
            wind_speed: data.wind.speed,
            dt: data.dt,
            alerts: checkThresholds(temp)
        };

        // Add to history
        weatherStorage.addRecord(city, weatherInfo);

        // Process forecast data
        const nextFiveDays = forecastData.list.slice(0, 5);
        const forecastSummary = {
            average_temp: (nextFiveDays.reduce((sum, day) => 
                sum + (day.main.temp - 273.15), 0) / nextFiveDays.length
            ).toFixed(2),
            max_temp: (Math.max(...nextFiveDays.map(day => day.main.temp)) - 273.15).toFixed(2),
            min_temp: (Math.min(...nextFiveDays.map(day => day.main.temp)) - 273.15).toFixed(2),
            average_humidity: (nextFiveDays.reduce((sum, day) => 
                sum + day.main.humidity, 0) / nextFiveDays.length
            ).toFixed(2),
            average_wind_speed: (nextFiveDays.reduce((sum, day) => 
                sum + day.wind.speed, 0) / nextFiveDays.length
            ).toFixed(2)
        };

        // Get historical summary
        const historicalSummary = weatherStorage.getSummary(city);

        // Combine all data
        const response_data = {
            current: weatherInfo,
            forecast_summary: {
                ...forecastSummary,
                forecast_period: "Next 5 readings"
            },
            historical_summary: historicalSummary || {
                message: "No historical data available yet"
            }
        };

        res.json(response_data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ 
            error: 'Error fetching weather data',
            details: error.response ? error.response.data : error.message 
        });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});