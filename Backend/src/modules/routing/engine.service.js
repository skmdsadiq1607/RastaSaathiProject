const { findNearbyResources, findNearbyRescue } = require('../../services/discovery.service');
const { selectHospital } = require('../hospital/service');

/**
 * Intelligent routing engine that evaluates injury severity, 
 * collision context, and vehicle state to recommend the best resources.
 */
async function routeEmergency({ lat, lng, severity, injuryType, vehicleType, needsPolice, needsRescue }) {
  const recommendations = {
    medical: null,
    police: null,
    rescue: null,
    routingReason: []
  };

  // 1. Intelligent Medical Routing
  // CRITICAL/HIGH -> Prioritize Level-1 Trauma or Specialized centers
  // LOW/MEDIUM -> Prioritize proximity and clinics
  const hospitalSelection = await selectHospital({
    lat, lng,
    severityLevel: severity.level,
    injuryType: injuryType
  });
  
  recommendations.medical = hospitalSelection;
  recommendations.routingReason.push(`Routed to ${hospitalSelection[0]?.hospital?.name} based on ${severity.level} severity.`);

  // 2. Police Integration
  // Automatically find police if it's a collision or high severity
  if (needsPolice || severity.level === 'CRITICAL' || severity.level === 'HIGH') {
    const police = await findNearbyResources({ lat, lng, radius: 10000, type: 'police' });
    recommendations.police = police.slice(0, 3);
    recommendations.routingReason.push('Nearby police stations identified for legal/traffic coordination.');
  }

  // 3. Vehicle Rescue / Towing
  // Find towing/mechanics if vehicle is involved and not just a minor pedestrian incident
  if (needsRescue || (vehicleType && vehicleType !== 'none')) {
    const rescue = await findNearbyRescue({ lat, lng, radius: 15000 });
    recommendations.rescue = rescue.slice(0, 3);
    recommendations.routingReason.push('Vehicle rescue and towing services discovered.');
  }

  return recommendations;
}

module.exports = { routeEmergency };
