const Incident = require('../incident/model');

exports.getLiveIncidents = async () => {
  return Incident.find({ status: { $in: ['ACTIVE', 'ESCALATED'] } })
    .sort({ createdAt: -1 })
    .populate('userId', 'name phone')
    .lean();
};

exports.getStats = async () => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const totalSOS = await Incident.countDocuments({ createdAt: { $gte: startOfDay } });
  
  const bySeverity = await Incident.aggregate([
    { $match: { createdAt: { $gte: startOfDay } } },
    { $group: { _id: '$severity', count: { $sum: 1 } } }
  ]);

  const resolutionRateData = await Incident.aggregate([
    { $match: { createdAt: { $gte: startOfDay } } },
    { $group: { _id: '$status', count: { $sum: 1 } } }
  ]);

  return {
    totalSOS,
    bySeverity,
    resolutionRateData
  };
};
