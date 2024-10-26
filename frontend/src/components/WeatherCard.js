// src/components/WeatherCard.js
import React from 'react';
import './WeatherCard.css';

const WeatherCard = ({ data }) => {
    return (
        <div className="weather-card">
            <h2>{data.city}</h2>
            <div className="weather-info">
                <p><strong>Weather:</strong> {data.main}</p>
                <p><strong>Temperature:</strong> {data.temp}°C</p>
                <p><strong>Feels Like:</strong> {data.feels_like}°C</p>
                <p><strong>Humidity:</strong> {data.humidity}%</p>
                <p><strong>Wind Speed:</strong> {data.wind_speed} m/s</p>
                <p><strong>Last Updated:</strong> {new Date(data.dt * 1000).toLocaleString()}</p>
            </div>
        </div>
    );
};

export default WeatherCard;
