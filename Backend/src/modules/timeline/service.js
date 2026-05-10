const { Timeline } = require('./model');

async function appendEvent({ io, incidentId, eventType, description, actor, metadata }) {
  const tl = await Timeline.findOneAndUpdate(
    { incidentId },
    {
      $setOnInsert: { incidentId, events: [] },
      $push: {
        events: {
          eventType,
          description,
          actor,
          timestamp: new Date(),
          metadata: metadata || undefined
        }
      }
    },
    { upsert: true, new: true }
  );

  if (io) {
    io.of('/emergency').to(`incident:${String(incidentId)}`).emit('timeline:update', { incidentId: String(incidentId), eventType, description, actor, metadata });
    io.of('/responder').to(`incident:${String(incidentId)}`).emit('timeline:update', { incidentId: String(incidentId), eventType, description, actor, metadata });
  }

  return tl;
}

module.exports = { appendEvent };

