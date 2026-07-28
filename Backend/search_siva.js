const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });
const { env } = require('./src/config/env');
const { Hospital } = require('./src/modules/hospital/model');

async function searchSiva() {
  try {
    await mongoose.connect(env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    const siva = await Hospital.findOne({ name: 'Siva Eye Hospital' }).lean();
    console.log('Siva Eye Hospital:', siva);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

searchSiva();
