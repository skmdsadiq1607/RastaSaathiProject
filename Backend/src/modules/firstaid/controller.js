const { ok } = require('../../utils/responseFormatter');
const { startSession, followup } = require('./service');

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

module.exports = { guideController, followupController };

