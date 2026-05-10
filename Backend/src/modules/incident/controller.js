const { ok } = require('../../utils/responseFormatter');
const { createIncident, getIncidentById } = require('./service');

async function createIncidentController(req, res, next) {
  try {
    const { userId, lat, lng, injuryType, vehicleType } = req.body;
    const incident = await createIncident({ userId, lat, lng, injuryType, vehicleType });
    res.status(201).json(ok({ data: { incident }, message: 'Incident created' }));
  } catch (err) {
    next(err);
  }
}

async function getIncidentController(req, res, next) {
  try {
    const incident = await getIncidentById(req.params.id);
    res.json(ok({ data: { incident } }));
  } catch (err) {
    next(err);
  }
}

module.exports = { createIncidentController, getIncidentController };

