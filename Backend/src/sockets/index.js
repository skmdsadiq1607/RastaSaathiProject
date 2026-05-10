const { registerSosSocket } = require('./sos.socket');
const { registerTimelineSocket } = require('./timeline.socket');
const { registerDashboardSocket } = require('./dashboard.socket');

function registerSockets(io) {
  registerSosSocket(io);
  registerTimelineSocket(io);
  registerDashboardSocket(io);
}

module.exports = { registerSockets };

