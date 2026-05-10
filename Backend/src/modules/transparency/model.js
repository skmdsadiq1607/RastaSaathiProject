const mongoose = require('mongoose');

const TransparencySchema = new mongoose.Schema(
  {
    incidentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Incident', required: true, index: true },
    decisionType: {
      type: String,
      enum: ['SEVERITY', 'HOSPITAL_SELECTION', 'ROUTING', 'FIRST_AID', 'SUMMARY'],
      required: true,
      index: true
    },
    inputPayload: { type: Object, required: true },
    outputPayload: { type: Object, required: true },
    confidenceScore: { type: Number, min: 0, max: 1, default: 0.5 },
    modelUsed: { type: String, required: true },
    reasoning: { type: String },
    timestamp: { type: Date, default: () => new Date(), index: true }
  },
  { timestamps: true }
);

TransparencySchema.index({ incidentId: 1, decisionType: 1, timestamp: -1 });

const Transparency = mongoose.model('Transparency', TransparencySchema);

module.exports = { Transparency };

