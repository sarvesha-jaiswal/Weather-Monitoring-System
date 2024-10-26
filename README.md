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

![Screenshot 2024-10-26 160659](https://github.com/user-attachments/assets/6f820e2d-3682-4c73-82e6-700eba2da142)
![Screenshot 2024-10-26 160712](https://github.com/user-attachments/assets/69e6b0cc-c9e5-4145-9833-4d49e4e0ccfa)
![Screenshot 2024-10-26 160731](https://github.com/user-attachments/assets/44450237-e898-4ed8-880d-5db64205c14f)



## Alert Conditions

The app issues temperature alerts:
- **High temperature:** Greater than 35°C.
- **Low temperature:** Lower than 15°C.
