const express = require('express');
const { validate } = require('../../middleware/validate.middleware');
const Joi = require('joi');
const { detectLanguageFromText } = require('./service');
const { ok } = require('../../utils/responseFormatter');

function languageRoutes() {
  const router = express.Router();
  router.post(
    '/detect',
    validate(
      Joi.object({
        text: Joi.string().min(1).required()
      })
    ),
    async (req, res, next) => {
      try {
        const detected = await detectLanguageFromText(req.body.text);
        res.json(ok({ data: detected, message: 'Detected' }));
      } catch (err) {
        next(err);
      }
    }
  );
  return router;
}

module.exports = { languageRoutes };

