const express = require('express');
const { validate } = require('../../middleware/validate.middleware');
const { registerSchema, loginSchema, refreshSchema } = require('./validator');
const {
  registerController,
  loginController,
  logoutController,
  refreshController,
  googleLoginController
} = require('./controller');

function authRoutes() {
  const router = express.Router();

  router.post('/register', validate(registerSchema), registerController);
  router.post('/login', validate(loginSchema), loginController);
  router.post('/google', googleLoginController); // Google Auth
  router.post('/refresh', validate(refreshSchema), refreshController);
  router.post('/logout', logoutController);

  return router;
}

module.exports = { authRoutes };

