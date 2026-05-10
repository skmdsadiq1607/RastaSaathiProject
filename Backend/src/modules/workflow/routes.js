const express = require('express');
const { requireAuth } = require('../../middleware/auth.middleware');
const { getWorkflowStatusController } = require('./controller');

function workflowRoutes() {
  const router = express.Router();
  router.get('/:incidentId/status', requireAuth(), getWorkflowStatusController);
  return router;
}

module.exports = { workflowRoutes };

