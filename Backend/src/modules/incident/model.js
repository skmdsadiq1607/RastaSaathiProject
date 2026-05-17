const mongoose = require('mongoose');
const { INCIDENT_STATUS } = require('../../utils/constants');

const LocationSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true } // [lng, lat]
  },
  { _id: false }
);

const CounterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 }
});
const Counter = mongoose.model('Counter', CounterSchema);

const IncidentSchema = new mongoose.Schema(
  {
    createdByUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    ticketNumber: { type: String, unique: true, index: true }, // Sequential receipt number: RS-0001, RS-0002
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

async function getNextSequenceValue(sequenceName) {
  const sequenceDocument = await Counter.findOneAndUpdate(
    { _id: sequenceName },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return sequenceDocument.seq;
}

module.exports = { Incident, Counter, getNextSequenceValue };

