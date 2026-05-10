const { SOS } = require('./model');
const { createIncident } = require('../incident/service');
const { AppError } = require('../../utils/AppError');

async function enforceSosRateLimit({ redis, userId }) {
  if (!userId) return;
  const key = `rl:sos:${userId}:${new Date().toISOString().slice(0, 13)}`; // hour bucket
  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, 60 * 60 + 10);
  if (count > 3) throw new AppError('SOS rate limit exceeded', 429, 'RATE_LIMIT');
}

async function triggerSos({ io, redis, queues, lat, lng, userId, injuryType, vehicleType }) {
  await enforceSosRateLimit({ redis, userId });

  const incident = await createIncident({ userId, lat, lng, injuryType, vehicleType });

  const sos = await SOS.create({
    userId: userId || undefined,
    incidentId: incident._id,
    location: { type: 'Point', coordinates: [lng, lat] },
    injuryType,
    vehicleType
  });

  // Fan-out via queue: workflow orchestrator will do the rest.
  await queues.sos.add('trigger', {
    incidentId: String(incident._id),
    sosId: String(sos._id),
    lat,
    lng,
    userId: userId || null,
    injuryType: injuryType || null,
    vehicleType: vehicleType || null
  });

  // Immediate realtime broadcast
  io.of('/emergency').to(`incident:${String(incident._id)}`).emit('sos:triggered', {
    incidentId: String(incident._id),
    sosId: String(sos._id),
    lat,
    lng
  });
  io.of('/dashboard').to('dashboard').emit('dashboard:sos', {
    incidentId: String(incident._id),
    lat,
    lng
  });

  return { sos, incident };
}

module.exports = { triggerSos };

