const { Incident, getNextSequenceValue } = require('./model');
const { AppError } = require('../../utils/AppError');

// GPS impact detection settings
const G_FORCE_THRESHOLD = 3.0; // >3g delta
const MIN_SPEED_KMH = 20;

function computeGDelta(accelerometer) {
  if (!accelerometer) return 0;
  const { ax = 0, ay = 0, az = 0, prevAx = 0, prevAy = 0, prevAz = 0 } = accelerometer;
  const delta = Math.sqrt((ax - prevAx) ** 2 + (ay - prevAy) ** 2 + (az - prevAz) ** 2);
  return delta;
}

async function createIncident({ userId, lat, lng, injuryType, vehicleType }) {
  if (typeof lat !== 'number' || typeof lng !== 'number') {
    throw new AppError('Invalid location', 400, 'VALIDATION_ERROR');
  }
  
  // Fetch next sequential count and pad it to four digits (e.g. RS-0001, RS-0002)
  const seq = await getNextSequenceValue('incidentSeq');
  const ticketNumber = `RS-${String(seq).padStart(4, '0')}`;

  const incident = await Incident.create({
    createdByUser: userId || undefined,
    ticketNumber,
    location: { type: 'Point', coordinates: [lng, lat] },
    injuryType,
    vehicleType
  });
  return incident;
}

async function getIncidentById(id) {
  const incident = await Incident.findById(id)
    .populate('createdByUser', 'name phone role language')
    .populate('assignedResponder', 'name phone role')
    .populate('selectedHospital');
  if (!incident) throw new AppError('Incident not found', 404, 'NOT_FOUND');
  return incident;
}

// In-memory cache for debouncing and countdowns (since we removed Redis)
const cache = new Map();

// Socket handler: detect sudden impact and initiate 10s countdown
async function initGpsDetector({ socket, payload }) {
  const { lat, lng, speed, accelerometer } = payload || {};

  const gDelta = computeGDelta(accelerometer);
  const speedKmh = Number(speed || 0);
  const latNum = Number(lat);
  const lngNum = Number(lng);

  if (!Number.isFinite(latNum) || !Number.isFinite(lngNum)) return;

  // Best-effort: update responder/victim location for geospatial matching
  try {
    const { User } = require('../auth/model');
    if (socket.user?.sub) {
      await User.findByIdAndUpdate(socket.user.sub, {
        $set: { location: { type: 'Point', coordinates: [lngNum, latNum] } }
      });
    }
  } catch {
    // ignore
  }

  if (speedKmh >= MIN_SPEED_KMH && gDelta >= G_FORCE_THRESHOLD) {
    const userId = socket.user?.sub;
    const incidentKey = `impact:last:${userId}`;
    
    if (cache.get(incidentKey)) return; // debounce
    cache.set(incidentKey, true);
    setTimeout(() => cache.delete(incidentKey), 30000);

    const countdownId = `countdown:${userId}:${Date.now()}`;
    socket.emit('incident:impactDetected', { countdownSeconds: 10, gDelta, speedKmh, countdownId });
    
    const activeKey = `countdown:active:${userId}`;
    cache.set(activeKey, countdownId);
    setTimeout(() => cache.delete(activeKey), 20000);

    setTimeout(async () => {
      try {
        if (cache.get(`countdown:cancel:${countdownId}`)) return;
        if (cache.get(activeKey) !== countdownId) return;
        socket.emit('incident:autoSos', { lat: latNum, lng: lngNum });
      } catch {
        // ignore
      }
    }, 10_000);
  }
}

// Helper to cancel countdown from socket
function cancelCountdown(countdownId) {
  cache.set(`countdown:cancel:${countdownId}`, true);
  setTimeout(() => cache.delete(`countdown:cancel:${countdownId}`), 30000);
}

module.exports = { createIncident, getIncidentById, initGpsDetector, cancelCountdown };

