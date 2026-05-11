const { ok } = require('../../utils/responseFormatter');
const { triggerSos } = require('./service');

async function triggerSosController(req, res, next) {
  try {
    const { io, redis, queues } = req.context;
    const { lat, lng, userId, injuryType, vehicleType } = req.body;
    console.log(`[SOS Controller] Triggering SOS for user: ${userId || req.user?.sub} at [${lat}, ${lng}]`);
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
    console.log(`[SOS Controller] SOS triggered successfully. Incident ID: ${result.incident._id}`);
    res.status(201).json(ok({ data: result, message: 'SOS triggered' }));
  } catch (err) {
    console.error(`[SOS Controller] ERROR: ${err.message}`);
    next(err);
  }
}

module.exports = { triggerSosController };

