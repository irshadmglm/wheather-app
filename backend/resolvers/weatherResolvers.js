const axios = require('axios');
const Weather = require('../models/Weather');

const API_KEY = process.env.OPENWEATHER_API_KEY;

module.exports = {
  Query: {
    async getWeatherHistory(_, { city, from, to }) {
      const fromDate = new Date(from);
      const toDate = new Date(to);

      // Max 30-day range validation
      const diffDays = (toDate - fromDate) / (1000 * 60 * 60 * 24);
      if (diffDays > 30) {
        throw new Error("Date range must not exceed 30 days.");
      }

      return await Weather.find({
        city,
        timestamp: { $gte: fromDate, $lte: toDate }
      }).sort({ timestamp: 1 });
    }
  },

  Mutation: {
    async fetchWeather(_, { city }) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

      try {
        const res = await axios.get(url);
        const data = res.data;

        const weatherData = new Weather({
          city,
          temperature: data.main.temp,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
          timestamp: new Date()
        });

        await weatherData.save();
        return weatherData;
      } catch (err) {
        throw new Error("Failed to fetch weather data.");
      }
    }
  }
};
