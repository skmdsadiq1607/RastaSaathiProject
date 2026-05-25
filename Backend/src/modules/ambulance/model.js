const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true } // [lng, lat]
  },
  { _id: false }
);

const AmbulanceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, index: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    emergencyContact: { type: String },
    location: { type: LocationSchema, required: true },
    status: { type: String, enum: ['AVAILABLE', 'DISPATCHED', 'MAINTENANCE'], default: 'AVAILABLE', index: true },
    provider: { type: String, default: 'Rasta-Saathi Emergency Services' }
  },
  { timestamps: true }
);

AmbulanceSchema.index({ location: '2dsphere' });

const Ambulance = mongoose.model('Ambulance', AmbulanceSchema);

module.exports = { Ambulance };
