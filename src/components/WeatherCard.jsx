import PropTypes from "prop-types";
import info from "../assets/information-line.png";
import { getHumidityDescription } from "../utils/weatherUtils";
import { motion } from "framer-motion";
import moment from "moment-timezone";

const WeatherCard = ({ weatherData }) => {
  const getBackgroundColor = (description) => {
    switch (description.toLowerCase()) {
      case "stormy":
        return "#4a4a4a";
      case "clear":
        return "#87ceeb";
      case "overcast clouds":
        return "#d3d3d3";
      case "rain":
        return "#4682b4";
      default:
        return "#f0f0f0";
    }
  };

  const getTextColor = (temp) => {
    if (temp < 15) return "#3498db";
    if (temp >= 15 && temp <= 25) return "#95a5a6";
    return "#e74c3c";
  };

  const getTempIcon = (temp) => {
    if (temp < 15) return "❄️";
    if (temp >= 15 && temp <= 25) return "☁️";
    return "🔥";
  };

  const backgroundColor = getBackgroundColor(
    weatherData.weather[0].description
  );
  const textColor = backgroundColor === "#f0f0f0" ? "#000" : "#fff";
  const tempColor = getTextColor(weatherData.main.temp);
  const tempIcon = getTempIcon(weatherData.main.temp);
  const currentTime = moment()
    .utcOffset(weatherData.timezone / 60)
    .format("hh:mm A");

  return (
    <motion.div
      className="card mx-auto p-4 shadow-lg"
      style={{
        maxWidth: "450px",
        backgroundColor: backgroundColor,
        borderRadius: "15px",
        color: textColor,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="card-body position-relative">
        <div className="d-flex justify-content-between mb-3">
          <h2 className="card-title fw-semibold fs-4 fst-italic">
            {weatherData.name}
          </h2>
          <p className="card-text fw-bold fs-5">{currentTime}</p>
        </div>
        <div className="d-flex justify-content-center align-items-center mb-3">
          <p
            className="display-2 d-flex align-items-center fs-1"
            style={{ color: tempColor, fontFamily: "Montserrat" }}
          >
            {weatherData.main.temp}°C <span className="ms-2">{tempIcon}</span>
          </p>
        </div>
        <div className="text-center mb-3">
          <p className="fs-4">{weatherData.weather[0].description}</p>
          <img
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
            alt="Weather Icon"
            className="position-absolute"
            style={{
              filter: "contrast(2.1) brightness(1.1)",
              width: "150px",
              height: "150px",
              bottom: 0,
              right: 0,
              transform: "translateY(15%)",
            }}
          />
        </div>
        <div className="d-flex justify-content-between">
          <div>
            <p className="fs-5 mb-1">
              <i className="bi bi-wind"></i> 💨 {weatherData.wind.speed} km/h
            </p>
            <p className="fs-5 mb-1">
              <i className="bi bi-droplet"></i> 💧 {weatherData.main.humidity}%
              <span
                className="ms-2 text-muted"
                title={getHumidityDescription(weatherData.main.humidity)}
              >
                <img src={info} alt="Info" />
              </span>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
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
        icon: PropTypes.string.isRequired,
      })
    ).isRequired,
    wind: PropTypes.shape({
      speed: PropTypes.number.isRequired,
    }).isRequired,
    timezone: PropTypes.number.isRequired,
  }).isRequired,
};

export default WeatherCard;
