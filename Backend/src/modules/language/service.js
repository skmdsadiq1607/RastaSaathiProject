const en = require('./locales/en.json');
const hi = require('./locales/hi.json');
const ta = require('./locales/ta.json');
const te = require('./locales/te.json');
const kn = require('./locales/kn.json');

const { detectLanguage } = require('../../services/translation.service');

const bundles = { en, hi, ta, te, kn };

function t(lang, key, vars) {
  const bundle = bundles[lang] || bundles.en;
  let template = bundle[key] || bundles.en[key] || key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      template = template.replaceAll(`{${k}}`, String(v));
    }
  }
  return template;
}

async function detectLanguageFromText(text) {
  return await detectLanguage(text);
}

module.exports = { t, detectLanguageFromText };

