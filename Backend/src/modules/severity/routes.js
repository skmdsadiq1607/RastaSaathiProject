const express = require('express');
const { validate } = require('../../middleware/validate.middleware');
const { predictSeveritySchema } = require('./validator');
const { predictSeverityController } = require('./controller');
const { requireAuth } = require('../../middleware/auth.middleware');

function severityRoutes() {
  const router = express.Router();
  router.post('/predict', requireAuth(), validate(predictSeveritySchema), predictSeverityController);
  return router;
}

module.exports = { severityRoutes };

