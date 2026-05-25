const { Ambulance } = require('./model');
const { AppError } = require('../../utils/AppError');
const axios = require('axios');
const { env } = require('../../config/env');

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

async function findNearbyGoogleAmbulances({ lat, lng, radius = 50000 }) {
  if (!env.GOOGLE_MAPS_API_KEY) return [];
  const params = {
    key: env.GOOGLE_MAPS_API_KEY,
    location: `${lat},${lng}`,
    radius,
    keyword: 'ambulance'
  };
  try {
    const { data } = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', { params, timeout: 8000 });
    if (data.status === 'OK') return data.results;
  } catch (e) {
    console.error('[Ambulance Service] Google Places API failed');
  }
  return [];
}

async function selectAmbulance({ lat, lng }) {
  // 1. Try local database first
  const localAmbulances = await Ambulance.find({
    location: {
      $near: {
        $geometry: { type: 'Point', coordinates: [lng, lat] },
        $maxDistance: 50000
      }
    },
    status: 'AVAILABLE'
  }).limit(5).lean();

  let finalAmbulances = localAmbulances;

  // 2. If no local ambulances, fallback to Google Places
  if (finalAmbulances.length === 0) {
    const googleAmbulances = await findNearbyGoogleAmbulances({ lat, lng });
    finalAmbulances = googleAmbulances.map(ga => ({
      _id: ga.place_id,
      name: ga.name,
      address: ga.vicinity,
      phone: '+91 108',
      location: {
        type: 'Point',
        coordinates: [ga.geometry.location.lng, ga.geometry.location.lat]
      },
      status: 'AVAILABLE'
    }));
  }

  if (finalAmbulances.length === 0) {
    return null; // Return null if nothing found
  }

  // Sort by physical distance
  finalAmbulances.sort((a, b) => {
    const distA = calculateDistance(lat, lng, a.location.coordinates[1], a.location.coordinates[0]);
    const distB = calculateDistance(lat, lng, b.location.coordinates[1], b.location.coordinates[0]);
    return distA - distB;
  });

  const bestAmbulance = finalAmbulances[0];
  
  // Calculate rough ETA
  const dist = calculateDistance(lat, lng, bestAmbulance.location.coordinates[1], bestAmbulance.location.coordinates[0]);
  const etaSeconds = Math.round((dist / 40) * 3600); // Assume 40km/h average speed in city
  
  return { ambulance: bestAmbulance, etaSeconds };
}

module.exports = { selectAmbulance };
