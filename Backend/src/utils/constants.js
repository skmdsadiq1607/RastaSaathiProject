const ROLES = Object.freeze({
  VICTIM: 'victim',
  RESPONDER: 'responder',
  ADMIN: 'admin'
});

const SEVERITY_LEVELS = Object.freeze({
  CRITICAL: 'CRITICAL',
  HIGH: 'HIGH',
  MEDIUM: 'MEDIUM',
  LOW: 'LOW'
});

const INCIDENT_STATUS = Object.freeze({
  OPEN: 'OPEN',
  ASSIGNED: 'ASSIGNED',
  ROUTING: 'ROUTING',
  AT_HOSPITAL: 'AT_HOSPITAL',
  RESOLVED: 'RESOLVED',
  CANCELLED: 'CANCELLED'
});

module.exports = { ROLES, SEVERITY_LEVELS, INCIDENT_STATUS };

