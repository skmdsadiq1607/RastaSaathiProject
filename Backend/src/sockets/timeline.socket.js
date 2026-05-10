const { socketAuthMiddleware } = require('./_socketAuth');

function registerTimelineSocket(io) {
  const nsp = io.of('/responder');
  nsp.use(socketAuthMiddleware);

  nsp.on('connection', (socket) => {
    socket.on('join:incident', ({ incidentId }) => {
      if (incidentId) socket.join(`incident:${incidentId}`);
    });
  });
}

module.exports = { registerTimelineSocket };

