const { Workflow } = require('./model');
const { AppError } = require('../../utils/AppError');
const { Severity } = require('../severity/model');
const { predictSeverityRuleBased } = require('../../utils/severityScorer');

async function initWorkflowForIncident(incidentId) {
  const steps = [
    { step: 'SEVERITY', status: 'PENDING' },
    { step: 'HOSPITAL_SELECTION', status: 'PENDING' },
    { step: 'ROUTING', status: 'PENDING' },
    { step: 'ALERTS', status: 'PENDING' },
    { step: 'FIRST_AID', status: 'PENDING' },
    { step: 'TIMELINE', status: 'PENDING' }
  ];
  const wf = await Workflow.findOneAndUpdate(
    { incidentId },
    { $setOnInsert: { incidentId, steps } },
    { upsert: true, new: true }
  );
  return wf;
}

async function updateStep({ incidentId, step, patch }) {
  const wf = await Workflow.findOne({ incidentId });
  if (!wf) throw new AppError('Workflow not found', 404, 'NOT_FOUND');
  const s = wf.steps.find((x) => x.step === step);
  if (!s) throw new AppError('Workflow step not found', 404, 'NOT_FOUND');
  Object.assign(s, patch);
  await wf.save();
  return wf;
}

async function getWorkflowStatus(incidentId) {
  const wf = await Workflow.findOne({ incidentId }).lean();
  if (!wf) throw new AppError('Workflow not found', 404, 'NOT_FOUND');
  return wf;
}

async function fallbackSeverityIfAiFails({ incidentId, input }) {
  const scored = predictSeverityRuleBased(input);
  const existing = await Severity.findOne({ incidentId });
  if (existing) return existing;
  const s = await Severity.create({
    incidentId,
    score: scored.score,
    level: scored.level,
    reasoning: scored.reasoning,
    recommendedResponse: scored.recommendedResponse,
    modelUsed: 'RULE_BASED',
    confidenceScore: 0.55
  });
  return s;
}

module.exports = { initWorkflowForIncident, updateStep, getWorkflowStatus, fallbackSeverityIfAiFails };

