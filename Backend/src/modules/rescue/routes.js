const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { requireAuth } = require('../../middleware/auth.middleware');

router.get('/nearby', requireAuth(), controller.getNearbyResources);

module.exports = router;
