const jwt = require('jsonwebtoken');
const { env } = require('../config/env');
const { AppError } = require('../utils/AppError');

function requireAuth(allowedRoles = []) {
  return (req, res, next) => {
    const header = req.headers.authorization || '';
    const [type, token] = header.split(' ');
    if (type !== 'Bearer' || !token) return next(new AppError('Unauthorized', 401, 'UNAUTHORIZED'));

    try {
      // Redis blacklist check (logout)
      const redis = req.context?.redis;
      if (redis) {
        redis.get(`bl:access:${token}`).then((v) => {
          if (v) return next(new AppError('Unauthorized', 401, 'UNAUTHORIZED'));
          proceed();
        });
        return;
      }
      proceed();
      function proceed() {
      const payload = jwt.verify(token, env.JWT_SECRET);
      req.user = payload;
      if (Array.isArray(allowedRoles) && allowedRoles.length > 0) {
        if (!allowedRoles.includes(payload.role)) {
          return next(new AppError('Forbidden', 403, 'FORBIDDEN'));
        }
      }
      next();
      }
    } catch {
      return next(new AppError('Unauthorized', 401, 'UNAUTHORIZED'));
    }
  };
}

module.exports = { requireAuth };

