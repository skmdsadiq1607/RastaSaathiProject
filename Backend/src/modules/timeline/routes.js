const express = require('express');
const { requireAuth } = require('../../middleware/auth.middleware');
const { ok } = require('../../utils/responseFormatter');
const { Timeline } = require('./model');
const { AppError } = require('../../utils/AppError');

function timelineRoutes() {
  const router = express.Router();
  router.get('/:incidentId', requireAuth(), async (req, res, next) => {
    try {
      const tl = await Timeline.findOne({ incidentId: req.params.incidentId }).lean();
      if (!tl) throw new AppError('Timeline not found', 404, 'NOT_FOUND');
      res.json(ok({ data: { timeline: tl } }));
    } catch (err) {
      next(err);
    }
  });
  return router;
}

module.exports = { timelineRoutes };

