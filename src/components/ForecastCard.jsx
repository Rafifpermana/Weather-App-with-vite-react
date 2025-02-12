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
                background: "#f8f8f8",
                color: "#333",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Menampilkan nama hari berdasarkan tanggal cuaca */}
              <h6 className="fw-bold">{dayOfWeek}</h6>

              {/* Menampilkan ikon cuaca berdasarkan data dari API OpenWeatherMap */}
              <img
                src={`https://openweathermap.org/img/wn/${day.icon}@4x.png`} // Mengambil ikon cuaca berdasarkan kode dari API
                alt="weather icon" // Alternatif teks jika gambar gagal dimuat
                style={{ filter: "contrast(2.1) brightness(1.1)" }} // Meningkatkan kontras dan kecerahan gambar agar lebih jelas
              />

              {/* Menampilkan suhu rata-rata dengan warna sesuai kondisi suhu */}
              <p
                className="fs-5 fw-semibold"
                style={{ color: tempColor, fontFamily: "Montserrat" }} // Warna teks menyesuaikan suhu (biru untuk dingin, abu-abu untuk sedang, merah untuk panas)
              >
                {/* Menampilkan suhu dan ikon yang sesuai (❄ untuk dingin, ☁ untuk sedang, 🔥 untuk panas) */}
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
