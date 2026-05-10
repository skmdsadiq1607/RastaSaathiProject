const { User } = require('../modules/auth/model');

function normalizeLang(lang) {
  const l = String(lang || 'en').toLowerCase();
  if (l.startsWith('hi')) return 'hi';
  if (l.startsWith('ta')) return 'ta';
  if (l.startsWith('te')) return 'te';
  if (l.startsWith('kn')) return 'kn';
  return 'en';
}

async function languageMiddleware(req, res, next) {
  try {
    const header = req.headers['accept-language'];
    let lang = header ? header.split(',')[0] : null;

    const userId = req.user?.sub;
    if (!lang && userId) {
      const user = await User.findById(userId).select('language').lean();
      lang = user?.language;
    }

    req.lang = normalizeLang(lang);
    next();
  } catch {
    req.lang = 'en';
    next();
  }
}

module.exports = { languageMiddleware, normalizeLang };

