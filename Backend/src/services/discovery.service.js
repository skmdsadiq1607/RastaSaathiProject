const axios = require('axios');
const { env } = require('../config/env');
const { AppError } = require('../utils/AppError');

/**
 * Generic Discovery Service to find nearby emergency resources
 * Supported types: hospital, police, towing, car_repair, pharmacy
 */
async function findNearbyResources({ lat, lng, radius = 50000, type = 'hospital' }) {
  if (!env.GOOGLE_MAPS_API_KEY) {
    throw new AppError('Google Maps API key not configured', 500, 'CONFIG_ERROR');
  }

  const params = {
    key: env.GOOGLE_MAPS_API_KEY,
    location: `${lat},${lng}`,
    radius,
    type: type
  };

  // Google Places API Nearby Search
  const { data } = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', { 
    params, 
    timeout: 8000 
  });

  if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
    throw new AppError(`Places API failed for type: ${type}`, 502, 'MAPS_ERROR', data);
  }

  return data.results.map(item => ({
    _id: item.place_id,
    name: item.name,
    address: item.vicinity,
    location: {
      type: 'Point',
      coordinates: [item.geometry.location.lng, item.geometry.location.lat]
    },
    rating: item.rating,
    userRatingsTotal: item.user_ratings_total,
    type: type,
    isGoogleResult: true
  }));
}

/**
 * Specialized search for Towing and Mechanics
 */
async function findNearbyRescue({ lat, lng, radius = 15000 }) {
  const towing = await findNearbyResources({ lat, lng, radius, type: 'towing_service' });
  const repair = await findNearbyResources({ lat, lng, radius, type: 'car_repair' });
  
  // Combine and remove duplicates
  const combined = [...towing, ...repair];
  const unique = Array.from(new Map(combined.map(item => [item._id, item])).values());
  
  return unique;
}

module.exports = { 
  findNearbyResources,
  findNearbyRescue
};
