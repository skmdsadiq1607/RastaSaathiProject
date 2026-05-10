const resourcesService = require('./service');
const responseFormatter = require('../../utils/responseFormatter');
const AppError = require('../../utils/AppError');

exports.updateResources = async (req, res, next) => {
  try {
    const { hospitalId, resources } = req.body;
    const updated = await resourcesService.updateResources(hospitalId, resources);
    res.status(200).json(responseFormatter(true, updated, 'Resources updated successfully'));
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

exports.matchResources = async (req, res, next) => {
  try {
    const { severityLevel, location } = req.query;
    // Assuming location is passed as "lat,lng"
    const [lat, lng] = location.split(',').map(Number);
    const matches = await resourcesService.matchResources(severityLevel, { lat, lng });
    res.status(200).json(responseFormatter(true, matches, 'Resource matches found'));
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};
