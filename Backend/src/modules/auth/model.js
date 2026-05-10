const mongoose = require('mongoose');
const { ROLES } = require('../../utils/constants');

const EmergencyContactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true }
  },
  { _id: false }
);

const LocationSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true } // [lng, lat]
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, unique: true, index: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: Object.values(ROLES), required: true, index: true },
    language: { type: String, enum: ['en', 'hi', 'ta', 'te', 'kn'], default: 'en', index: true },
    emergencyContacts: { type: [EmergencyContactSchema], default: [] },
    location: { type: LocationSchema },
    fcmToken: { type: String }
  },
  { timestamps: true }
);

UserSchema.index({ location: '2dsphere' });

const User = mongoose.model('User', UserSchema);

module.exports = { User };

