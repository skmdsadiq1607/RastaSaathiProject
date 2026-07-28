const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });
const { env } = require('./src/config/env');
const { PoliceStation } = require('./src/modules/police/model');
const { Ambulance } = require('./src/modules/ambulance/model');
const { Hospital } = require('./src/modules/hospital/model');

async function checkDatabase() {
  try {
    await mongoose.connect(env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB');

    console.log('\n=== POLICE STATIONS ===');
    const stations = await PoliceStation.find().lean();
    stations.forEach(s => {
      console.log(`- ${s.name}: coordinates = [${s.location?.coordinates?.join(', ')}]`);
    });

    console.log('\n=== AMBULANCES ===');
    const ambulances = await Ambulance.find().lean();
    ambulances.forEach(a => {
      console.log(`- ${a.name}: coordinates = [${a.location?.coordinates?.join(', ')}]`);
    });

    console.log('\n=== HOSPITALS (first 5) ===');
    const hospitals = await Hospital.find().limit(5).lean();
    hospitals.forEach(h => {
      console.log(`- ${h.name}: coordinates = [${h.location?.coordinates?.join(', ')}]`);
    });

    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

checkDatabase();
