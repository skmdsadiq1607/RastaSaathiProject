const express = require('express');
const { validate } = require('../../middleware/validate.middleware');
const { createIncidentSchema } = require('./validator');
const { createIncidentController, getIncidentController } = require('./controller');

function incidentRoutes() {
  const router = express.Router();
  router.post('/', validate(createIncidentSchema), createIncidentController);
  router.get('/:id', getIncidentController);
  return router;
}

module.exports = { incidentRoutes };

