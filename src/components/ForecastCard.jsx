import PropTypes from "prop-types";
import { motion } from "framer-motion";
import moment from "moment";

const ForecastCard = ({ forecastData }) => {
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

  return (
    <div className="mt-4">
      <h2>5-Day Forecast</h2>
      <div className="d-flex flex-wrap justify-content-center">
        {forecastData.map((day) => {
          const tempColor = getTextColor(day.avgTemp);
          const tempIcon = getTempIcon(day.avgTemp);
          const dayOfWeek = moment(day.date).format("dddd");

          return (
            <motion.div
              key={day.date}
              className="card m-2 p-3 text-center shadow-sm"
              style={{
                width: "100%",
                maxWidth: "150px",
                borderRadius: "10px",
                background: "#f5f5f5",
                color: "#333",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Menampilkan nama hari berdasarkan tanggal cuaca */}
              <h6 className="fw-bold">{dayOfWeek}</h6>

              {/* Menampilkan ikon cuaca berdasarkan data */}
              <img
                src={`https://openweathermap.org/img/wn/${day.icon}@4x.png`}
                alt="weather icon"
                style={{ filter: "contrast(2.1) brightness(1.1)" }}
              />

              {/* Menampilkan suhu rata-rata dengan warna sesuai kondisi suhu */}
              <p
                className="fs-5 fw-semibold"
                style={{ color: tempColor, fontFamily: "Montserrat" }}
              >
                {/* Menampilkan suhu dan ikon yang sesuai dari data */}
                {day.avgTemp}°C <span className="ms-2">{tempIcon}</span>{" "}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

// Validasi tipe data props
ForecastCard.propTypes = {
  forecastData: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      avgTemp: PropTypes.number.isRequired,
      icon: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ForecastCard;
