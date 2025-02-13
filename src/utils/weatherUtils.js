export const getHumidityDescription = (humidity) => {
  if (humidity < 30) return "Dry";
  if (humidity < 60) return "Normal";
  if (humidity < 80) return "Humid";
  return "Very Humid";
};

export const processForecastData = (forecastData) => {
  const dailyForecast = {};
  forecastData.list.forEach((entry) => {
    const date = entry.dt_txt.split(" ")[0];
    if (!dailyForecast[date]) {
      dailyForecast[date] = {
        tempSum: 0,
        count: 0,
        icon: entry.weather[0].icon,
        description: entry.weather[0].description || "No description",
      };
    }
    dailyForecast[date].tempSum += entry.main.temp;
    dailyForecast[date].count += 1;
  });

  // Ambil tanggal hari ini
  const today = new Date().toISOString().split("T")[0];

  return Object.keys(dailyForecast)
    .filter((date) => date !== today) // Hapus data hari ini
    .slice(0, 5)
    .map((date) => ({
      date,
      avgTemp: (
        dailyForecast[date].tempSum / dailyForecast[date].count
      ).toFixed(1),
      icon: dailyForecast[date].icon,
      description: dailyForecast[date].description || "No description",
    }));
};
