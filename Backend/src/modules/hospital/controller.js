const { ok } = require('../../utils/responseFormatter');
const { selectHospital } = require('./service');

async function selectHospitalController(req, res, next) {
  try {
    const ranked = await selectHospital(req.body);
    res.json(ok({ data: { ranked }, message: 'Hospitals ranked' }));
  } catch (err) {
    next(err);
  }
}

module.exports = { selectHospitalController };

