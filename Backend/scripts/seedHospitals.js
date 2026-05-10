const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const axios = require('axios');

dotenv.config({ path: path.join(__dirname, '../.env') });

const { Hospital } = require('../src/modules/hospital/model');
const env = require('../src/config/env');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function geocodeAddress(address, apiKey) {
  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    const response = await axios.get(url);
    if (response.data.status === 'OK' && response.data.results.length > 0) {
      const location = response.data.results[0].geometry.location;
      return [location.lng, location.lat]; // GeoJSON requires [longitude, latitude]
    }
    return null;
  } catch (error) {
    console.error(`Geocoding error for ${address}:`, error.message);
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
    
    console.log(`Loaded ${hospitalList.length} hospitals from JSON. Starting Geocoding process (this may take a minute)...`);

    const formattedHospitals = [];
    const GOOGLE_API_KEY = env.env.GOOGLE_MAPS_API_KEY || process.env.GOOGLE_MAPS_API_KEY;

    // Fallback coordinates for Hyderabad
    const baseLat = 17.4399;
    const baseLng = 78.4983;

    let successCount = 0;

    for (let i = 0; i < hospitalList.length; i++) {
      const h = hospitalList[i];
      const fullAddress = `${h.hospital_name}, ${h.address}, ${h.city}, ${h.state}`;
      
      let coords = await geocodeAddress(fullAddress, GOOGLE_API_KEY);
      
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
      if ((i + 1) % 50 === 0) {
        console.log(`Processed ${i + 1}/${hospitalList.length} hospitals...`);
      }

      // Small delay to respect Google Maps API rate limits (50 QPS)
      await sleep(25);
    }

    console.log(`Geocoding complete! Successfully mapped ${successCount} exact locations. Inserting into Database...`);

    await Hospital.insertMany(formattedHospitals);
    console.log(`Successfully seeded all ${formattedHospitals.length} hospitals into the database!`);

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedHospitals();
