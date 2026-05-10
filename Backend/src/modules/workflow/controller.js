const { ok } = require('../../utils/responseFormatter');
const { getWorkflowStatus } = require('./service');

async function getWorkflowStatusController(req, res, next) {
  try {
    const wf = await getWorkflowStatus(req.params.incidentId);
    res.json(ok({ data: { workflow: wf } }));
  } catch (err) {
    next(err);
  }
}

module.exports = { getWorkflowStatusController };

