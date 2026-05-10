const { ok } = require('../../utils/responseFormatter');
const { predictSeverity } = require('./service');

async function predictSeverityController(req, res, next) {
  try {
    const { incidentId, ...rest } = req.body;
    const severity = await predictSeverity({ incidentId, input: rest, allowAi: true });
    res.json(
      ok({
        data: {
          score: severity.score,
          level: severity.level,
          reasoning: severity.reasoning,
          recommendedResponse: severity.recommendedResponse,
          incidentId: String(severity.incidentId)
        },
        message: 'Severity predicted'
      })
    );
  } catch (err) {
    next(err);
  }
}

module.exports = { predictSeverityController };

