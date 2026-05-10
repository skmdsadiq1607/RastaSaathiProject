const mongoose = require('mongoose');

const RoutingSchema = new mongoose.Schema(
  {
    incidentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Incident', required: true, index: true },
    origin: { type: Object, required: true },
    destination: { type: Object, required: true },
    severityLevel: { type: String, enum: ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'], required: true, index: true },
    best: { type: Object },
    routes: { type: [Object], default: [] }
  },
  { timestamps: true }
);

const Routing = mongoose.model('Routing', RoutingSchema);

module.exports = { Routing };

