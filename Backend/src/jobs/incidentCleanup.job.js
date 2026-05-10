const Queue = require('bull');
const env = require('../config/env');
const logger = require('../utils/logger');
const Incident = require('../modules/incident/model');

const cleanupQueue = new Queue('incident-cleanup', env.redisUrl);

cleanupQueue.process(async (job) => {
  logger.info('Running incident cleanup job...');
  try {
    // Logic to archive or clean up old resolved incidents
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const result = await Incident.updateMany(
      { status: 'RESOLVED', updatedAt: { $lt: thirtyDaysAgo } },
      { status: 'ARCHIVED' }
    );
    logger.info(`Archived ${result.modifiedCount} old incidents.`);
  } catch (err) {
    logger.error('Error cleaning up incidents:', err.message);
  }
});

// Run daily at midnight
cleanupQueue.add({}, { repeat: { cron: '0 0 * * *' } });

module.exports = cleanupQueue;
