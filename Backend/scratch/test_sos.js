const axios = require('axios');

async function test() {
  try {
    const res = await axios.post('http://localhost:3000/api/sos/trigger', {
      lat: 17.3736,
      lng: 78.5292,
      injuryType: 'Test Injury',
      userId: '6a0050a5116e29b63759d253' // The user ID I found earlier
    });
    console.log('Response:', JSON.stringify(res.data, null, 2));
  } catch (err) {
    console.error('Error:', err.response?.data || err.message);
  }
}

test();
