const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const movieSchema = new Schema({
  name: { type: String, required: false },
  gross: { type: String, required: false },
  ratings: { type: String, required: false },
  date: { type: Date, required: false },
}, {
  timestamps: true,
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;