const Queue = require('bull');
const env = require('../config/env');
const logger = require('../utils/logger');
const Hospital = require('../modules/hospital/model');
const Resource = require('../modules/resources/model');

const syncQueue = new Queue('resource-sync', env.redisUrl);

syncQueue.process(async (job) => {
  logger.info('Running resource sync job...');
  try {
    // Dummy logic for syncing resources from hospitals
    const hospitals = await Hospital.find();
    for (const hospital of hospitals) {
      await Resource.findOneAndUpdate(
        { hospitalId: hospital._id },
        { 
          hospitalId: hospital._id,
          icuBeds: hospital.icuBeds,
          ventilators: hospital.ventilators,
          bloodUnits: hospital.bloodUnits,
          ambulancesAvailable: hospital.ambulancesAvailable,
          traumaTeamOnDuty: hospital.traumaTeamOnDuty
        },
        { upsert: true, new: true }
      );
    }
    logger.info('Resource sync completed successfully.');
  } catch (err) {
    logger.error('Error syncing resources:', err.message);
  }
});

// Run every 5 minutes
syncQueue.add({}, { repeat: { cron: '*/5 * * * *' } });

module.exports = syncQueue;
