const { socketAuthMiddleware } = require('./_socketAuth');
const { ROLES } = require('../utils/constants');

function registerDashboardSocket(io) {
  const nsp = io.of('/dashboard');
  nsp.use(socketAuthMiddleware);

  nsp.on('connection', (socket) => {
    if (socket.user?.role !== ROLES.ADMIN) {
      socket.disconnect(true);
      return;
    }
    socket.join('dashboard');
  });
}

module.exports = { registerDashboardSocket };

