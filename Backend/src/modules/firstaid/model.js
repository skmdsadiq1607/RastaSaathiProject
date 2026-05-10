const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema(
  {
    role: { type: String, enum: ['user', 'assistant'], required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: () => new Date() }
  },
  { _id: false }
);

const FirstAidSchema = new mongoose.Schema(
  {
    incidentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Incident', index: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    language: { type: String, enum: ['en', 'hi', 'ta', 'te', 'kn'], default: 'en', index: true },
    injuryType: { type: String },
    severityLevel: { type: String, enum: ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'] },
    messages: { type: [MessageSchema], default: [] }
  },
  { timestamps: true }
);

const FirstAid = mongoose.model('FirstAid', FirstAidSchema);

module.exports = { FirstAid };

