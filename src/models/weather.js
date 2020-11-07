const { Schema, model} = require('mongoose');

const schema = new Schema(
  {
    codes: { type: Array, required: true },
    emoji: { type: String, required: true },
    emojiNightMode: { type: String },
  },
  {
    collection : 'weather-emoji'
  }
);

module.exports = model('WeatherEmoji', schema);
