const express = require('express');
const { requireAuth } = require('../../middleware/auth.middleware');
const { validate } = require('../../middleware/validate.middleware');
const { registerSchema, loginSchema, refreshSchema } = require('./validator');
const {
  registerController,
  loginController,
  logoutController,
  refreshController,
  googleLoginController,
  updateProfileController,
  getProfileController
} = require('./controller');

function authRoutes() {
  const router = express.Router();

  router.post('/register', validate(registerSchema), registerController);
  router.post('/login', validate(loginSchema), loginController);
  router.post('/google', googleLoginController); // Google Auth
  router.post('/refresh', validate(refreshSchema), refreshController);
  router.post('/logout', logoutController);
  router.get('/profile', requireAuth(), getProfileController);
  router.put('/profile', requireAuth(), updateProfileController);

  return router;
}

module.exports = { authRoutes };

