import React, { useState } from 'react';
import { fetchCurrentWeather } from '../services/apiService';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        if (!city) {
            setError('City input is empty');
            return;
        }

        setLoading(true);
        setError(''); // Clear any previous error

        try {
            const data = await fetchCurrentWeather(city);
            onSearch(data); // Pass the data up to parent component
        } catch (error) {
            console.error('Error fetching weather data:', error);
            setError('Error fetching weather data');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="search-container">
            <input
                type="text"
                id="city-input"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city"
                className="search-input"
            />
            <button onClick={handleSearch} className="search-button">Search</button>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default SearchBar;