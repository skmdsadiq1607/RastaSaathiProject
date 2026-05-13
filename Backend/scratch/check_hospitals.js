const mongoose = require('mongoose');
const { Hospital } = require('../src/modules/hospital/model');
require('dotenv').config();

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const hospitals = await Hospital.find({
    location: {
      $near: {
        $geometry: { type: 'Point', coordinates: [78.5292, 17.3736] },
        $maxDistance: 50000
      }
    }
  }).limit(3);
  console.log('Nearby hospitals:', hospitals.length);
  if (hospitals.length > 0) {
    console.log('First one:', hospitals[0].name);
  }
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
