import PropTypes from "prop-types";
import info from "../assets/information-line.png";
import { getHumidityDescription } from "../utils/weatherUtils";

const WeatherCard = ({ weatherData }) => {
  return (
    <div className="card mx-auto p-4 shadow-lg" style={{ maxWidth: "400px" }}>
      <div className="card-body">
        <h2 className="card-title fw-bold">{weatherData.name}</h2>
        <p className="card-text fs-5">Temperature: {weatherData.main.temp}°C</p>
        <p className="card-text fs-5">
          Weather: {weatherData.weather[0].description}
        </p>

        <div className="d-flex flex-column mb-3">
          <p className="card-text fs-5">
            Humidity: {weatherData.main.humidity}%
            <span
              className="ms-2 text-muted"
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
  );
};

// Tambahkan validasi props
WeatherCard.propTypes = {
  weatherData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    main: PropTypes.shape({
      temp: PropTypes.number.isRequired,
      humidity: PropTypes.number.isRequired,
    }).isRequired,
    weather: PropTypes.arrayOf(
      PropTypes.shape({
        description: PropTypes.string.isRequired,
      })
    ).isRequired,
    wind: PropTypes.shape({
      speed: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default WeatherCard;
