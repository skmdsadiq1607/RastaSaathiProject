const express = require('express');
const { requireAuth } = require('../../middleware/auth.middleware');
const { ok } = require('../../utils/responseFormatter');
const { Incident } = require('../incident/model');
const { Severity } = require('../severity/model');
const { INCIDENT_STATUS, ROLES } = require('../../utils/constants');
const { validate } = require('../../middleware/validate.middleware');
const Joi = require('joi');
const mongoose = require('mongoose');

function dashboardRoutes() {
  const router = express.Router();

  router.get('/live', requireAuth([ROLES.ADMIN, ROLES.RESPONDER]), async (req, res, next) => {
    try {
      const incidents = await Incident.find({ status: { $ne: INCIDENT_STATUS.RESOLVED } })
        .sort({ createdAt: -1 })
        .limit(100)
        .populate('createdByUser', 'name phone')
        .populate('assignedResponder', 'name phone')
        .populate('selectedHospital')
        .lean();

      const ids = incidents.map((i) => i._id);
      const severities = await Severity.find({ incidentId: { $in: ids } }).lean();
      const sevMap = new Map(severities.map((s) => [String(s.incidentId), s]));

      const enriched = incidents.map((i) => ({
        ...i,
        severity: sevMap.get(String(i._id)) || null,
        lat: i.location.coordinates[1],
        lng: i.location.coordinates[0]
      }));

      res.json(ok({ data: { incidents: enriched } }));
    } catch (e) {
      next(e);
    }
  });

  router.get('/stats', requireAuth([ROLES.ADMIN]), async (req, res, next) => {
    try {
      const start = new Date();
      start.setHours(0, 0, 0, 0);
      const end = new Date(start);
      end.setDate(end.getDate() + 1);

      const totalSos = await Incident.countDocuments({ createdAt: { $gte: start, $lt: end } });
      const byStatus = await Incident.aggregate([
        { $match: { createdAt: { $gte: start, $lt: end } } },
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ]);
      const bySeverity = await Severity.aggregate([
        { $match: { createdAt: { $gte: start, $lt: end } } },
        { $group: { _id: '$level', count: { $sum: 1 } } }
      ]);

      // Avg response time proxy: createdAt -> resolvedAt (if resolved)
      const responseAgg = await Incident.aggregate([
        { $match: { createdAt: { $gte: start, $lt: end }, status: INCIDENT_STATUS.RESOLVED } },
        {
          $project: {
            responseMs: { $subtract: ['$updatedAt', '$createdAt'] }
          }
        },
        { $group: { _id: null, avgResponseMs: { $avg: '$responseMs' }, resolvedCount: { $sum: 1 } } }
      ]);
      const avgResponseMs = responseAgg?.[0]?.avgResponseMs || null;
      const resolvedCount = responseAgg?.[0]?.resolvedCount || 0;

      res.json(
        ok({
          data: {
            totalSos,
            byStatus,
            bySeverity,
            avgResponseSeconds: avgResponseMs ? Math.round(avgResponseMs / 1000) : null,
            resolutionRate: totalSos ? resolvedCount / totalSos : 0
          }
        })
      );
    } catch (e) {
      next(e);
    }
  });

  router.post(
    '/incident/:id/assign',
    requireAuth([ROLES.ADMIN, ROLES.RESPONDER]),
    validate(Joi.object({ responderId: Joi.string().required() })),
    async (req, res, next) => {
      try {
        const incident = await Incident.findByIdAndUpdate(
          req.params.id,
          { $set: { assignedResponder: new mongoose.Types.ObjectId(req.body.responderId), status: INCIDENT_STATUS.ASSIGNED } },
          { new: true }
        );
        res.json(ok({ data: { incident }, message: 'Assigned' }));
      } catch (e) {
        next(e);
      }
    }
  );

  router.post('/incident/:id/resolve', requireAuth([ROLES.ADMIN, ROLES.RESPONDER]), async (req, res, next) => {
    try {
      const incident = await Incident.findByIdAndUpdate(req.params.id, { $set: { status: INCIDENT_STATUS.RESOLVED } }, { new: true });
      res.json(ok({ data: { incident }, message: 'Resolved' }));
    } catch (e) {
      next(e);
    }
  });

  router.post('/incident/:id/escalate', requireAuth([ROLES.ADMIN]), async (req, res, next) => {
    try {
      const incident = await Incident.findByIdAndUpdate(req.params.id, { $set: { status: INCIDENT_STATUS.ROUTING } }, { new: true });
      res.json(ok({ data: { incident }, message: 'Escalated' }));
    } catch (e) {
      next(e);
    }
  });
  return router;
}

module.exports = { dashboardRoutes };

