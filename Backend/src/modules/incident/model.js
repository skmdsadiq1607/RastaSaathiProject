const mongoose = require('mongoose');
const { INCIDENT_STATUS } = require('../../utils/constants');

const LocationSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true } // [lng, lat]
  },
  { _id: false }
);

const IncidentSchema = new mongoose.Schema(
  {
    createdByUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    location: { type: LocationSchema, required: true },
    status: { type: String, enum: Object.values(INCIDENT_STATUS), default: INCIDENT_STATUS.OPEN, index: true },
    injuryType: { type: String },
    vehicleType: { type: String },
    assignedResponder: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    selectedHospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital' }
  },
  { timestamps: true }
);

IncidentSchema.index({ location: '2dsphere' });

const Incident = mongoose.model('Incident', IncidentSchema);

module.exports = { Incident };

