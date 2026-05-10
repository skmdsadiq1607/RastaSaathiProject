const { env } = require('./env');

const dbConfig = Object.freeze({
  uri: env.MONGODB_URI
});

module.exports = { dbConfig };

