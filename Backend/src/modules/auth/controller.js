const { ok } = require('../../utils/responseFormatter');
const { register, login, logout, refresh, googleLogin } = require('./service');

async function registerController(req, res, next) {
  try {
    const result = await register(req.body);
    res.status(201).json(ok({ data: result, message: 'Registered' }));
  } catch (err) {
    next(err);
  }
}

async function loginController(req, res, next) {
  try {
    const result = await login(req.body);
    res.json(ok({ data: result, message: 'Logged in' }));
  } catch (err) {
    next(err);
  }
}

async function logoutController(req, res, next) {
  try {
    const { redis } = req.context;
    const accessToken = (req.headers.authorization || '').split(' ')[1];
    const refreshToken = req.body?.refreshToken;
    await logout({ redis, accessToken, refreshToken });
    res.json(ok({ data: {}, message: 'Logged out' }));
  } catch (err) {
    next(err);
  }
}

async function refreshController(req, res, next) {
  try {
    const { redis } = req.context;
    const result = await refresh({ redis, refreshToken: req.body.refreshToken });
    res.json(ok({ data: result, message: 'Refreshed' }));
  } catch (err) {
    next(err);
  }
}

async function googleLoginController(req, res, next) {
  try {
    const result = await googleLogin(req.body);
    res.json(ok({ data: result, message: 'Logged in with Google' }));
  } catch (err) {
    next(err);
  }
}

module.exports = { registerController, loginController, logoutController, refreshController, googleLoginController };

