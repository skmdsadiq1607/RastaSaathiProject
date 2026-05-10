const AppError = require('../../utils/AppError');
const responseFormatter = require('../../utils/responseFormatter');
const fallbackService = require('./service');

exports.handleSmsWebhook = async (req, res, next) => {
  try {
    const { Body, From } = req.body; // Twilio webhook payload
    const result = await fallbackService.processIncomingSms(Body, From);
    // Twilio requires TwiML response or 200 OK
    res.set('Content-Type', 'text/xml');
    res.status(200).send('<Response></Response>');
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};
