const express = require('express');
const { ok } = require('../../utils/responseFormatter');
const { Fallback } = require('./model');
const { Incident } = require('../incident/model');
const { Timeline } = require('../timeline/model');

function fallbackRoutes() {
  const router = express.Router();
  router.post('/sms/webhook', express.urlencoded({ extended: false }), async (req, res) => {
    // Twilio sends application/x-www-form-urlencoded by default
    const from = req.body.From;
    const to = req.body.To;
    const body = String(req.body.Body || '').trim();

    // Expected: ACCEPT|incidentId or REJECT|incidentId
    const [cmd, incidentId] = body.split('|').map((s) => s?.trim());

    if (!incidentId) {
      res.type('text/xml').send('<Response></Response>');
      return;
    }

    await Fallback.findOneAndUpdate(
      { incidentId },
      { $setOnInsert: { incidentId }, $push: { exchanges: { direction: 'IN', from, to, body, timestamp: new Date() } } },
      { upsert: true, new: true }
    );

    if (cmd === 'ACCEPT') {
      await Incident.findByIdAndUpdate(incidentId, { $set: { status: 'ASSIGNED' } });
      await Timeline.findOneAndUpdate(
        { incidentId },
        { $setOnInsert: { incidentId, events: [] }, $push: { events: { eventType: 'RESPONDER_ACCEPT', description: `Responder accepted via SMS (${from})`, actor: 'responder', timestamp: new Date(), metadata: { from } } } },
        { upsert: true }
      );
    } else if (cmd === 'REJECT') {
      await Timeline.findOneAndUpdate(
        { incidentId },
        { $setOnInsert: { incidentId, events: [] }, $push: { events: { eventType: 'RESPONDER_REJECT', description: `Responder rejected via SMS (${from})`, actor: 'responder', timestamp: new Date(), metadata: { from } } } },
        { upsert: true }
      );
    }

    res.type('text/xml').send('<Response></Response>');
  });

  router.get('/:incidentId', async (req, res, next) => {
    try {
      const fb = await Fallback.findOne({ incidentId: req.params.incidentId }).lean();
      res.json(ok({ data: { fallback: fb } }));
    } catch (e) {
      next(e);
    }
  });
  return router;
}

module.exports = { fallbackRoutes };

