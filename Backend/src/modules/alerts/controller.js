const AppError = require('../../utils/AppError');
const responseFormatter = require('../../utils/responseFormatter');
const alertsService = require('./service');

exports.sendAlerts = async (req, res, next) => {
  try {
    const { incidentId, type, message } = req.body;
    const alert = await alertsService.dispatchAlerts(incidentId, type, message);
    res.status(200).json(responseFormatter(true, alert, 'Alerts sent successfully'));
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};
