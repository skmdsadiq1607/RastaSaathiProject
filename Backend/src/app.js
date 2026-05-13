const express = require('express');
// Version 1.1.2 - Final CORS Fix for Hackathon
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

const { env } = require('./config/env');
const { errorMiddleware } = require('./middleware/error.middleware');
const { loggerMiddleware } = require('./middleware/logger.middleware');
const { publicRateLimit } = require('./middleware/rateLimit.middleware');
const { languageMiddleware } = require('./middleware/language.middleware');
const { ok } = require('./utils/responseFormatter');

function createApp() {
  const app = express();

  app.disable('x-powered-by');
  app.use(
    helmet({
      crossOriginOpenerPolicy: { policy: 'same-origin-allow-popups' },
      crossOriginResourcePolicy: { policy: 'cross-origin' }
    })
  );
  
  app.use(cors({ origin: '*', credentials: true }));
  
  app.use(compression());
  app.use(express.json({ limit: '2mb' }));
  app.use(express.urlencoded({ extended: true, limit: '2mb' }));
  app.use(mongoSanitize());
  app.use(xss());
  app.use(loggerMiddleware());
  app.use(publicRateLimit());
  app.use(languageMiddleware);

  app.get('/health', (req, res) => res.json(ok({ data: { status: 'ok' } })));

  // Routes are registered in loaders/express.js after infra is ready.

  app.use(errorMiddleware);
  return app;
}

module.exports = { createApp };
