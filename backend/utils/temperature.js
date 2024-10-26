const kelvinToCelsius = (kelvin) => (kelvin - 273.15).toFixed(2);
const kelvinToFahrenheit = (kelvin) => ((kelvin - 273.15) * 9/5 + 32).toFixed(2);
const celsiusToFahrenheit = (celsius) => (celsius * 9/5 + 32).toFixed(2);
const fahrenheitToCelsius = (fahrenheit) => ((fahrenheit - 32) * 5/9).toFixed(2);

const convertTemperature = (value, fromUnit, toUnit) => {
    if (fromUnit === toUnit) return value;

    switch (`${fromUnit}-${toUnit}`) {
        case 'kelvin-celsius':
            return kelvinToCelsius(value);
        case 'kelvin-fahrenheit':
            return kelvinToFahrenheit(value);
        case 'celsius-fahrenheit':
            return celsiusToFahrenheit(value);
        case 'fahrenheit-celsius':
            return fahrenheitToCelsius(value);
        default:
            throw new Error('Unsupported temperature conversion');
    }
};

const getWeatherSummary = (weatherData) => {
    const conditions = weatherData.weather[0].main.toLowerCase();
    const temp = parseFloat(weatherData.main.temp);
    const windSpeed = weatherData.wind.speed;
    
    let summary = `Current conditions are ${conditions} with a temperature of ${temp}°C. `;
    
    if (windSpeed > 10) {
        summary += 'Strong winds are present. ';
    }
    
    if (weatherData.main.humidity > 80) {
        summary += 'Humidity is high. ';
    }
    
    return summary.trim();
};

module.exports = {
    kelvinToCelsius,
    kelvinToFahrenheit,
    celsiusToFahrenheit,
    fahrenheitToCelsius,
    convertTemperature,
    getWeatherSummary
};