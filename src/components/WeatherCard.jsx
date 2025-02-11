import PropTypes from "prop-types";
import { useState } from "react";
import info from "../assets/information-line.png";
import { getHumidityDescription } from "../utils/weatherUtils";
import { motion } from "framer-motion";
import moment from "moment-timezone";
import { Modal } from "react-bootstrap";

const WeatherCard = ({ weatherData }) => {
  const [showInfo, setShowInfo] = useState(false);

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  const getBackgroundColor = (description) => {
    const stormy = [
      "thunderstorm with light rain",
      "thunderstorm with rain",
      "thunderstorm with heavy rain",
      "light thunderstorm",
      "thunderstorm",
      "heavy thunderstorm",
      "ragged thunderstorm",
      "thunderstorm with light drizzle",
      "thunderstorm with drizzle",
      "thunderstorm with heavy drizzle",
    ];

    const rainy = [
      "light rain",
      "moderate rain",
      "heavy intensity rain",
      "very heavy rain",
      "extreme rain",
      "freezing rain",
      "light intensity shower rain",
      "shower rain",
      "heavy intensity shower rain",
      "ragged shower rain",
      "light intensity drizzle",
      "drizzle",
      "heavy intensity drizzle",
      "light intensity drizzle rain",
      "drizzle rain",
      "heavy intensity drizzle rain",
      "shower rain and drizzle",
      "heavy shower rain and drizzle",
      "shower drizzle",
    ];

    const snowy = [
      "light snow",
      "snow",
      "heavy snow",
      "sleet",
      "light shower sleet",
      "shower sleet",
      "light rain and snow",
      "rain and snow",
      "light shower snow",
      "shower snow",
      "heavy shower snow",
    ];

    const cloudy = [
      "overcast clouds",
      "broken clouds",
      "scattered clouds",
      "few clouds",
    ];

    const atmosphere = [
      "mist",
      "smoke",
      "haze",
      "sand/dust whirls",
      "fog",
      "sand",
      "dust",
      "volcanic ash",
      "squalls",
      "tornado",
    ];

    const lowerDesc = description.toLowerCase();

    if (stormy.includes(lowerDesc))
      return "linear-gradient(to right, #4a4a4a, #232526)";
    if (rainy.includes(lowerDesc))
      return "linear-gradient(to right, #4682b4, #5f9ea0)";
    if (snowy.includes(lowerDesc))
      return "linear-gradient(to right, #b0e0e6, #f0f8ff)";
    if (cloudy.includes(lowerDesc))
      return "linear-gradient(to right, #d3d3d3, #a9a9a9)";
    if (atmosphere.includes(lowerDesc))
      return "linear-gradient(to right, #696969, #2f4f4f)";
    if (lowerDesc === "clear sky")
      return "linear-gradient(to right, #87ceeb, #00bfff)";

    return "#f0f0f0";
  };

  const getTextColor = (temp) => {
    if (temp < 15) return "#3498db";
    if (temp >= 15 && temp <= 25) return "#95a5a6";
    return "#e74c3c";
  };

  const getTempIcon = (temp) => {
    if (temp < 15) return "❄";
    if (temp >= 15 && temp <= 25) return "☁";
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
  const dayOfWeek = moment()
    .utcOffset(weatherData.timezone / 60)
    .format("dddd");

  return (
    <motion.div
      className="card mx-auto p-4 shadow-lg"
      style={{
        Width: "100%",
        maxWidth: "450px",
        background: backgroundColor,
        borderRadius: "15px",
        color: textColor,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="card-body position-relative">
        {/* Bagian header yang menampilkan nama lokasi dan waktu */}
        <div className="d-flex justify-content-between mb-3">
          <h2 className="card-title fw-semibold fs-4 fst-italic">
            {weatherData.name}
          </h2>
          <p className="card-text fw-bold fs-5">{currentTime}</p>
        </div>

        {/* Menampilkan hari dalam seminggu */}
        <div className="text-center mb-3">
          <p className="fs-3 fst-italic">{dayOfWeek}</p>
        </div>

        {/* Menampilkan suhu dan ikon suhu */}
        <div className="d-flex justify-content-center align-items-center mb-1">
          <p
            className="d-flex align-items-center fs-1"
            style={{ color: tempColor, fontFamily: "Montserrat" }}
          >
            {weatherData.main.temp}°C <span className="ms-2">{tempIcon}</span>
          </p>
        </div>

        {/* Menampilkan deskripsi cuaca */}
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

        {/* Menampilkan informasi kelembapan dengan pop-up */}
        <div className="d-flex justify-content-between">
          <div>
            <p className="fs-5 mb-1">💨 {weatherData.wind.speed} km/h</p>
            <p className="fs-5 mb-1">
              💧 {weatherData.main.humidity}%
              <span className="ms-2 text-muted">
                <img
                  src={info}
                  alt="Info"
                  onClick={toggleInfo}
                  style={{ cursor: "pointer", width: "20px", height: "20px" }}
                />
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Modal Pop-up */}
      <Modal show={showInfo} onHide={toggleInfo} size="sm" centered>
        <Modal.Body className="text-center p-4 bg-white rounded shadow-lg">
          <h5 className="text-dark fw-semibold">
            {getHumidityDescription(weatherData.main.humidity)}
          </h5>
        </Modal.Body>
      </Modal>
    </motion.div>
  );
};

// validasi props
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
    wind: PropTypes.shape({ speed: PropTypes.number.isRequired }).isRequired,
    timezone: PropTypes.number.isRequired,
  }).isRequired,
};

export default WeatherCard;
