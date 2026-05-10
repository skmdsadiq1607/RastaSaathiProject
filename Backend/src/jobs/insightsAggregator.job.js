const Queue = require('bull');
const env = require('../config/env');
const logger = require('../utils/logger');

const insightsQueue = new Queue('insights-aggregator', env.redisUrl);

insightsQueue.process(async (job) => {
  logger.info('Running insights aggregator job...');
  try {
    // Logic to aggregate data for insights
    logger.info('Insights aggregation completed.');
  } catch (err) {
    logger.error('Error aggregating insights:', err.message);
  }
});

// Run daily at 1 AM
insightsQueue.add({}, { repeat: { cron: '0 1 * * *' } });

module.exports = insightsQueue;
