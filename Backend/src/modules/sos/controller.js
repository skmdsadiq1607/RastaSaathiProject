const { ok } = require('../../utils/responseFormatter');
const { triggerSos } = require('./service');
const { generateAccidentReport } = require('../incident/report.service');
const { User } = require('../auth/model');

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
    
    // Generate Accident Report PDF
    const victim = result.incident.userId ? await User.findById(result.incident.userId).lean() : null;
    const report = await generateAccidentReport(result.incident, victim, {
      hospitalSelection: result.hospitalSelection,
      policeSelection: result.policeSelection,
      rescueSelection: result.rescueSelection
    });

    res.status(201).json(ok({ 
      data: { ...result, report }, 
      message: 'SOS triggered and report generated' 
    }));
  } catch (err) {
    console.error(`[SOS Controller] ERROR: ${err.message}`);
    next(err);
  }
}

module.exports = { triggerSosController };

