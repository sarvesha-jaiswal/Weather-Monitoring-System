import React from 'react';

const WeatherSummary = ({ data }) => {
    if (!data) return null;

    return (
        <div className="weather-summary">
            <h2>Weather in {data.current.city}</h2>
            <p>Main: {data.current.main}</p>
            <p>Temperature: {data.current.temp} °C</p>
            <p>Feels Like: {data.current.feels_like} °C</p>
            <p>Humidity: {data.current.humidity}%</p>
            <p>Wind Speed: {data.current.wind_speed} m/s</p>

            {data.forecast_summary && (
                <div className="forecast-summary">
                    <h3>Forecast Summary</h3>
                    <p>Average Temperature: {data.forecast_summary.average_temp}°C</p>
                    <p>Max Temperature: {data.forecast_summary.max_temp}°C</p>
                    <p>Min Temperature: {data.forecast_summary.min_temp}°C</p>
                    <p>Average Humidity: {data.forecast_summary.average_humidity}%</p>
                </div>
            )}

            {data.historical_summary && data.historical_summary.record_count > 0 && (
                <div className="historical-summary">
                    <h3>Historical Summary</h3>
                    <p>Average Temperature: {data.historical_summary.average_temp}°C</p>
                    <p>Average Humidity: {data.historical_summary.average_humidity}%</p>
                    <p>Records Count: {data.historical_summary.record_count}</p>
                </div>
            )}
        </div>
    );
};

export default WeatherSummary;