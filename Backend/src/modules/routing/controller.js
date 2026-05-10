const { ok } = require('../../utils/responseFormatter');
const { calculateRouting } = require('./service');

async function calculateRoutingController(req, res, next) {
  try {
    const result = await calculateRouting(req.body);
    res.json(ok({ data: result, message: 'Route calculated' }));
  } catch (err) {
    next(err);
  }
}

module.exports = { calculateRoutingController };

