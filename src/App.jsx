import { useState } from "react";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";
import SearchBar from "./common/SearchBar";
import { processForecastData } from "./utils/weatherUtils";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_OPEN_WEATHER_MAP_KEY;

  const fetchWeather = async (city) => {
    if (!city) return;

    setLoading(true);
    setError(null);

    try {
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!weatherResponse.ok) throw new Error("City not found");

      const weatherData = await weatherResponse.json();
      setWeatherData(weatherData);

      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!forecastResponse.ok) throw new Error("Forecast data not found");

      const forecastData = await forecastResponse.json();
      setForecastData(processForecastData(forecastData));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 text-center">
      <h1 className="mb-4">Weather App</h1>

      {/* Search Bar */}
      <SearchBar onSearch={fetchWeather} loading={loading} />

      {/* Error Message */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Weather Data */}
      {weatherData && <WeatherCard weatherData={weatherData} />}
      {forecastData.length > 0 && <ForecastCard forecastData={forecastData} />}
    </div>
  );
}

export default App;
