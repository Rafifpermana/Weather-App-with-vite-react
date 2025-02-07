// App.jsx
import { useState } from "react";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";
import { processForecastData } from "./utils/weatherUtils";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_OPEN_WEATHER_MAP_KEY;

  const fetchWeather = async () => {
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
      <div className="d-flex justify-content-center mb-3">
        <input
          type="text"
          className="form-control w-50 me-2"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          className="btn btn-primary"
          onClick={fetchWeather}
          disabled={loading}
        >
          {loading ? "Loading..." : "Get Weather"}
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {weatherData && <WeatherCard weatherData={weatherData} />}
      {forecastData.length > 0 && <ForecastCard forecastData={forecastData} />}
    </div>
  );
}

export default App;
