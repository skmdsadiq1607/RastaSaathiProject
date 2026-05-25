const axios = require('axios');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env') });

async function testMaps() {
  const lat = 17.4399; // Hyderabad
  const lng = 78.4983;
  const radius = 15000;
  
  console.log("Key:", process.env.GOOGLE_MAPS_API_KEY.slice(0, 10) + '...');
  
  const params = {
    key: process.env.GOOGLE_MAPS_API_KEY,
    location: `${lat},${lng}`,
    radius,
    type: 'police'
  };
  try {
    const { data } = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', { params, timeout: 8000 });
    console.log("Status:", data.status);
    console.log("Error:", data.error_message);
  } catch (e) {
    console.error("Request failed:", e.response ? e.response.data : e.message);
  }
}
testMaps();
