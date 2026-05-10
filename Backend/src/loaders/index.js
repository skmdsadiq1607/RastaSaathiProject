const { initMongoose } = require('./mongoose');
const { initSockets } = require('./sockets');
const { initExpress } = require('./express');

async function initLoaders({ app, server }) {
  await initMongoose();
  const io = await initSockets({ server });
  await initExpress({ app, io });
}

module.exports = { initLoaders };

