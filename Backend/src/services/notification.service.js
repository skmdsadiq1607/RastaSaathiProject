const axios = require('axios');
const { env } = require('../config/env');
const { AppError } = require('../utils/AppError');

async function sendPushToTokens({ tokens, title, body, data }) {
  if (!env.FCM_SERVER_KEY) throw new AppError('FCM server key not configured', 500, 'CONFIG_ERROR');
  if (!tokens || tokens.length === 0) return { successCount: 0, failureCount: 0, results: [] };

  const payload = {
    registration_ids: tokens,
    notification: { title, body },
    data: data || {}
  };

  const { data: resp } = await axios.post('https://fcm.googleapis.com/fcm/send', payload, {
    headers: {
      Authorization: `key=${env.FCM_SERVER_KEY}`,
      'Content-Type': 'application/json'
    },
    timeout: 8000
  });

  if (typeof resp?.success !== 'number') throw new AppError('FCM push failed', 502, 'FCM_ERROR', resp);
  return {
    successCount: resp.success,
    failureCount: resp.failure,
    results: resp.results || []
  };
}

module.exports = { sendPushToTokens };

