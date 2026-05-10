const insightsService = require('./service');
const responseFormatter = require('../../utils/responseFormatter');
const AppError = require('../../utils/AppError');

exports.getHotspots = async (req, res, next) => {
  try {
    const hotspots = await insightsService.getHotspots();
    res.status(200).json(responseFormatter(true, hotspots, 'Hotspots retrieved'));
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

exports.getTrends = async (req, res, next) => {
  try {
    const { period } = req.query; // e.g., 7d, 30d, 90d
    const trends = await insightsService.getTrends(period || '30d');
    res.status(200).json(responseFormatter(true, trends, 'Trends retrieved'));
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};
