const axios = require('axios');
const { env } = require('../config/env');
const { AppError } = require('../utils/AppError');

async function distanceMatrix({ origins, destinations }) {
  if (!env.GOOGLE_MAPS_API_KEY) throw new AppError('Google Maps API key not configured', 500, 'CONFIG_ERROR');
  const params = {
    key: env.GOOGLE_MAPS_API_KEY,
    origins: origins.map((o) => `${o.lat},${o.lng}`).join('|'),
    destinations: destinations.map((d) => `${d.lat},${d.lng}`).join('|')
  };
  const { data } = await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json', { params, timeout: 8000 });
  if (data.status !== 'OK') throw new AppError('Distance Matrix failed', 502, 'MAPS_ERROR', data);
  return data;
}

async function directions({ origin, destination, mode = 'driving', avoid, alternatives = true }) {
  if (!env.GOOGLE_MAPS_API_KEY) throw new AppError('Google Maps API key not configured', 500, 'CONFIG_ERROR');
  const params = {
    key: env.GOOGLE_MAPS_API_KEY,
    origin: `${origin.lat},${origin.lng}`,
    destination: `${destination.lat},${destination.lng}`,
    mode,
    alternatives: alternatives ? 'true' : 'false'
  };
  if (avoid) params.avoid = avoid;
  const { data } = await axios.get('https://maps.googleapis.com/maps/api/directions/json', { params, timeout: 8000 });
  if (data.status !== 'OK') throw new AppError('Directions failed', 502, 'MAPS_ERROR', data);
  return data;
}

module.exports = { distanceMatrix, directions };

