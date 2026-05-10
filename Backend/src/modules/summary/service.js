const { Incident } = require('../incident/model');
const { Severity } = require('../severity/model');
const { Hospital } = require('../hospital/model');
const { Timeline } = require('../timeline/model');
const { Transparency } = require('../transparency/model');
const { Summary } = require('./model');

const { callClaude } = require('../../services/ai.service');
const { incidentSummaryPrompt } = require('../../utils/aiPrompts');
const { logDecision } = require('../transparency/service');
const { AppError } = require('../../utils/AppError');

async function generateSummary({ incidentId }) {
  const incident = await Incident.findById(incidentId).lean();
  if (!incident) throw new AppError('Incident not found', 404, 'NOT_FOUND');
  const severity = await Severity.findOne({ incidentId }).lean();
  const timeline = await Timeline.findOne({ incidentId }).lean();
  const decisions = await Transparency.find({ incidentId }).sort({ timestamp: 1 }).lean();
  const hospital = incident.selectedHospital ? await Hospital.findById(incident.selectedHospital).lean() : null;

  const payload = {
    incident,
    severity,
    hospital,
    timeline,
    decisions
  };

  const { text } = await callClaude({
    system: 'You produce strictly-valid JSON only.',
    user: incidentSummaryPrompt(payload),
    maxTokens: 1200
  });

  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    parsed = {
      briefSummary: String(text).slice(0, 1000),
      timeline: timeline?.events || [],
      decisionsExplained: decisions || [],
      outcome: {},
      recommendations: []
    };
  }

  const stored = await Summary.findOneAndUpdate(
    { incidentId },
    {
      $set: {
        briefSummary: parsed.briefSummary || '',
        timeline: parsed.timeline || [],
        decisionsExplained: parsed.decisionsExplained || [],
        outcome: parsed.outcome || {},
        recommendations: parsed.recommendations || [],
        modelUsed: 'claude-sonnet-4-20250514'
      }
    },
    { upsert: true, new: true }
  );

  await logDecision({
    incidentId,
    decisionType: 'SUMMARY',
    inputPayload: { incidentId },
    outputPayload: parsed,
    confidenceScore: 0.7,
    modelUsed: 'claude-sonnet-4-20250514',
    reasoning: 'Incident summary generated'
  });

  return stored;
}

async function getSummary(incidentId) {
  const summary = await Summary.findOne({ incidentId }).lean();
  if (!summary) throw new AppError('Summary not found', 404, 'NOT_FOUND');
  return summary;
}

module.exports = { generateSummary, getSummary };

