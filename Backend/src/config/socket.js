const { env } = require('./env');

const socketConfig = Object.freeze({
  corsOrigin: env.FRONTEND_URL
});

module.exports = { socketConfig };

