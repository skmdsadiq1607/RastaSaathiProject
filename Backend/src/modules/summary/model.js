const mongoose = require('mongoose');

const SummarySchema = new mongoose.Schema(
  {
    incidentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Incident', required: true, unique: true, index: true },
    briefSummary: { type: String, required: true },
    timeline: { type: [Object], default: [] },
    decisionsExplained: { type: [Object], default: [] },
    outcome: { type: Object },
    recommendations: { type: [String], default: [] },
    modelUsed: { type: String, required: true }
  },
  { timestamps: true }
);

const Summary = mongoose.model('Summary', SummarySchema);

module.exports = { Summary };

