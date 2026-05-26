/**
 * Calculates the Haversine distance between two sets of coordinates.
 * @param {number} lat1 - Latitude of first point
 * @param {number} lon1 - Longitude of first point
 * @param {number} lat2 - Latitude of second point
 * @param {number} lon2 - Longitude of second point
 * @returns {number} Distance in kilometers
 */
exports.calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  
  const R = 6371; // Earth radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
            
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  return R * c;
};

/**
 * Gets a localized place name (suburb, neighborhood, city) using free Nominatim OpenStreetMap reverse geocoding.
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @returns {Promise<string>} Neighborhood or City name, or empty string on failure
 */
exports.reverseGeocode = async (lat, lng) => {
  const axios = require('axios');
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=14`;
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'RastaSaathiSOS/1.0 (contact: support@rastasaathi.org)'
      },
      timeout: 1800
    });
    if (response.data && response.data.address) {
      const addr = response.data.address;
      return addr.neighbourhood || addr.suburb || addr.town || addr.village || addr.city || addr.county || '';
    }
  } catch (error) {
    console.error('[GeoUtils] Nominatim reverse geocode failed:', error.message);
  }
  return '';
};

