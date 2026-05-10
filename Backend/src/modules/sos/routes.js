const express = require('express');
const { validate } = require('../../middleware/validate.middleware');
const { triggerSosSchema } = require('./validator');
const { triggerSosController } = require('./controller');
const { requireAuth } = require('../../middleware/auth.middleware');

function sosRoutes() {
  const router = express.Router();
  router.post('/trigger', requireAuth(), validate(triggerSosSchema), triggerSosController);
  return router;
}

module.exports = { sosRoutes };

