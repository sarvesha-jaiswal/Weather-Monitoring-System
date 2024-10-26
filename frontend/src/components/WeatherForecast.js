
import React from 'react';
import './WeatherForecast.css';

const WeatherForecast = ({ forecast, unit }) => {
    if (!forecast || forecast.length === 0) return null;

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="forecast-container">
            <h2>5-Day Forecast</h2>
            <div className="forecast-grid">
                {forecast.map((day, index) => (
                    <div key={index} className="forecast-card">
                        <span>{formatDate(day.date)}</span>
                        <p>{day.temp.max}°{unit === 'celsius' ? 'C' : 'F'}</p>
                        <p>{day.temp.min}°{unit === 'celsius' ? 'C' : 'F'}</p>
                        <p>{day.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeatherForecast;
