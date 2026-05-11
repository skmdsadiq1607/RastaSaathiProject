const mongoose = require('mongoose');

const DeliverySchema = new mongoose.Schema(
  {
    channel: { type: String, enum: ['FCM', 'SMS', 'SOCKET', 'WHATSAPP'], required: true, index: true },
    to: { type: String },
    status: { type: String, enum: ['PENDING', 'SENT', 'FAILED'], default: 'PENDING', index: true },
    providerMessageId: { type: String },
    error: { type: String }
  },
  { _id: false }
);

const AlertsSchema = new mongoose.Schema(
  {
    incidentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Incident', required: true, index: true },
    deliveries: { type: [DeliverySchema], default: [] }
  },
  { timestamps: true }
);

AlertsSchema.index({ incidentId: 1, createdAt: -1 });

const Alerts = mongoose.model('Alerts', AlertsSchema);

module.exports = { Alerts };

