// apiService.js
export const fetchCurrentWeather = async (city) => {
    try {
        const response = await fetch(`http://localhost:5000/api/weather/search?city=${city}`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching current weather:', error);
        throw error;
    }
};
