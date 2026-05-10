const { Severity } = require('./model');
const { callClaude } = require('../../services/ai.service');
const { severityReasoningPrompt } = require('../../utils/aiPrompts');
const { predictSeverityRuleBased, levelFromScore } = require('../../utils/severityScorer');
const { AppError } = require('../../utils/AppError');

async function predictSeverityAi({ incidentId, input }) {
  const base = predictSeverityRuleBased(input);
  const prompt = severityReasoningPrompt(input, base.score, base.level);

  const { text } = await callClaude({
    system: 'You produce strictly-valid JSON only.',
    user: prompt,
    maxTokens: 500
  });

  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    parsed = { reasoning: base.reasoning, recommendedResponse: base.recommendedResponse, confidenceScore: 0.6 };
  }

  const record = await Severity.findOneAndUpdate(
    { incidentId },
    {
      $set: {
        score: base.score,
        level: base.level,
        reasoning: parsed.reasoning || base.reasoning,
        recommendedResponse: parsed.recommendedResponse || base.recommendedResponse,
        modelUsed: 'claude-sonnet-4-20250514',
        confidenceScore: typeof parsed.confidenceScore === 'number' ? parsed.confidenceScore : 0.6
      }
    },
    { upsert: true, new: true }
  );

  return record;
}

async function predictSeverity({ incidentId, input, allowAi = true }) {
  if (!incidentId) throw new AppError('incidentId required', 400, 'VALIDATION_ERROR');

  if (allowAi) {
    try {
      return await predictSeverityAi({ incidentId, input });
    } catch {
      const base = predictSeverityRuleBased(input);
      return await Severity.findOneAndUpdate(
        { incidentId },
        {
          $set: {
            score: base.score,
            level: base.level,
            reasoning: base.reasoning,
            recommendedResponse: base.recommendedResponse,
            modelUsed: 'RULE_BASED',
            confidenceScore: 0.55
          }
        },
        { upsert: true, new: true }
      );
    }
  }

  const base = predictSeverityRuleBased(input);
  return await Severity.findOneAndUpdate(
    { incidentId },
    {
      $set: {
        score: base.score,
        level: levelFromScore(base.score),
        reasoning: base.reasoning,
        recommendedResponse: base.recommendedResponse,
        modelUsed: 'RULE_BASED',
        confidenceScore: 0.55
      }
    },
    { upsert: true, new: true }
  );
}

module.exports = { predictSeverity };

