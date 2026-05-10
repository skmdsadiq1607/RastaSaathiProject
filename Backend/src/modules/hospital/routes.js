const express = require('express');
const { requireAuth } = require('../../middleware/auth.middleware');
const { validate } = require('../../middleware/validate.middleware');
const { selectHospitalSchema } = require('./validator');
const { selectHospitalController } = require('./controller');

function hospitalRoutes() {
  const router = express.Router();
  router.post('/select', requireAuth(), validate(selectHospitalSchema), selectHospitalController);
  return router;
}

module.exports = { hospitalRoutes };

