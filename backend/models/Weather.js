const mongoose = require('mongoose');

const WeatherSchema = new mongoose.Schema({
  city: String,
  temperature: Number,
  description: String,
  icon: String,
  timestamp: Date
});

module.exports = mongoose.model('Weather', WeatherSchema);
