const express = require('express');
const { requireAuth } = require('../../middleware/auth.middleware');
const { ok } = require('../../utils/responseFormatter');
const { validate } = require('../../middleware/validate.middleware');
const Joi = require('joi');
const { Incident } = require('../incident/model');
const { Severity } = require('../severity/model');
const { ROLES } = require('../../utils/constants');

function insightsRoutes() {
  const router = express.Router();
  router.get('/hotspots', requireAuth([ROLES.ADMIN]), async (req, res, next) => {
    try {
      // GeoJSON points for heatmap clustering on client side
      const incidents = await Incident.find({})
        .select('location createdAt')
        .limit(5000)
        .lean();
      const features = incidents.map((i) => ({
        type: 'Feature',
        geometry: i.location,
        properties: { incidentId: String(i._id), ts: i.createdAt }
      }));
      res.json(ok({ data: { geojson: { type: 'FeatureCollection', features } } }));
    } catch (e) {
      next(e);
    }
  });

  router.get(
    '/trends',
    requireAuth([ROLES.ADMIN]),
    validate(Joi.object({ period: Joi.string().valid('7d', '30d', '90d').default('7d') }), 'query'),
    async (req, res, next) => {
      try {
        const days = req.query.period === '90d' ? 90 : req.query.period === '30d' ? 30 : 7;
        const start = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

        const dailyCounts = await Incident.aggregate([
          { $match: { createdAt: { $gte: start } } },
          {
            $group: {
              _id: {
                y: { $year: '$createdAt' },
                m: { $month: '$createdAt' },
                d: { $dayOfMonth: '$createdAt' }
              },
              count: { $sum: 1 }
            }
          },
          { $sort: { '_id.y': 1, '_id.m': 1, '_id.d': 1 } }
        ]);

        const severityDist = await Severity.aggregate([
          { $match: { createdAt: { $gte: start } } },
          { $group: { _id: '$level', count: { $sum: 1 } } }
        ]);

        res.json(ok({ data: { dailyCounts, severityDist }, message: 'ok' }));
      } catch (e) {
        next(e);
      }
    }
  );
  return router;
}

module.exports = { insightsRoutes };

