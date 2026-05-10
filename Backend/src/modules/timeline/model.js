const mongoose = require('mongoose');

const TimelineEventSchema = new mongoose.Schema(
  {
    eventType: { type: String, required: true, index: true },
    description: { type: String, required: true },
    actor: { type: String, required: true },
    timestamp: { type: Date, default: () => new Date(), index: true },
    metadata: { type: Object }
  },
  { _id: false }
);

const TimelineSchema = new mongoose.Schema(
  {
    incidentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Incident', required: true, unique: true, index: true },
    events: { type: [TimelineEventSchema], default: [] }
  },
  { timestamps: true }
);

const Timeline = mongoose.model('Timeline', TimelineSchema);

module.exports = { Timeline };

