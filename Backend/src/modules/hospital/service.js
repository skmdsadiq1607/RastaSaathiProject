const { Hospital } = require('./model');
const { Resources } = require('../resources/model');
const { distanceMatrix, findNearbyHospitals } = require('../../services/maps.service');
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
  const cap = 45 * 60;
  const v = Math.min(cap, Math.max(0, etaSeconds));
  return 1 - v / cap;
}

async function selectHospital({ lat, lng, severityLevel, injuryType, requiredSpecialty }) {
  const origin = { lat, lng };
  
  let googleHospitals = [];
  try {
    // 1. Fetch real-time hospitals from Google Places API
    googleHospitals = await findNearbyHospitals({ lat, lng, radius: 50000 });
  } catch (err) {
    console.error('[Hospital Service] Google Places API failed, falling back to local database only');
  }

  let finalHospitals = [];

  if (googleHospitals.length > 0) {
    // Map Google results to our internal structure
    finalHospitals = googleHospitals.map(gh => ({
      _id: gh.place_id, // Use place_id as temporary ID
      name: gh.name,
      address: gh.vicinity,
      location: {
        type: 'Point',
        coordinates: [gh.geometry.location.lng, gh.geometry.location.lat]
      },
      rating: gh.rating,
      userRatingsTotal: gh.user_ratings_total,
      isGoogleResult: true
    }));
  } else {
    // Fallback: Find top 25 closest hospitals from our local DB
    finalHospitals = await Hospital.find({
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [lng, lat] },
          $maxDistance: 50000 
        }
      }
    }).limit(25).lean();
  }

  if (!finalHospitals.length) {
    throw new AppError('No hospitals found in immediate vicinity.', 404, 'NO_HOSPITALS');
  }

  // 2. Enrich with local database metadata if available
  // We try to match by name or proximity if it's a Google result
  const dbHospitals = await Hospital.find({}).lean();
  
  const enrichedHospitals = finalHospitals.map(h => {
    let match = null;
    if (h.isGoogleResult) {
      // Try to find a match in our DB to get trauma/specialty info
      match = dbHospitals.find(dbh => 
        dbh.name.toLowerCase().includes(h.name.toLowerCase()) || 
        h.name.toLowerCase().includes(dbh.name.toLowerCase())
      );
    } else {
      match = h;
    }

    return {
      ...h,
      traumaCenter: match?.traumaCenter || false,
      specialties: match?.specialties || [],
      icuBeds: match?.icuBeds || 5, // Default assumed
      bloodBankAvailable: match?.bloodBankAvailable || false,
      phoneNumber: match?.phoneNumber || '+91 9441921812', // Default support
      _dbId: match?._id
    };
  });

  // 3. Get accurate ETA via Distance Matrix
  let elements = [];
  try {
    const destinations = enrichedHospitals.slice(0, 15).map((h) => ({
      lat: h.location.coordinates[1],
      lng: h.location.coordinates[0]
    }));
    const dm = await distanceMatrix({ origins: [origin], destinations });
    elements = dm.rows?.[0]?.elements || [];
  } catch (err) {
    console.error('[Hospital Service] Distance Matrix failed');
  }

  const resources = await Resources.find({ hospitalId: { $in: enrichedHospitals.map(h => h._dbId).filter(Boolean) } }).lean();
  const resMap = new Map(resources.map((r) => [String(r.hospitalId), r]));

  const ranked = enrichedHospitals.slice(0, 15)
    .map((h, idx) => {
      const el = elements[idx];
      let etaSeconds;
      
      if (el?.status === 'OK') {
        etaSeconds = el.duration.value;
      } else {
        const d = Math.sqrt(
          Math.pow(h.location.coordinates[1] - lat, 2) + 
          Math.pow(h.location.coordinates[0] - lng, 2)
        ) * 111000;
        etaSeconds = Math.round((d / 11) * 1.5);
      }

      const r = h._dbId ? (resMap.get(String(h._dbId)) || {}) : {};
      const icuAvail = Math.min(1, (Number(r.icuBeds ?? h.icuBeds ?? 0) || 0) / 20);
      const trauma = traumaMatchScore(Boolean(h.traumaCenter), severityLevel);
      const eta = normalizeEtaSeconds(etaSeconds);
      const blood = h.bloodBankAvailable ? 1 : 0;
      const spec = specialtyMatchScore(h.specialties, requiredSpecialty || injuryType);

      // Final scoring weighted towards ETA and Trauma capabilities
      const score = 0.2 * icuAvail + 0.3 * trauma + 0.3 * eta + 0.1 * blood + 0.1 * spec;

      return { hospital: h, score, etaSeconds };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return ranked;
}

module.exports = { selectHospital };

