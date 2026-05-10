const rateLimit = require('express-rate-limit');

function publicRateLimit() {
  return rateLimit({
    windowMs: 60 * 1000,
    limit: 120,
    standardHeaders: true,
    legacyHeaders: false
  });
}

module.exports = { publicRateLimit };

