import { useState } from "react";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";
import { processForecastData } from "./utils/weatherUtils";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./style/SearchBar.css";

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

      {/* Search Bar */}
      <div className="d-flex justify-content-center mt-4 mb-4">
        <div className="input-group shadow-sm rounded-pill w-50 w-md-75 w-lg-50">
          {/* Ikon Search */}
          <span className="input-group-text bg-white border-0 ps-4">
            <i className="bi bi-search text-secondary"></i>
          </span>

          {/* Input Field */}
          <input
            type="text"
            className="form-control border-0 shadow-none fs-6"
            placeholder="Search anything..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          {/* Tombol Search */}
          <button
            className="btn btn-primary rounded-pill px-lg-4 px-md-3 px-2"
            onClick={fetchWeather}
            disabled={loading}
          >
            {loading ? "Loading..." : "Search"}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Weather Data */}
      {weatherData && <WeatherCard weatherData={weatherData} />}
      {forecastData.length > 0 && <ForecastCard forecastData={forecastData} />}
    </div>
  );
}

export default App;
