const appEmitter = require('./index');
const logger = require('../utils/logger');

appEmitter.on('hospital:selected', (payload) => {
  logger.info(`Hospital selected for incident: ${payload.incidentId}`);
  // Handle hospital selection side effects
});
