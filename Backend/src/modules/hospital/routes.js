const express = require('express');
const { requireAuth } = require('../../middleware/auth.middleware');
const { validate } = require('../../middleware/validate.middleware');
const { selectHospitalSchema } = require('./validator');
const { selectHospitalController } = require('./controller');

function hospitalRoutes() {
  const router = express.Router();
  router.post('/select', requireAuth(), validate(selectHospitalSchema), selectHospitalController);
  
  // Secret route to seed without shell access
  router.get('/seed-now', async (req, res, next) => {
    try {
      const { seedHospitals } = require('../../../scripts/seedHospitals');
      const count = await seedHospitals();
      res.json({ success: true, message: `${count} Hospitals Seeded Successfully!` });
    } catch (err) {
      next(err);
    }
  });

  return router;
}

module.exports = { hospitalRoutes };

