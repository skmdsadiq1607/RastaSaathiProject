const Resource = require('./model');
const Hospital = require('../hospital/model');

exports.updateResources = async (hospitalId, resourceData) => {
  const resource = await Resource.findOneAndUpdate(
    { hospitalId },
    { $set: resourceData },
    { new: true, upsert: true }
  );
  return resource;
};

exports.matchResources = async (severityLevel, location) => {
  // Logic to find nearest hospital with sufficient resources
  // This is a simplified version; real logic would involve geo queries and scoring
  const hospitals = await Hospital.find({
    location: {
      $near: {
        $geometry: { type: "Point", coordinates: [location.lng, location.lat] },
        $maxDistance: 15000 // 15km radius
      }
    }
  }).lean();

  const matches = [];
  for (const hospital of hospitals) {
    const resources = await Resource.findOne({ hospitalId: hospital._id }).lean();
    if (resources && resources.icuBeds > 0) {
      matches.push({ hospital, resources });
    }
  }

  return matches;
};
