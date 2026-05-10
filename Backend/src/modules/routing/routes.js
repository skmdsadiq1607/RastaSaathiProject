const express = require('express');
const { requireAuth } = require('../../middleware/auth.middleware');
const { validate } = require('../../middleware/validate.middleware');
const { calculateRouteSchema } = require('./validator');
const { calculateRoutingController } = require('./controller');

function routingRoutes() {
  const router = express.Router();
  router.post('/calculate', requireAuth(), validate(calculateRouteSchema), calculateRoutingController);
  return router;
}

module.exports = { routingRoutes };

