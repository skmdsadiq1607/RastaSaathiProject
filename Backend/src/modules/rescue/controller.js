const { findNearbyResources, findNearbyRescue } = require('../../services/discovery.service');
const { AppError } = require('../../utils/AppError');

/**
 * Controller to find all types of emergency resources
 */
async function getNearbyResources(req, res, next) {
  try {
    const { lat, lng, type } = req.query;
    if (!lat || !lng) throw new AppError('Location coordinates are required', 400);

    let resources = [];
    if (type === 'rescue') {
      resources = await findNearbyRescue({ lat, lng });
    } else {
      resources = await findNearbyResources({ lat, lng, type: type || 'hospital' });
    }

    res.status(200).json({
      status: 'success',
      results: resources.length,
      data: resources
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { getNearbyResources };
