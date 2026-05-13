const twilio = require('twilio');
const dotenv = require('dotenv');
dotenv.config();

const sid = process.env.TWILIO_ACCOUNT_SID;
const token = process.env.TWILIO_AUTH_TOKEN;
const from = process.env.TWILIO_WHATSAPP_NUMBER;
const to = '+919876543210'; // Replace with a test number if needed, but I'll just check if it fails early

console.log('Using SID:', sid);
console.log('Using From:', from);

if (!sid || !token || !from) {
  console.error('Missing Twilio credentials in .env');
  process.exit(1);
}

const client = twilio(sid, token);

client.messages.create({
  from: from,
  to: 'whatsapp:+919876543210', // dummy number
  body: 'Test from Rasta-Saathi'
})
.then(msg => console.log('Success! SID:', msg.sid))
.catch(err => {
  console.error('Failed to send message:');
  console.error(err);
});
