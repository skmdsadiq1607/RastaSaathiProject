const mongoose = require('mongoose');

const StepSchema = new mongoose.Schema(
  {
    step: {
      type: String,
      enum: [
        'SEVERITY',
        'HOSPITAL_SELECTION',
        'ROUTING',
        'ALERTS',
        'FIRST_AID',
        'TIMELINE'
      ],
      required: true
    },
    status: { type: String, enum: ['PENDING', 'RUNNING', 'SUCCESS', 'FAILED'], default: 'PENDING' },
    startedAt: { type: Date },
    finishedAt: { type: Date },
    error: { type: String },
    meta: { type: Object }
  },
  { _id: false }
);

const WorkflowSchema = new mongoose.Schema(
  {
    incidentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Incident', unique: true, index: true },
    steps: { type: [StepSchema], default: [] }
  },
  { timestamps: true }
);

const Workflow = mongoose.model('Workflow', WorkflowSchema);

module.exports = { Workflow };

