function ok({ data = {}, message = '' } = {}) {
  return { success: true, data, message };
}

function fail({ code = 'INTERNAL_ERROR', message = 'Something went wrong', details } = {}) {
  return { success: false, error: { code, message, details } };
}

module.exports = { ok, fail };

