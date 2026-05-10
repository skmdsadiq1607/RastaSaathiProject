const dashboardService = require('./service');
const responseFormatter = require('../../utils/responseFormatter');
const AppError = require('../../utils/AppError');

exports.getLiveIncidents = async (req, res, next) => {
  try {
    const incidents = await dashboardService.getLiveIncidents();
    res.status(200).json(responseFormatter(true, incidents, 'Live incidents retrieved'));
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

exports.getStats = async (req, res, next) => {
  try {
    const stats = await dashboardService.getStats();
    res.status(200).json(responseFormatter(true, stats, 'Dashboard stats retrieved'));
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};
