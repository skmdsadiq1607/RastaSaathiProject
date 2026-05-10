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
    
    // Determine if we should send a WhatsApp message or standard SMS
    // If the provided Twilio number is the Sandbox (+14155238886) or specifically formatted as WhatsApp, we send WhatsApp.
    // Otherwise, we send standard SMS.
    
    const isWhatsApp = env.TWILIO_WHATSAPP_NUMBER && env.TWILIO_WHATSAPP_NUMBER.includes('whatsapp:');
    
    let fromFormatted, toFormatted;
    
    if (isWhatsApp) {
      fromFormatted = env.TWILIO_WHATSAPP_NUMBER;
      toFormatted = to.startsWith('whatsapp:') ? to : `whatsapp:${to}`;
    } else {
      if (!env.TWILIO_PHONE_NUMBER) throw new AppError('Twilio Phone Number not configured for standard SMS', 500, 'CONFIG_ERROR');
      fromFormatted = env.TWILIO_PHONE_NUMBER;
      toFormatted = to.startsWith('whatsapp:') ? to.replace('whatsapp:', '') : to; // Ensure clean SMS number
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
