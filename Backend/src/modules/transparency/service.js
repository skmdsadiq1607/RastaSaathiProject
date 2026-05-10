const { Transparency } = require('./model');

async function logDecision({ incidentId, decisionType, inputPayload, outputPayload, confidenceScore, modelUsed, reasoning }) {
  return await Transparency.create({
    incidentId,
    decisionType,
    inputPayload,
    outputPayload,
    confidenceScore: typeof confidenceScore === 'number' ? confidenceScore : 0.5,
    modelUsed,
    reasoning
  });
}

module.exports = { logDecision };

