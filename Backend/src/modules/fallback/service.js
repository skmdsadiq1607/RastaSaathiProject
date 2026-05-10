const FallbackLog = require('./model');
const logger = require('../../utils/logger');
const Incident = require('../incident/model');

exports.processIncomingSms = async (body, from) => {
  logger.info(`Received fallback SMS from ${from}: ${body}`);
  
  // Example format: "ACCEPT|incidentId"
  const parts = body.split('|');
  if (parts.length >= 2) {
    const action = parts[0].toUpperCase();
    const incidentId = parts[1];

    await FallbackLog.create({
      phoneNumber: from,
      messageBody: body,
      action: action,
      incidentId: incidentId,
      status: 'PROCESSED'
    });

    if (action === 'ACCEPT') {
      await Incident.findByIdAndUpdate(incidentId, { status: 'RESPONDER_ASSIGNED' });
      logger.info(`Responder ${from} accepted incident ${incidentId}`);
    }
  }

  return true;
};

exports.triggerFallbackSms = async (incidentId, payload) => {
  logger.info(`Triggering fallback SMS for incident ${incidentId}`);
  // In a real app, this would use sms.service.js to send Twilio messages
};
