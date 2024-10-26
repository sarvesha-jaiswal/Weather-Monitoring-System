/*import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import WeatherSummary from './components/WeatherSummary';
import Alerts from './components/Alerts';
import { fetchCurrentWeather } from './services/apiService';
import './App.css';

function App() {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [alerts, setAlerts] = useState([]);

    const handleSearch = async () => {
        if (!city) {
            console.error('City input is empty');
            return; 
        }
        
        try {
            const weatherData = await fetchCurrentWeather(city); // Use the city variable
            console.log(weatherData);
            // Use setWeatherData to store the fetched data
            setWeatherData(weatherData);
            // Use setAlerts if there are alerts in the data
            if (weatherData.alerts) {
                setAlerts(weatherData.alerts);
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };
    
    
    

    return (
        <div className="App">
            <h1>Weather Monitoring System</h1>
            <SearchBar onSearch={handleSearch} />
            {weatherData && (
                <>
                    <WeatherSummary data={weatherData} />
                    <Alerts data={alerts} />
                </>
            )}
        </div>
    );
}

export default App;*/
import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import WeatherSummary from './components/WeatherSummary';
import Alerts from './components/Alerts';
import './App.css';

function App() {
    const [weatherData, setWeatherData] = useState(null);

    const handleSearch = (data) => {
        setWeatherData(data);
    };

    return (
        <div className="App">
            <h1>Weather Monitoring System</h1>
            <SearchBar onSearch={handleSearch} />
            {weatherData && (
                <>
                    <WeatherSummary data={weatherData} />
                    <Alerts data={weatherData.current.alerts || []} />
                </>
            )}
        </div>
    );
}

export default App;