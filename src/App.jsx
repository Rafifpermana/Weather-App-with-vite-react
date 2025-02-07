import { useState } from "react";
import { motion } from "framer-motion";
import info from "../src/assets/information-line.png";
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
      // Fetch data cuaca saat ini
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!weatherResponse.ok) {
        throw new Error("City not found");
      }

      const weatherData = await weatherResponse.json();
      setWeatherData(weatherData);

      // Fetch data perkiraan cuaca 5 hari ke depan
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!forecastResponse.ok) {
        throw new Error("Forecast data not found");
      }

      const forecastData = await forecastResponse.json();

      // Memproses data agar menampilkan suhu rata-rata per hari
      const dailyForecast = {};
      forecastData.list.forEach((entry) => {
        const date = entry.dt_txt.split(" ")[0]; // Ambil hanya tanggal
        if (!dailyForecast[date]) {
          dailyForecast[date] = {
            tempSum: 0,
            count: 0,
            icon: entry.weather[0].icon,
          };
        }
        dailyForecast[date].tempSum += entry.main.temp;
        dailyForecast[date].count += 1;
      });

      const formattedForecast = Object.keys(dailyForecast).map((date) => ({
        date,
        avgTemp: (
          dailyForecast[date].tempSum / dailyForecast[date].count
        ).toFixed(1),
        icon: dailyForecast[date].icon,
      }));

      setForecastData(formattedForecast);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk mendapatkan deskripsi kelembapan
  const getHumidityDescription = (humidity) => {
    if (humidity < 30) return "Dry";
    if (humidity < 60) return "Normal";
    if (humidity < 80) return "Humid";
    return "Very Humid";
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

      {weatherData && (
        <div
          className="card mx-auto p-4 shadow-lg"
          style={{ maxWidth: "400px" }}
        >
          <div className="card-body">
            <h2 className="card-title fw-bold">{weatherData.name}</h2>
            <p className="card-text fs-5">
              Temperature: {weatherData.main.temp}°C
            </p>
            <p className="card-text fs-5">
              Weather: {weatherData.weather[0].description}
            </p>

            <div className="d-flex flex-column mb-3">
              <p className="card-text fs-5">
                Humidity: {weatherData.main.humidity}%
                <span
                  className="ms-2 text-muted"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title={getHumidityDescription(weatherData.main.humidity)}
                >
                  <img src={info} alt="Info" />
                </span>
              </p>
            </div>

            <p className="card-text fs-5">
              Wind Speed: {weatherData.wind.speed} m/s
            </p>
          </div>
        </div>
      )}

      {forecastData.length > 0 && (
        <div className="mt-4">
          <h2>5-Day Forecast</h2>
          <div className="d-flex flex-wrap justify-content-center">
            {forecastData.map((day, index) => (
              <motion.div
                key={day.date}
                className="card m-2 p-3 text-center shadow-sm"
                style={{ width: "150px", borderRadius: "10px" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h6 className="fw-bold">{day.date}</h6>
                <img
                  src={`https://openweathermap.org/img/wn/${day.icon}.png`}
                  alt="weather icon"
                />
                <p className="fs-5 fw-semibold">{day.avgTemp}°C</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
