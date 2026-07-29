const { ok } = require('../../utils/responseFormatter');
const { startSession, followup, detectInjury } = require('./service');

async function guideController(req, res, next) {
  try {
    const { incidentId, injuryType, severityLevel, resourcesAvailable, language } = req.body;
    const result = await startSession({
      incidentId,
      userId: req.user?.sub,
      injuryType,
      severityLevel,
      resourcesAvailable,
      language
    });
    res.status(201).json(ok({ data: { sessionId: String(result.session._id), guidance: result.guidance }, message: 'First aid guidance' }));
  } catch (err) {
    next(err);
  }
}

async function followupController(req, res, next) {
  try {
    const result = await followup(req.body);
    res.json(ok({ data: { sessionId: String(result.session._id), answer: result.answer }, message: 'Answer' }));
  } catch (err) {
    next(err);
  }
}

async function detectInjuryController(req, res, next) {
  try {
    const { image } = req.body;
    console.log('[FirstAid Controller] Running Vision Injury Detection...');
    const result = await detectInjury({ image });
    res.json(ok({ data: result, message: 'Injury detected' }));
  } catch (err) {
    console.error('[FirstAid Controller] Vision error:', err);
    next(err);
  }
}

module.exports = { guideController, followupController, detectInjuryController };

