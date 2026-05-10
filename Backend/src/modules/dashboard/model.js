const mongoose = require('mongoose');

const dashboardSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    unique: true
  },
  metrics: {
    totalSOS: Number,
    avgResponseTimeSeconds: Number,
    resolutionRate: Number
  }
}, { timestamps: true });

module.exports = mongoose.model('Dashboard', dashboardSchema);
