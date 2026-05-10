const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env') });

const Incident = require('../src/modules/incident/model');
const env = require('../src/config/env');

const generateRandomCoordinates = () => {
  // Center roughly on Hyderabad (17.3850, 78.4867)
  const baseLat = 17.3850;
  const baseLng = 78.4867;
  const latOffset = (Math.random() - 0.5) * 0.2; // approx +/- 11km
  const lngOffset = (Math.random() - 0.5) * 0.2;
  return [baseLng + lngOffset, baseLat + latOffset];
};

const severities = ["CRITICAL", "HIGH", "MEDIUM", "LOW"];
const statuses = ["ACTIVE", "RESOLVED", "CANCELLED", "ESCALATED"];

const incidents = Array.from({ length: 50 }).map((_, index) => {
  const isCritical = index % 5 === 0;
  return {
    userId: new mongoose.Types.ObjectId(), // Fake user ID
    location: {
      type: "Point",
      coordinates: generateRandomCoordinates()
    },
    status: isCritical ? "ACTIVE" : statuses[Math.floor(Math.random() * statuses.length)],
    severity: isCritical ? "CRITICAL" : severities[Math.floor(Math.random() * severities.length)],
    vehicleType: ["Car", "Bike", "Bus", "Pedestrian", "Truck"][Math.floor(Math.random() * 5)],
    injuryType: ["Bleeding", "Fracture", "Unconscious", "Minor Scrapes", "Head Trauma"][Math.floor(Math.random() * 5)],
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000) // Last 30 days
  };
});

const seedIncidents = async () => {
  try {
    await mongoose.connect(env.mongodbUri || process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB Connected...');

    await Incident.deleteMany();
    console.log('Incidents deleted...');

    await Incident.insertMany(incidents);
    console.log('Incidents seeded successfully...');

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedIncidents();
