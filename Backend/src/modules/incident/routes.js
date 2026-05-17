const express = require('express');
const { validate } = require('../../middleware/validate.middleware');
const { createIncidentSchema } = require('./validator');
const { createIncidentController, getIncidentController, getUserIncidentsController } = require('./controller');
const { requireAuth } = require('../../middleware/auth.middleware');

function incidentRoutes() {
  const router = express.Router();
  router.post('/', validate(createIncidentSchema), createIncidentController);
  router.get('/', requireAuth(), getUserIncidentsController); // Fetch active user's incidents
  router.get('/:id', getIncidentController);
  return router;
}

module.exports = { incidentRoutes };

