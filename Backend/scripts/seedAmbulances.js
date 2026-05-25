const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const { Ambulance } = require('../src/modules/ambulance/model');
const env = require('../src/config/env');

const seedAmbulances = async () => {
  try {
    await mongoose.connect(env.env.MONGODB_URI || process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB Connected...');

    await Ambulance.deleteMany();
    console.log('Existing ambulances deleted...');

    const ambulances = [
      // Hyderabad Ambulances
      {
        name: 'Apollo Emergency Services',
        address: 'Jubilee Hills, Hyderabad',
        phone: '+91 108',
        location: { type: 'Point', coordinates: [78.4111, 17.4239] },
        status: 'AVAILABLE'
      },
      {
        name: 'Care Hospitals Ambulance',
        address: 'Banjara Hills, Hyderabad',
        phone: '+91 108',
        location: { type: 'Point', coordinates: [78.4485, 17.4156] },
        status: 'AVAILABLE'
      },
      {
        name: 'KIMS Express Ambulance',
        address: 'Secunderabad, Hyderabad',
        phone: '+91 108',
        location: { type: 'Point', coordinates: [78.4983, 17.4399] },
        status: 'AVAILABLE'
      },
      {
        name: 'Yashoda Emergency Response',
        address: 'Somajiguda, Hyderabad',
        phone: '+91 108',
        location: { type: 'Point', coordinates: [78.4564, 17.4260] },
        status: 'AVAILABLE'
      },
      // Chennai Ambulances
      {
        name: 'Apollo Main Ambulance',
        address: 'Greams Road, Chennai',
        phone: '+91 108',
        location: { type: 'Point', coordinates: [80.2541, 13.0617] },
        status: 'AVAILABLE'
      },
      {
        name: 'Fortis Malar Emergency',
        address: 'Adyar, Chennai',
        phone: '+91 108',
        location: { type: 'Point', coordinates: [80.2581, 13.0125] },
        status: 'AVAILABLE'
      },
      {
        name: 'MIOT Emergency Care',
        address: 'Manapakkam, Chennai',
        phone: '+91 108',
        location: { type: 'Point', coordinates: [80.1834, 13.0185] },
        status: 'AVAILABLE'
      },
      {
        name: 'GH Emergency Unit',
        address: 'Park Town, Chennai',
        phone: '+91 108',
        location: { type: 'Point', coordinates: [80.2764, 13.0813] },
        status: 'AVAILABLE'
      }
    ];

    await Ambulance.insertMany(ambulances);
    console.log(`Successfully seeded ${ambulances.length} ambulances into the database!`);
    
    return ambulances.length;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

if (require.main === module) {
  seedAmbulances().then(() => process.exit(0)).catch(() => process.exit(1));
}

module.exports = { seedAmbulances };
