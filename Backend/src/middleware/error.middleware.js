const { fail } = require('../utils/responseFormatter');
const { logger } = require('../utils/logger');
const { env } = require('../config/env');

function errorMiddleware(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const code = err.code || 'INTERNAL_ERROR';

  const payload = fail({
    code,
    message: err.message || 'Something went wrong',
    details: err.details
  });

  if (env.NODE_ENV !== 'test') {
    logger.error('Request error', {
      code,
      statusCode,
      path: req.originalUrl,
      method: req.method,
      err
    });
  }

  res.status(statusCode).json(payload);
}

module.exports = { errorMiddleware };

