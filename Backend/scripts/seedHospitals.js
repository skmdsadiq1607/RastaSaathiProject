const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const axios = require('axios');

dotenv.config({ path: path.join(__dirname, '../.env') });

const { Hospital } = require('../src/modules/hospital/model');
const env = require('../src/config/env');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function geocodeAddress(hospitalName, cityAddress) {
  try {
    const query = `${hospitalName}, ${cityAddress}, India`;
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`;
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'RastaSaathiEmergencyService/1.0 (sadiq@rasta-saathi.org)'
      },
      timeout: 10000
    });
    if (response.data && response.data.length > 0) {
      const lat = parseFloat(response.data[0].lat);
      const lon = parseFloat(response.data[0].lon);
      return [lon, lat]; // [longitude, latitude]
    }
    return null;
  } catch (error) {
    console.error(`Geocoding error for ${hospitalName}, ${cityAddress}:`, error.message);
    return null;
  }
}

const seedHospitals = async () => {
  try {
    await mongoose.connect(env.env.MONGODB_URI || process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB Connected...');

    await Hospital.deleteMany();
    console.log('Existing hospitals deleted...');

    const rawData = fs.readFileSync(path.join(__dirname, '../hospitals.json'), 'utf8');
    const hospitalList = JSON.parse(rawData);
    
    console.log(`Loaded ${hospitalList.length} hospitals from JSON. Starting Geocoding process (approx. 1 request per second)...`);

    const formattedHospitals = [];

    // Fallback coordinates for Hyderabad
    const baseLat = 17.4399;
    const baseLng = 78.4983;

    let successCount = 0;

    for (let i = 0; i < hospitalList.length; i++) {
      const h = hospitalList[i];
      
      let coords = await geocodeAddress(h.hospital_name, h.city);
      
      if (coords) {
        successCount++;
      } else {
        // Fallback to randomized Hyderabad location if geocoding fails
        coords = [
          baseLng + (Math.random() - 0.5) * 0.3,
          baseLat + (Math.random() - 0.5) * 0.3
        ];
      }

      formattedHospitals.push({
        name: h.hospital_name,
        address: `${h.address}, ${h.city}, ${h.state} ${h.pin}`,
        location: {
          type: "Point",
          coordinates: coords
        },
        specialties: ["Emergency", "Trauma", "General"], // Simulated for Hackathon
        icuBeds: Math.floor(Math.random() * 50) + 10,
        ventilators: Math.floor(Math.random() * 20) + 5,
        bloodUnits: { A: 20, B: 20, O: 30, AB: 10 },
        ambulancesAvailable: Math.floor(Math.random() * 5) + 2,
        traumaTeamOnDuty: Math.random() > 0.5,
        traumaCenter: Math.random() > 0.3,
        bloodBankAvailable: true,
        phone: "108",
        emergencyContact: "108"
      });

      // Show progress
      if ((i + 1) % 10 === 0) {
        console.log(`Processed ${i + 1}/${hospitalList.length} hospitals... (Successful exact geocoding: ${successCount})`);
      }

      // 1-second delay to comply with OpenStreetMap Nominatim Usage Policy (1 request/sec limit)
      await sleep(1000);
    }

    console.log(`Geocoding complete! Successfully mapped ${successCount} exact locations. Inserting into Database...`);

    await Hospital.insertMany(formattedHospitals);
    console.log(`Successfully seeded all ${formattedHospitals.length} hospitals into the database!`);
    return formattedHospitals.length;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

if (require.main === module) {
  seedHospitals().then(() => process.exit(0)).catch(() => process.exit(1));
}

module.exports = { seedHospitals };
