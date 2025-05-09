
const mongoose = require('mongoose');

const TestResultSchema = new mongoose.Schema({
  download: {
    type: Number,
    required: true
  },
  upload: {
    type: Number,
    required: true
  },
  ping: {
    type: Number,
    required: true
  },
  jitter: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  isp: {
    type: String
  },
  feedback: {
    type: String
  }
});

module.exports = mongoose.model('TestResult', TestResultSchema);
