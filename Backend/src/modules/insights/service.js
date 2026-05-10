const Incident = require('../incident/model');

exports.getHotspots = async () => {
  const incidents = await Incident.find({}).select('location severity').lean();
  
  // Format as GeoJSON clusters
  const features = incidents.map(inc => ({
    type: "Feature",
    geometry: inc.location,
    properties: {
      severity: inc.severity,
      id: inc._id
    }
  }));

  return {
    type: "FeatureCollection",
    features
  };
};

exports.getTrends = async (period) => {
  const days = parseInt(period.replace('d', '')) || 30;
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const trends = await Incident.aggregate([
    { $match: { createdAt: { $gte: startDate } } },
    { 
      $group: { 
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        count: { $sum: 1 }
      } 
    },
    { $sort: { _id: 1 } }
  ]);

  return trends;
};
