const { SOS } = require('./model');
const { createIncident } = require('../incident/service');
const { AppError } = require('../../utils/AppError');

async function enforceSosRateLimit({ redis, userId }) {
  if (!redis || !userId) return;
  try {
    const key = `rl:sos:${userId}:${new Date().toISOString().slice(0, 13)}`;
    const count = await redis.incr(key);
    if (count === 1) await redis.expire(key, 3610);
    if (count > 5) throw new AppError('Rate limit exceeded', 429);
  } catch (e) {
    // Ignore redis errors in dev/free tier
  }
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

  let hospitalSelection = [];
  let aiGuidance = null;

  // If queues exist, use them. Otherwise, run workflow synchronously for Free Tiers (Render)
  if (queues && queues.sos) {
    await queues.sos.add('trigger', {
      incidentId: String(incident._id),
      sosId: String(sos._id),
      lat, lng, userId, injuryType
    });
  } else {
    // SYNC FALLBACK: Run the core workflow logic directly
    const { processSosWorkflow } = require('../workflow/service');
    const result = await processSosWorkflow({
      incidentId: String(incident._id),
      lat, lng, userId, injuryType
    });
    hospitalSelection = result.hospitalSelection;
    aiGuidance = result.aiGuidance;
  }

  // Realtime broadcast
  if (io) {
    io.of('/dashboard').emit('dashboard:sos', { incidentId: String(incident._id), lat, lng });
  }

  return { sos, incident, hospitalSelection, aiGuidance };
}

module.exports = { triggerSos };

