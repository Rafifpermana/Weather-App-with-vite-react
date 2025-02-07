// utils/weatherUtils.js

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
      };
    }
    dailyForecast[date].tempSum += entry.main.temp;
    dailyForecast[date].count += 1;
  });

  return Object.keys(dailyForecast).map((date) => ({
    date,
    avgTemp: (dailyForecast[date].tempSum / dailyForecast[date].count).toFixed(
      1
    ),
    icon: dailyForecast[date].icon,
  }));
};
