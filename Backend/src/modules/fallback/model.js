const mongoose = require('mongoose');

const ExchangeSchema = new mongoose.Schema(
  {
    direction: { type: String, enum: ['IN', 'OUT'], required: true },
    from: { type: String },
    to: { type: String },
    body: { type: String, required: true },
    timestamp: { type: Date, default: () => new Date() }
  },
  { _id: false }
);

const FallbackSchema = new mongoose.Schema(
  {
    incidentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Incident', required: true, index: true },
    exchanges: { type: [ExchangeSchema], default: [] }
  },
  { timestamps: true }
);

const Fallback = mongoose.model('Fallback', FallbackSchema);

module.exports = { Fallback };

