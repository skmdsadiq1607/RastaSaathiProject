const mongoose = require('mongoose');

const insightSchema = new mongoose.Schema({
  type: { type: String, enum: ['HOTSPOT', 'TREND', 'SUMMARY'], required: true },
  data: { type: mongoose.Schema.Types.Mixed, required: true },
  periodStart: Date,
  periodEnd: Date
}, { timestamps: true });

module.exports = mongoose.model('Insight', insightSchema);
