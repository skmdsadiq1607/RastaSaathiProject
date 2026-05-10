const express = require('express');
const { requireAuth } = require('../../middleware/auth.middleware');
const { validate } = require('../../middleware/validate.middleware');
const { guideSchema, followupSchema } = require('./validator');
const { guideController, followupController } = require('./controller');

function firstAidRoutes() {
  const router = express.Router();
  router.post('/guide', requireAuth(), validate(guideSchema), guideController);
  router.post('/followup', requireAuth(), validate(followupSchema), followupController);
  return router;
}

module.exports = { firstAidRoutes };

