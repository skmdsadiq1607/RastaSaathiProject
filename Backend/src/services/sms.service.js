const twilio = require('twilio');
const { env } = require('../config/env');
const { AppError } = require('../utils/AppError');
const { logger } = require('../utils/logger');

// Store keys in env: TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_WHATSAPP_NUMBER

function getClient() {
  if (!env.TWILIO_ACCOUNT_SID || !env.TWILIO_AUTH_TOKEN) {
    throw new AppError('Twilio is not configured', 500, 'CONFIG_ERROR');
  }
  return twilio(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN);
}

async function sendSms({ to, body }) {
  if (!to || !body) {
    throw new AppError('Phone number and body are required for SMS/WhatsApp', 400);
  }

  try {
    const client = getClient();
    
    // Smart detection: If it's the sandbox number or contains 'whatsapp:', use WhatsApp mode
    const sandboxNumber = '+14155238886';
    const rawFrom = env.TWILIO_WHATSAPP_NUMBER || '';
    const isWhatsApp = rawFrom.includes('whatsapp:') || rawFrom.includes(sandboxNumber);
    
    let fromFormatted, toFormatted;
    
    if (isWhatsApp) {
      fromFormatted = rawFrom.startsWith('whatsapp:') ? rawFrom : `whatsapp:${rawFrom}`;
      toFormatted = to.startsWith('whatsapp:') ? to : `whatsapp:${to}`;
    } else {
      if (!env.TWILIO_PHONE_NUMBER) throw new AppError('Twilio Phone Number not configured', 500);
      fromFormatted = env.TWILIO_PHONE_NUMBER;
      toFormatted = to.replace('whatsapp:', '');
    }

    const msg = await client.messages.create({
      from: fromFormatted,
      to: toFormatted,
      body: body
    });
    
    logger.info(`[Twilio SENT] Type: ${isWhatsApp ? 'WhatsApp' : 'SMS'} | TO: ${toFormatted} | SID: ${msg.sid}`);
    return { sid: msg.sid, status: msg.status };
  } catch (error) {
    logger.error(`[Twilio ERROR] Failed to send to ${to}: ${error.message}`);
    return { status: 'failed', error: error.message };
  }
}

module.exports = { sendSms };
