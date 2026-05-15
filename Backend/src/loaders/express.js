const express = require('express');

const { AppError } = require('../utils/AppError');

const { authRoutes } = require('../modules/auth/routes');
const { sosRoutes } = require('../modules/sos/routes');
const { incidentRoutes } = require('../modules/incident/routes');
const { severityRoutes } = require('../modules/severity/routes');
const { hospitalRoutes } = require('../modules/hospital/routes');
const { routingRoutes } = require('../modules/routing/routes');
const { alertsRoutes } = require('../modules/alerts/routes');
const { firstAidRoutes } = require('../modules/firstaid/routes');
const { workflowRoutes } = require('../modules/workflow/routes');
const { fallbackRoutes } = require('../modules/fallback/routes');
const { languageRoutes } = require('../modules/language/routes');
const { transparencyRoutes } = require('../modules/transparency/routes');
const { resourcesRoutes } = require('../modules/resources/routes');
const { timelineRoutes } = require('../modules/timeline/routes');
const { dashboardRoutes } = require('../modules/dashboard/routes');
const { insightsRoutes } = require('../modules/insights/routes');
const { voiceRoutes } = require('../modules/voice/routes');
const { summaryRoutes } = require('../modules/summary/routes');
const rescueRoutes = require('../modules/rescue/routes');

async function initExpress({ app, io }) {
  app.use((req, res, next) => {
    req.context = { io };
    next();
  });

  const router = express.Router();
  
  // Health Check
  router.get('/health', (req, res) => res.json({ status: 'Healthy', timestamp: new Date() }));

  router.use('/auth', authRoutes());
  router.use('/sos', sosRoutes());
  router.use('/incident', incidentRoutes());
  router.use('/severity', severityRoutes());
  router.use('/hospital', hospitalRoutes());
  router.use('/routing', routingRoutes());
  router.use('/alerts', alertsRoutes());
  router.use('/firstaid', firstAidRoutes());
  router.use('/workflow', workflowRoutes());
  router.use('/fallback', fallbackRoutes());
  router.use('/language', languageRoutes());
  router.use('/transparency', transparencyRoutes());
  router.use('/resources', resourcesRoutes());
  router.use('/timeline', timelineRoutes());
  router.use('/dashboard', dashboardRoutes());
  router.use('/insights', insightsRoutes());
  router.use('/voice', voiceRoutes());
  router.use('/summary', summaryRoutes());
  router.use('/rescue', rescueRoutes);

  app.use('/api', router);

  app.use((req, res, next) => next(new AppError('Not found', 404, 'NOT_FOUND')));
}

module.exports = { initExpress };

