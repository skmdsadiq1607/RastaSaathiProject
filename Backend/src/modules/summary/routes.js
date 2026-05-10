const express = require('express');
const { requireAuth } = require('../../middleware/auth.middleware');
const { validate } = require('../../middleware/validate.middleware');
const Joi = require('joi');
const { generateSummaryController, getSummaryController } = require('./controller');

function summaryRoutes() {
  const router = express.Router();
  router.post(
    '/generate',
    requireAuth(),
    validate(Joi.object({ incidentId: Joi.string().required() })),
    generateSummaryController
  );
  router.get('/:incidentId', requireAuth(), getSummaryController);
  return router;
}

module.exports = { summaryRoutes };

