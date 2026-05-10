const appEmitter = require('./index');
const logger = require('../utils/logger');
const { timelineSocket } = require('../sockets/index');

appEmitter.on('incident:created', (payload) => {
  logger.info(`Incident created: ${payload.incidentId}`);
  // Handle incident creation side effects
});

appEmitter.on('incident:updated', (payload) => {
  logger.info(`Incident updated: ${payload.incidentId}`);
});
