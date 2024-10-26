# Weather App

This Weather App is an Express.js API that fetches current weather data for a specified city using the OpenWeatherMap API. The app provides real-time weather details such as temperature, humidity, wind speed, and a summary forecast. It also includes alerts for high and low temperatures.

## Features

- **City-based Weather Search:** Get weather information for any city.
- **Real-time Data:** Provides up-to-date temperature, humidity, and wind speed.
- **Threshold Alerts:** Alerts for high and low temperatures based on configurable thresholds.
- **Weather Forecast Summary:** Displays a brief forecast summary based on recent weather data.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/weather-app.git
   cd weather-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up the `.env` file:**

   Create a `.env` file in the root directory of the project and add the following environment variables:

   ```plaintext
   PORT=5000
   OPENWEATHER_API_KEY=your_openweather_api_key
   ```

4. **Run the app:**
   ```bash
   npm start
   ```

   The server will start on the specified port (default: `5000`).

## Desktop Preview


## Alert Conditions

The app issues temperature alerts:
- **High temperature:** Greater than 35°C.
- **Low temperature:** Lower than 15°C.
