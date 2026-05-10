const { SEVERITY_LEVELS } = require('./constants');

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function levelFromScore(score) {
  if (score >= 80) return SEVERITY_LEVELS.CRITICAL;
  if (score >= 60) return SEVERITY_LEVELS.HIGH;
  if (score >= 35) return SEVERITY_LEVELS.MEDIUM;
  return SEVERITY_LEVELS.LOW;
}

function predictSeverityRuleBased({ speed = 0, impactForce = 0, vehicleType, injuryDescription, consciousnessLevel, age }) {
  const s = clamp(Number(speed || 0), 0, 180) / 180;
  const f = clamp(Number(impactForce || 0), 0, 10) / 10;
  const a = clamp(Number(age || 30), 0, 100) / 100;
  const c =
    String(consciousnessLevel || '').toLowerCase() === 'unconscious'
      ? 1
      : String(consciousnessLevel || '').toLowerCase() === 'drowsy'
        ? 0.6
        : 0.2;

  const v = String(vehicleType || '').toLowerCase();
  const vehicleRisk = v.includes('bike') || v.includes('two') ? 0.9 : v.includes('car') ? 0.6 : 0.5;

  const injury = String(injuryDescription || '').toLowerCase();
  const injuryRisk =
    injury.includes('bleed') || injury.includes('head') || injury.includes('fracture') ? 0.8 : injury.length > 0 ? 0.5 : 0.35;

  // Weighted formula: tuneable
  const score = clamp(
    Math.round(100 * (0.28 * s + 0.22 * f + 0.18 * c + 0.12 * a + 0.10 * vehicleRisk + 0.10 * injuryRisk)),
    0,
    100
  );

  const level = levelFromScore(score);

  const recommendedResponse =
    level === SEVERITY_LEVELS.CRITICAL
      ? 'Dispatch ambulance immediately; airway/breathing/circulation priority; route to trauma center with ICU.'
      : level === SEVERITY_LEVELS.HIGH
        ? 'Dispatch responders; prioritize bleeding control and immobilization; route to trauma-capable hospital.'
        : level === SEVERITY_LEVELS.MEDIUM
          ? 'Assess injuries; monitor vitals; arrange transport; consider nearest capable facility.'
          : 'Basic first aid; observe symptoms; seek medical evaluation if pain/bleeding persists.';

  const reasoning = `Rule-based severity computed from speed=${speed}, impactForce=${impactForce}, consciousness=${consciousnessLevel}, age=${age}, vehicle=${vehicleType}.`;

  return { score, level, reasoning, recommendedResponse };
}

module.exports = { predictSeverityRuleBased, levelFromScore };

