const express = require('express');
const { requireAuth } = require('../../middleware/auth.middleware');
const { ok } = require('../../utils/responseFormatter');
const { Alerts } = require('./model');

function alertsRoutes() {
  const router = express.Router();
  router.get('/:incidentId', requireAuth(), async (req, res, next) => {
    try {
      const records = await Alerts.find({ incidentId: req.params.incidentId }).sort({ createdAt: -1 }).lean();
      res.json(ok({ data: { records } }));
    } catch (err) {
      next(err);
    }
  });
  return router;
}

module.exports = { alertsRoutes };

