const express = require('express');
const { requireAuth } = require('../../middleware/auth.middleware');
const { validate } = require('../../middleware/validate.middleware');
const Joi = require('joi');
const { ok } = require('../../utils/responseFormatter');
const { Resources } = require('./model');
const { Hospital } = require('../hospital/model');
const { distanceMatrix } = require('../../services/maps.service');

function resourcesRoutes() {
  const router = express.Router();
  router.post(
    '/update',
    requireAuth(),
    validate(
      Joi.object({
        hospitalId: Joi.string().required(),
        icuBeds: Joi.number().min(0).optional(),
        ventilators: Joi.number().min(0).optional(),
        bloodUnits: Joi.object({ A: Joi.number().min(0), B: Joi.number().min(0), O: Joi.number().min(0), AB: Joi.number().min(0) }).optional(),
        ambulancesAvailable: Joi.number().min(0).optional(),
        traumaTeamOnDuty: Joi.boolean().optional()
      })
    ),
    async (req, res, next) => {
      try {
        const r = await Resources.findOneAndUpdate(
          { hospitalId: req.body.hospitalId },
          { $set: { ...req.body } },
          { upsert: true, new: true }
        );
        res.json(ok({ data: { resources: r }, message: 'Updated' }));
      } catch (e) {
        next(e);
      }
    }
  );

  router.get(
    '/match',
    requireAuth(),
    validate(
      Joi.object({
        lat: Joi.number().required(),
        lng: Joi.number().required(),
        severityLevel: Joi.string().valid('CRITICAL', 'HIGH', 'MEDIUM', 'LOW').required()
      }),
      'query'
    ),
    async (req, res, next) => {
      try {
        const lat = Number(req.query.lat);
        const lng = Number(req.query.lng);
        const hospitals = await Hospital.find({}).lean();
        const resources = await Resources.find({ hospitalId: { $in: hospitals.map((h) => h._id) } }).lean();
        const resMap = new Map(resources.map((r) => [String(r.hospitalId), r]));

        const dm = await distanceMatrix({
          origins: [{ lat, lng }],
          destinations: hospitals.map((h) => ({ lat: h.location.coordinates[1], lng: h.location.coordinates[0] }))
        });
        const elements = dm.rows?.[0]?.elements || [];

        const matches = hospitals
          .map((h, idx) => {
            const r = resMap.get(String(h._id)) || {};
            const el = elements[idx];
            const etaSeconds = el?.status === 'OK' ? el.duration.value : 3600;
            const score =
              0.4 * Math.min(1, (Number(r.icuBeds ?? h.icuBeds ?? 0) || 0) / 20) +
              0.2 * (h.traumaCenter ? 1 : 0.4) +
              0.2 * (h.bloodBankAvailable ? 1 : 0) +
              0.2 * (1 - Math.min(1, etaSeconds / (45 * 60)));
            return { hospital: h, resources: r, etaSeconds, score };
          })
          .sort((a, b) => b.score - a.score)
          .slice(0, 5);

        res.json(ok({ data: { matches }, message: 'Matched' }));
      } catch (e) {
        next(e);
      }
    }
  );
  return router;
}

module.exports = { resourcesRoutes };

