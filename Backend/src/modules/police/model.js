const mongoose = require('mongoose');

const PoliceStationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  rating: {
    type: Number,
    default: 4.5
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
}, { timestamps: true });

// Extremely critical for $near geospatial queries
PoliceStationSchema.index({ location: '2dsphere' });

const PoliceStation = mongoose.model('PoliceStation', PoliceStationSchema);
module.exports = { PoliceStation };
