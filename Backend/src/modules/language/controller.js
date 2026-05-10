const languageService = require('./service');
const responseFormatter = require('../../utils/responseFormatter');
const AppError = require('../../utils/AppError');

exports.detectLanguage = async (req, res, next) => {
  try {
    const { text } = req.body;
    if (!text) {
      throw new AppError('Text input is required for language detection', 400);
    }
    const detectedLang = await languageService.detect(text);
    res.status(200).json(responseFormatter(true, { language: detectedLang }, 'Language detected successfully'));
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};
