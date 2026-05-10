const mongoose = require('mongoose');

const BloodUnitsSchema = new mongoose.Schema(
  {
    A: { type: Number, default: 0 },
    B: { type: Number, default: 0 },
    O: { type: Number, default: 0 },
    AB: { type: Number, default: 0 }
  },
  { _id: false }
);

const ResourcesSchema = new mongoose.Schema(
  {
    hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true, unique: true, index: true },
    icuBeds: { type: Number, default: 0 },
    ventilators: { type: Number, default: 0 },
    bloodUnits: { type: BloodUnitsSchema, default: () => ({}) },
    ambulancesAvailable: { type: Number, default: 0 },
    traumaTeamOnDuty: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const Resources = mongoose.model('Resources', ResourcesSchema);

module.exports = { Resources };

