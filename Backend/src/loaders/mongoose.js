const mongoose = require('mongoose');
const { dbConfig } = require('../config/db');
const { logger } = require('../utils/logger');

async function initMongoose() {
  mongoose.set('strictQuery', true);

  mongoose.connection.on('connected', () => logger.info('MongoDB connected'));
  mongoose.connection.on('error', (err) => logger.error('MongoDB connection error', { err }));
  mongoose.connection.on('disconnected', () => logger.warn('MongoDB disconnected'));

  await mongoose.connect(dbConfig.uri, {
    autoIndex: true
  });
}

module.exports = { initMongoose };

