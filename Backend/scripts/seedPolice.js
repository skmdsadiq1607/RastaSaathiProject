const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const { PoliceStation } = require('../src/modules/police/model');
const env = require('../src/config/env');

dotenv.config({ path: path.join(__dirname, '../.env') });

const stations = [
  {
    name: "Chaitanyapuri Police Station",
    address: "Chaitanyapuri Main Rd, Dilsukhnagar, Hyderabad, Telangana",
    phoneNumber: "+91 040-27852350",
    rating: 4.8,
    location: { type: 'Point', coordinates: [78.5290, 17.3730] } // Close to the user's location
  },
  {
    name: "Malakpet Police Station",
    address: "Malakpet Rd, Hyderabad, Telangana",
    phoneNumber: "+91 040-27852351",
    rating: 4.6,
    location: { type: 'Point', coordinates: [78.5140, 17.3820] }
  },
  {
    name: "Jubilee Hills Police Station",
    address: "Road No 71, Jubilee Hills, Hyderabad, Telangana",
    phoneNumber: "+91 040-27852355",
    rating: 4.8,
    location: { type: 'Point', coordinates: [78.4116, 17.4326] }
  },
  {
    name: "Banjara Hills Police Station",
    address: "Road No 3, Banjara Hills, Hyderabad, Telangana",
    phoneNumber: "+91 040-27852422",
    rating: 4.7,
    location: { type: 'Point', coordinates: [78.4418, 17.4172] }
  },
  {
    name: "Madhapur Police Station",
    address: "Hitech City Rd, Madhapur, Hyderabad, Telangana",
    phoneNumber: "+91 040-27853422",
    rating: 4.9,
    location: { type: 'Point', coordinates: [78.3888, 17.4491] }
  },
  {
    name: "SR Nagar Police Station",
    address: "SR Nagar Main Rd, Hyderabad, Telangana",
    phoneNumber: "+91 040-27852410",
    rating: 4.6,
    location: { type: 'Point', coordinates: [78.4436, 17.4412] }
  },
  {
    name: "Panjagutta Police Station",
    address: "Panjagutta Cross Rd, Hyderabad, Telangana",
    phoneNumber: "+91 040-27852418",
    rating: 4.5,
    location: { type: 'Point', coordinates: [78.4526, 17.4265] }
  },
  {
    name: "Begumpet Police Station",
    address: "SP Road, Begumpet, Hyderabad, Telangana",
    phoneNumber: "+91 040-27852421",
    rating: 4.7,
    location: { type: 'Point', coordinates: [78.4716, 17.4416] }
  },
  {
    name: "Gachibowli Police Station",
    address: "Old Mumbai Hwy, Gachibowli, Hyderabad, Telangana",
    phoneNumber: "+91 040-27853434",
    rating: 4.8,
    location: { type: 'Point', coordinates: [78.3617, 17.4401] }
  },
  {
    name: "Kukatpally Police Station",
    address: "KPHB Main Rd, Kukatpally, Hyderabad, Telangana",
    phoneNumber: "+91 040-27853438",
    rating: 4.6,
    location: { type: 'Point', coordinates: [78.3989, 17.4948] }
  },
  {
    name: "Central Police Station (Chennai)",
    address: "Chennai, Tamil Nadu",
    phoneNumber: "+91 100",
    rating: 4.5,
    location: { type: 'Point', coordinates: [80.2707, 13.0827] }
  }
];

async function seed() {
  try {
    await mongoose.connect(env.env.MONGODB_URI || process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected...');
    
    await PoliceStation.deleteMany();
    console.log('Existing police stations deleted...');
    
    await PoliceStation.insertMany(stations);
    console.log(`Successfully seeded ${stations.length} police stations into the database!`);
    
    process.exit(0);
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
}

seed();
