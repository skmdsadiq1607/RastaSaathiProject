const winston = require('winston');
const { env } = require('../config/env');

const { combine, timestamp, errors, json } = winston.format;

const logger = winston.createLogger({
  level: env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: combine(timestamp(), errors({ stack: true }), json()),
  transports: [new winston.transports.Console()]
});

module.exports = { logger };

