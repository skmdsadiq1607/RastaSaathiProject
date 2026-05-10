const { Server } = require('socket.io');
const { socketConfig } = require('../config/socket');
const { registerSockets } = require('../sockets');
const { env } = require('../config/env');
const { logger } = require('../utils/logger');

async function initSockets({ server }) {
  const io = new Server(server, {
    cors: {
      origin: socketConfig.corsOrigin,
      credentials: true
    }
  });

  io.on('error', (err) => logger.error('Socket.IO error', { err }));

  registerSockets(io);
  return io;
}

module.exports = { initSockets };

