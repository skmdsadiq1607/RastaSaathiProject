const timelineService = require('./service');
const responseFormatter = require('../../utils/responseFormatter');
const AppError = require('../../utils/AppError');

exports.getTimeline = async (req, res, next) => {
  try {
    const { incidentId } = req.params;
    const timeline = await timelineService.getTimelineByIncident(incidentId);
    res.status(200).json(responseFormatter(true, timeline, 'Timeline retrieved successfully'));
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};
