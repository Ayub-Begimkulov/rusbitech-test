const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
  equation: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('history', HistorySchema);
