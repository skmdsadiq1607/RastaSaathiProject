const mongoose = require('mongoose');
const { SEVERITY_LEVELS } = require('../../utils/constants');

const SeveritySchema = new mongoose.Schema(
  {
    incidentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Incident', required: true, index: true, unique: true },
    score: { type: Number, min: 0, max: 100, required: true, index: true },
    level: { type: String, enum: Object.values(SEVERITY_LEVELS), required: true, index: true },
    reasoning: { type: String, required: true },
    recommendedResponse: { type: String, required: true },
    modelUsed: { type: String, required: true },
    confidenceScore: { type: Number, min: 0, max: 1, default: 0.5 }
  },
  { timestamps: true }
);

const Severity = mongoose.model('Severity', SeveritySchema);

module.exports = { Severity };

