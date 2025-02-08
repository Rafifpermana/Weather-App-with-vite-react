import PropTypes from "prop-types";
import { motion } from "framer-motion";

const ForecastCard = ({ forecastData }) => {
  return (
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
              src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
              alt="weather icon"
              style={{
                filter: "contrast(1.5) brightness(1.1)",
              }}
            />

            <p className="fs-5 fw-semibold">{day.avgTemp}°C</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Tambahkan validasi props
ForecastCard.propTypes = {
  forecastData: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      avgTemp: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ForecastCard;
