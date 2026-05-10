const EventEmitter = require('events');
const logger = require('../utils/logger');

class InMemoryQueue extends EventEmitter {
  constructor(name) {
    super();
    this.name = name;
  }

  add(jobName, data) {
    logger.info(`Job ${jobName} added to ${this.name} queue`);
    // Run asynchronously without blocking
    setImmediate(() => {
      this.emit(jobName, data);
    });
  }

  process(jobName, callback) {
    this.on(jobName, async (data) => {
      try {
        await callback({ data });
      } catch (err) {
        logger.error(`Error processing job ${jobName} in ${this.name} queue:`, err);
      }
    });
  }
}

const sosQueue = new InMemoryQueue('sos');
const alertsQueue = new InMemoryQueue('alerts');
const severityQueue = new InMemoryQueue('severity');
const smsQueue = new InMemoryQueue('sms');

module.exports = { sosQueue, alertsQueue, severityQueue, smsQueue };

