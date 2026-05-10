const { directions } = require('../../services/maps.service');

async function calculateRouting({ origin, destination, severityLevel }) {
  const avoid = severityLevel === 'CRITICAL' ? 'tolls' : undefined;
  const data = await directions({ origin, destination, avoid, alternatives: true });

  const routes = (data.routes || []).map((r) => {
    const leg = r.legs?.[0];
    return {
      summary: r.summary,
      polyline: r.overview_polyline?.points,
      etaSeconds: leg?.duration?.value,
      distanceMeters: leg?.distance?.value
    };
  });

  return {
    routes,
    best: routes[0] || null
  };
}

module.exports = { calculateRouting };

