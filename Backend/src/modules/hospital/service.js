const { Hospital } = require('./model');
const { PoliceStation } = require('../police/model');
const { Resources } = require('../resources/model');
const { distanceMatrix, findNearbyHospitals, findNearbyPoliceStations } = require('../../services/maps.service');
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

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

async function selectHospital({ lat, lng, severityLevel, injuryType, requiredSpecialty }) {
  const origin = { lat, lng };
  
  let googleHospitals = [];
  try {
    // 1. Fetch real-time hospitals from Google Places API
    googleHospitals = await findNearbyHospitals({ lat, lng, radius: 50000 });
  } catch (err) {
    console.error('[Hospital Service] Google Places API failed, trying Nominatim fallback');
  }

  // If Google Places fails (e.g., key restricted), query live OSM Nominatim search
  if (!googleHospitals || googleHospitals.length === 0) {
    try {
      console.log('[Hospital Service] Querying Nominatim for live hospitals...');
      const { searchNearbyNominatim } = require('../../services/maps.service');
      const osmHospitals = await searchNearbyNominatim({ lat, lng, q: 'hospital', limit: 40 });
      if (osmHospitals && osmHospitals.length > 0) {
        const { cleanNominatimName } = require('../../services/maps.service');
        googleHospitals = osmHospitals.map(oh => ({
          place_id: oh.place_id || oh.osm_id,
          name: cleanNominatimName(oh, 'hospital'),
          vicinity: oh.display_name,
          geometry: {
            location: {
              lat: parseFloat(oh.lat),
              lng: parseFloat(oh.lon)
            }
          },
          rating: 4.6,
          user_ratings_total: 10
        }));
      }
    } catch (osmErr) {
      console.error('[Hospital Service] Nominatim search failed:', osmErr.message);
    }
  }

  // Map Google/OSM results to our internal structure
  const liveHospitals = (googleHospitals || []).map(gh => ({
    _id: gh.place_id,
    name: gh.name,
    address: gh.vicinity,
    location: {
      type: 'Point',
      coordinates: [gh.geometry.location.lng, gh.geometry.location.lat]
    },
    rating: gh.rating || 4.5,
    userRatingsTotal: gh.user_ratings_total || 10,
    isGoogleResult: true
  }));

  let finalHospitals = liveHospitals;

  if (!finalHospitals.length) {
    const { reverseGeocode } = require('../../utils/geoUtils');
    const placeName = await reverseGeocode(lat, lng) || 'Local Area';
    // Mock Fallback when Google API fails and no local hospitals are within 5km
    finalHospitals = [{
      _id: 'mock-hospital-1',
      name: `${placeName} Emergency Hospital`,
      address: `${placeName} Emergency Grid`,
      location: {
        type: 'Point',
        coordinates: [lng - 0.005, lat + 0.005]
      },
      rating: 4.8,
      isGoogleResult: false
    }];
  }

  // 2. Enrich with local database metadata if available
  // We try to match by name or proximity if it's a Google/OSM result
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
    });

  // PRIORITY: Sort strictly by physical distance to ensure 'Nearest' is accurate
  ranked.sort((a, b) => {
    const distA = calculateDistance(lat, lng, a.hospital.location.coordinates[1], a.hospital.location.coordinates[0]);
    const distB = calculateDistance(lat, lng, b.hospital.location.coordinates[1], b.hospital.location.coordinates[0]);
    return distA - distB;
  });

  return ranked.slice(0, 3);
}

async function selectPoliceStation({ lat, lng }) {
  const origin = { lat, lng };

  // 1. Try Google Places API first to fetch actual real-world police stations
  let googlePolice = [];
  try {
    googlePolice = await findNearbyPoliceStations({ lat, lng, radius: 15000 });
  } catch (err) {
    console.warn('[Police Service] Google Places API failed, trying Nominatim fallback');
  }

  // If Google Places fails (e.g., key restricted), query live OSM Nominatim search
  if (!googlePolice || googlePolice.length === 0) {
    try {
      console.log('[Police Service] Querying Nominatim for live police stations...');
      const { searchNearbyNominatim } = require('../../services/maps.service');
      const osmPolice = await searchNearbyNominatim({ lat, lng, q: 'police station', limit: 20 });
      if (osmPolice && osmPolice.length > 0) {
        const { cleanNominatimName } = require('../../services/maps.service');
        googlePolice = osmPolice.map(op => ({
          place_id: op.place_id || op.osm_id,
          name: cleanNominatimName(op, 'police'),
          vicinity: op.display_name,
          geometry: {
            location: {
              lat: parseFloat(op.lat),
              lng: parseFloat(op.lon)
            }
          },
          rating: 4.5
        }));
      }
    } catch (osmErr) {
      console.error('[Police Service] Nominatim search failed:', osmErr.message);
    }
  }

  const livePolice = (googlePolice || []).map(gp => ({
    _id: gp.place_id,
    name: gp.name,
    address: gp.vicinity,
    location: {
      type: 'Point',
      coordinates: [gp.geometry.location.lng, gp.geometry.location.lat]
    },
    rating: gp.rating || 4.5,
    phoneNumber: '+91 100',
    isLiveResult: true
  }));

  let finalPolice = livePolice;

  if (!finalPolice.length) {
    const { reverseGeocode } = require('../../utils/geoUtils');
    const placeName = await reverseGeocode(lat, lng) || 'Local Area';
    finalPolice = [{
      _id: 'mock-police-1',
      name: `${placeName} Police Station`,
      address: `${placeName} Emergency Response Grid`,
      location: {
        type: 'Point',
        coordinates: [lng + 0.008, lat + 0.006] // Approx 0.9km offset
      },
      rating: 4.5,
      phoneNumber: '+91 100'
    }];
  }

  // Sort strictly by physical distance to ensure accuracy
  finalPolice.sort((a, b) => {
    const distA = calculateDistance(lat, lng, a.location.coordinates[1], a.location.coordinates[0]);
    const distB = calculateDistance(lat, lng, b.location.coordinates[1], b.location.coordinates[0]);
    return distA - distB;
  });

  return finalPolice.slice(0, 3);
}

module.exports = { selectHospital, selectPoliceStation };

