const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env') });

const { selectPoliceStation } = require('./src/modules/hospital/service');
const { selectAmbulance } = require('./src/modules/ambulance/service');
const env = require('./src/config/env');

async function testServices() {
  await mongoose.connect(env.env.MONGODB_URI || process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log('MongoDB Connected');
  
  const lat = 17.4399; // Hyderabad
  const lng = 78.4983;

  try {
    const police = await selectPoliceStation({ lat, lng });
    console.log('Police result:', JSON.stringify(police, null, 2));
  } catch (e) {
    console.error('Police Error:', e);
  }

  try {
    const ambulance = await selectAmbulance({ lat, lng });
    console.log('Ambulance result:', JSON.stringify(ambulance, null, 2));
  } catch (e) {
    console.error('Ambulance Error:', e);
  }

  process.exit(0);
}

testServices();
