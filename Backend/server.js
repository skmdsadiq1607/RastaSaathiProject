const http = require('http');

const { createApp } = require('./src/app');
const { initLoaders } = require('./src/loaders');
const { env } = require('./src/config/env');
const { logger } = require('./src/utils/logger');

async function start() {
  const app = createApp();
  const server = http.createServer(app);

  process.on('unhandledRejection', (reason) => {
    logger.error('Unhandled Rejection', { reason });
  });

  process.on('uncaughtException', (err) => {
    logger.error('Uncaught Exception', { err });
    process.exit(1);
  });

  await initLoaders({ app, server });

  server.listen(env.PORT, () => {
    logger.info(`RoadSoS backend listening on port ${env.PORT}`, {
      env: env.NODE_ENV
    });
  });
}

start().catch((err) => {
  logger.error('Failed to start server', { err });
  process.exit(1);
});

