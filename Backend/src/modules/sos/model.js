const mongoose = require('mongoose');

const SosSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    incidentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Incident', index: true, required: true },
    location: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], required: true } // [lng, lat]
    },
    injuryType: { type: String },
    vehicleType: { type: String }
  },
  { timestamps: true }
);

SosSchema.index({ location: '2dsphere' });

const SOS = mongoose.model('SOS', SosSchema);

module.exports = { SOS };

