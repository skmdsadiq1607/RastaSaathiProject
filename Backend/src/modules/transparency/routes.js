const express = require('express');
const { requireAuth } = require('../../middleware/auth.middleware');
const { ok } = require('../../utils/responseFormatter');
const { Transparency } = require('./model');

function transparencyRoutes() {
  const router = express.Router();
  router.get('/:incidentId', requireAuth(), async (req, res, next) => {
    try {
      const decisions = await Transparency.find({ incidentId: req.params.incidentId })
        .sort({ timestamp: 1 })
        .lean();
      res.json(ok({ data: { decisions } }));
    } catch (err) {
      next(err);
    }
  });
  return router;
}

module.exports = { transparencyRoutes };

