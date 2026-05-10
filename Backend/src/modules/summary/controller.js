const { ok } = require('../../utils/responseFormatter');
const { generateSummary, getSummary } = require('./service');

async function generateSummaryController(req, res, next) {
  try {
    const summary = await generateSummary(req.body);
    res.status(201).json(ok({ data: { summary }, message: 'Summary generated' }));
  } catch (err) {
    next(err);
  }
}

async function getSummaryController(req, res, next) {
  try {
    const summary = await getSummary(req.params.incidentId);
    res.json(ok({ data: { summary } }));
  } catch (err) {
    next(err);
  }
}

module.exports = { generateSummaryController, getSummaryController };

