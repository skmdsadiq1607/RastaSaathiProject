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

  const { User } = require('../auth/model');
  const { selectHospital, selectPoliceStation } = require('../hospital/service');
  const { dispatchAlerts } = require('../alerts/service');
  const { startSession } = require('../firstaid/service');
  const { predictSeverityRuleBased } = require('../../utils/severityScorer');

  const victimUser = userId ? await User.findById(userId).lean() : null;
  const incident = await createIncident({ userId, lat, lng, injuryType, vehicleType });
  const sos = await SOS.create({
    userId: userId || undefined,
    incidentId: incident._id,
    location: { type: 'Point', coordinates: [lng, lat] },
    injuryType,
    vehicleType
  });

  // 1. Determine Severity
  const severity = predictSeverityRuleBased({ injuryType, vehicleType });

  const hospitalSelection = await selectHospital({ 
    lat, lng, 
    severityLevel: severity.level, 
    injuryType 
  });
  const nearest = hospitalSelection?.[0]?.hospital;

  // 2b. Select Nearest Police Station
  const policeSelection = await selectPoliceStation({ lat, lng });
  const nearestPolice = policeSelection?.[0];

  // 3. Dispatch Alerts (WhatsApp/SMS/FCM)
  await dispatchAlerts({
    io,
    incident,
    victimUser,
    severityLevel: severity.level,
    hospitalName: nearest?.name,
    hospitalLocation: nearest?.location,
    policeName: nearestPolice?.name,
    policeLocation: nearestPolice?.location,
    etaSeconds: hospitalSelection?.[0]?.etaSeconds,
    lang: victimUser?.language || 'en'
  });

  // 4. Start AI First Aid Session
  let aiGuidance = null;
  try {
    aiGuidance = await startSession({
      incidentId: incident._id,
      userId,
      injuryType,
      severityLevel: severity.level,
      language: victimUser?.language || 'en'
    });
  } catch (e) {
    // Fallback if AI fails
    aiGuidance = { sessionId: null, guidance: { answer: "Stay calm. Apply pressure to any wounds. Help is on the way." } };
  }

  // Realtime broadcast
  if (io) {
    io.of('/dashboard').emit('dashboard:sos', { incidentId: String(incident._id), lat, lng });
  }

  return { sos, incident, hospitalSelection, policeSelection, aiGuidance };
}

module.exports = { triggerSos };

