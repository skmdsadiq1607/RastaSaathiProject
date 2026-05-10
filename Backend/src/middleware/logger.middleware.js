const morgan = require('morgan');
const { logger } = require('../utils/logger');

const stream = {
  write: (message) => logger.info(message.trim())
};

function loggerMiddleware() {
  return morgan('combined', { stream });
}

module.exports = { loggerMiddleware };

