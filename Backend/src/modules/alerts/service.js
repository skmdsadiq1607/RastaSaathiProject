const { User } = require('../auth/model');
const { Alerts } = require('./model');
const { sendPushToTokens } = require('../../services/notification.service');
const { sendSms } = require('../../services/sms.service');
const { t } = require('../language/service');

async function findNearestResponders({ lat, lng, limit = 5, maxDistanceMeters = 15000 }) {
  const responders = await User.find({
    role: 'responder',
    location: {
      $near: {
        $geometry: { type: 'Point', coordinates: [lng, lat] },
        $maxDistance: maxDistanceMeters
      }
    }
  })
    .limit(limit)
    .select('name phone fcmToken location')
    .lean();
  return responders;
}

async function dispatchAlerts({ io, incident, victimUser, severityLevel, hospitalName, hospitalLocation, policeName, policeLocation, etaSeconds, lang }) {
  const alerts = await Alerts.create({ incidentId: incident._id, deliveries: [] });

  const title = t(lang, 'alerts.SOS_TITLE');
  const body = t(lang, 'alerts.SOS_BODY');

  // Dashboard broadcast
  io.of('/dashboard').to('dashboard').emit('dashboard:alert', {
    incidentId: String(incident._id),
    severityLevel,
    lat: incident.location.coordinates[1],
    lng: incident.location.coordinates[0]
  });
  alerts.deliveries.push({ channel: 'SOCKET', to: 'dashboard', status: 'SENT' });

  // FCM to responders
  const responders = await findNearestResponders({
    lat: incident.location.coordinates[1],
    lng: incident.location.coordinates[0]
  });

  const tokens = responders.map((r) => r.fcmToken).filter(Boolean);
  if (tokens.length) {
    try {
      const pushRes = await sendPushToTokens({
        tokens,
        title,
        body,
        data: { incidentId: String(incident._id), severityLevel }
      });
      responders.forEach((r) =>
        alerts.deliveries.push({
          channel: 'FCM',
          to: r.fcmToken,
          status: 'SENT',
          providerMessageId: null,
          error: pushRes.failureCount ? 'Some tokens failed' : undefined
        })
      );
    } catch (e) {
      responders.forEach((r) =>
        alerts.deliveries.push({
          channel: 'FCM',
          to: r.fcmToken,
          status: 'FAILED',
          error: e.message
        })
      );
    }
  }

  // SMS to emergency contacts
  const contacts = victimUser?.emergencyContacts || [];

  for (const c of contacts) {
    const smsBody = t(lang, 'sms.SOS', {
      name: c.name || 'Emergency Contact',
      victimName: victimUser?.name || 'A loved one',
      lat: incident.location.coordinates[1],
      lng: incident.location.coordinates[0],
      hLat: hospitalLocation?.coordinates[1],
      hLng: hospitalLocation?.coordinates[0],
      severity: severityLevel || 'UNKNOWN',
      hospital: hospitalName || 'UNKNOWN',
      police: policeName || 'Locating...',
      eta: typeof etaSeconds === 'number' ? Math.round(etaSeconds / 60) + 'm' : 'NA'
    });

    let whatsappSuccess = false;
    // Try WhatsApp
    try {
      const res = await sendSms({ to: c.phone, body: smsBody, forceType: 'whatsapp' });
      alerts.deliveries.push({ 
        channel: 'WHATSAPP', 
        to: c.phone, 
        status: 'SENT', 
        providerMessageId: res.sid 
      });
      whatsappSuccess = true;
    } catch (e) {
      alerts.deliveries.push({ channel: 'WHATSAPP', to: c.phone, status: 'FAILED', error: e.message });
    }
    
    // Only try Standard SMS if WhatsApp failed
    if (!whatsappSuccess) {
      try {
        const res = await sendSms({ to: c.phone, body: smsBody, forceType: 'sms' });
        alerts.deliveries.push({ 
          channel: 'SMS', 
          to: c.phone, 
          status: 'SENT', 
          providerMessageId: res.sid 
        });
      } catch (e) {
        alerts.deliveries.push({ channel: 'SMS', to: c.phone, status: 'FAILED', error: e.message });
      }
    }
  }

  await alerts.save();
  return { alerts, respondersCount: responders.length, contactsCount: contacts.length };
}

module.exports = { dispatchAlerts, findNearestResponders };

