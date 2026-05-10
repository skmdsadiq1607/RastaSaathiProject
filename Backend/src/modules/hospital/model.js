const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true } // [lng, lat]
  },
  { _id: false }
);

const HospitalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, index: true },
    address: { type: String, required: true },
    phone: { type: String },
    emergencyContact: { type: String },
    location: { type: LocationSchema, required: true },
    specialties: { type: [String], default: [] },
    icuBeds: { type: Number, default: 0 },
    traumaCenter: { type: Boolean, default: false, index: true },
    bloodBankAvailable: { type: Boolean, default: false, index: true }
  },
  { timestamps: true }
);

HospitalSchema.index({ location: '2dsphere' });

const Hospital = mongoose.model('Hospital', HospitalSchema);

module.exports = { Hospital };

