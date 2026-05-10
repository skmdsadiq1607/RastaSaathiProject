const { socketAuthMiddleware } = require('./_socketAuth');
const { initGpsDetector, cancelCountdown } = require('../modules/incident/service');

function registerSosSocket(io) {
  const nsp = io.of('/emergency');
  nsp.use(socketAuthMiddleware);

  nsp.on('connection', (socket) => {
    socket.on('join:incident', ({ incidentId }) => {
      if (incidentId) socket.join(`incident:${incidentId}`);
    });

    socket.on('gps:update', async (payload) => {
      await initGpsDetector({ socket, payload });
    });

    socket.on('sos:cancelCountdown', async ({ countdownId }) => {
      if (countdownId) {
        cancelCountdown(countdownId);
      }
    });
  });
}

module.exports = { registerSosSocket };
