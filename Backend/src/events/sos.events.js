const appEmitter = require('./index');
const logger = require('../utils/logger');
const { sosQueue } = require('../queues/index');

appEmitter.on('sos:triggered', async (payload) => {
  try {
    logger.info(`SOS Event Received for user: ${payload.userId}`);
    await sosQueue.add('process-sos', payload);
  } catch (err) {
    logger.error(`Error in sos:triggered event listener: ${err.message}`);
  }
});
