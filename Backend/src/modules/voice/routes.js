const express = require('express');
const { requireAuth } = require('../../middleware/auth.middleware');
const { validate } = require('../../middleware/validate.middleware');
const { triggerVoiceSchema } = require('./validator');
const { voiceUploadMiddleware, triggerVoiceController, cancelVoiceController } = require('./controller');

function voiceRoutes() {
  const router = express.Router();
  router.post(
    '/trigger',
    requireAuth(),
    voiceUploadMiddleware('audio'),
    validate(triggerVoiceSchema),
    triggerVoiceController
  );

  // For hackathon practicality, stream is treated as a multipart upload too.
  router.post(
    '/stream',
    requireAuth(),
    voiceUploadMiddleware('audio'),
    validate(triggerVoiceSchema),
    triggerVoiceController
  );

  router.post('/cancel', requireAuth(), cancelVoiceController);
  return router;
}

module.exports = { voiceRoutes };

