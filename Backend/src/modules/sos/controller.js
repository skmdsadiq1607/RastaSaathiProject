const { ok } = require('../../utils/responseFormatter');
const { triggerSos } = require('./service');

async function triggerSosController(req, res, next) {
  try {
    const { io, redis, queues } = req.context;
    const { lat, lng, userId, injuryType, vehicleType } = req.body;
    const result = await triggerSos({
      io,
      redis,
      queues,
      lat,
      lng,
      userId: userId || req.user?.sub,
      injuryType,
      vehicleType
    });
    res.status(201).json(ok({ data: result, message: 'SOS triggered' }));
  } catch (err) {
    next(err);
  }
}

module.exports = { triggerSosController };

