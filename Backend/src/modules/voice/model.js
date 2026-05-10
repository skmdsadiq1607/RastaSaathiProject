const mongoose = require('mongoose');

const voiceLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  audioUrl: String, // Path or URL to saved audio
  transcript: String,
  confidence: Number,
  intentDetected: String,
  triggeredSos: Boolean,
  incidentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Incident'
  }
}, { timestamps: true });

module.exports = mongoose.model('VoiceLog', voiceLogSchema);
