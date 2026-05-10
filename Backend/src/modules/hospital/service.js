const { Hospital } = require('./model');
const { Resources } = require('../resources/model');
const { distanceMatrix } = require('../../services/maps.service');
const { AppError } = require('../../utils/AppError');

function specialtyMatchScore(hospitalSpecialties, requiredSpecialty) {
  if (!requiredSpecialty) return 0.5;
  const s = String(requiredSpecialty).toLowerCase();
  const has = (hospitalSpecialties || []).some((x) => String(x).toLowerCase().includes(s));
  return has ? 1 : 0;
}

function traumaMatchScore(traumaCenter, severityLevel) {
  if (severityLevel === 'CRITICAL' || severityLevel === 'HIGH') return traumaCenter ? 1 : 0;
  return traumaCenter ? 0.7 : 0.4;
}

function normalizeEtaSeconds(etaSeconds) {
  // 0..1 where 1 is best (lowest ETA). Cap at 45min.
  const cap = 45 * 60;
  const v = Math.min(cap, Math.max(0, etaSeconds));
  return 1 - v / cap;
}

async function selectHospital({ lat, lng, severityLevel, injuryType, requiredSpecialty }) {
  const origin = { lat, lng };
  const hospitals = await Hospital.find({}).lean();
  if (!hospitals.length) throw new AppError('No hospitals seeded', 500, 'NO_HOSPITALS');

  let elements = [];
  try {
    const destinations = hospitals.map((h) => ({
      lat: h.location.coordinates[1],
      lng: h.location.coordinates[0]
    }));
    const dm = await distanceMatrix({ origins: [origin], destinations });
    elements = dm.rows?.[0]?.elements || [];
  } catch (err) {
    console.error('[Hospital Service] Distance Matrix failed, using straight-line distance fallback');
  }

  const resources = await Resources.find({ hospitalId: { $in: hospitals.map((h) => h._id) } }).lean();
  const resMap = new Map(resources.map((r) => [String(r.hospitalId), r]));

  const ranked = hospitals
    .map((h, idx) => {
      const el = elements[idx];
      let etaSeconds;
      
      if (el?.status === 'OK') {
        etaSeconds = el.duration.value;
      } else {
        // Straight-line distance fallback (approx 40km/h)
        const d = Math.sqrt(
          Math.pow(h.location.coordinates[1] - lat, 2) + 
          Math.pow(h.location.coordinates[0] - lng, 2)
        ) * 111000; // rough meters
        etaSeconds = Math.round((d / 11) * 1.5); // 11m/s ~ 40kmh, 1.5x for road winding
      }

      const r = resMap.get(String(h._id)) || {};
      const icuAvail = Math.min(1, (Number(r.icuBeds ?? h.icuBeds ?? 0) || 0) / 20);
      const trauma = traumaMatchScore(Boolean(h.traumaCenter), severityLevel);
      const eta = normalizeEtaSeconds(etaSeconds);
      const blood = h.bloodBankAvailable ? 1 : 0;
      const spec = specialtyMatchScore(h.specialties, requiredSpecialty || injuryType);

      const score = 0.25 * icuAvail + 0.25 * trauma + 0.2 * eta + 0.15 * blood + 0.15 * spec;

      return { hospital: h, score, etaSeconds };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return ranked;
}

module.exports = { selectHospital };

