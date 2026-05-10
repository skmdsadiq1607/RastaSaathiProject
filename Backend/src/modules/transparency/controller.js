const transparencyService = require('./service');
const responseFormatter = require('../../utils/responseFormatter');
const AppError = require('../../utils/AppError');

exports.getTransparencyLogs = async (req, res, next) => {
  try {
    const { incidentId } = req.params;
    const logs = await transparencyService.getLogsByIncident(incidentId);
    res.status(200).json(responseFormatter(true, logs, 'AI Decision logs retrieved successfully'));
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};
