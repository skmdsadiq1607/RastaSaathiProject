const { env } = require('../config/env');
const { logger } = require('./logger');

class ApiKeyManager {
  constructor(keysString, serviceName) {
    this.serviceName = serviceName;
    this.keys = (keysString || '').split(',').map(k => k.trim()).filter(Boolean);
    this.currentIndex = 0;
  }

  getCurrentKey() {
    if (this.keys.length === 0) {
      logger.error(`[ApiKeyManager] No API keys configured for ${this.serviceName}`);
      return null;
    }
    return this.keys[this.currentIndex];
  }

  rotateKey() {
    if (this.keys.length <= 1) {
      logger.warn(`[ApiKeyManager] Cannot rotate ${this.serviceName} keys: only 1 key available.`);
      return this.getCurrentKey();
    }
    
    this.currentIndex = (this.currentIndex + 1) % this.keys.length;
    logger.warn(`[ApiKeyManager] Rate Limit hit! Rotated to ${this.serviceName} key index: ${this.currentIndex}`);
    return this.getCurrentKey();
  }
}

// Instantiate managers for the services
const claudeKeyManager = new ApiKeyManager(env.CLAUDE_API_KEYS, 'Claude');
const geminiKeyManager = new ApiKeyManager(env.GEMINI_API_KEYS, 'Gemini');

module.exports = {
  claudeKeyManager,
  geminiKeyManager
};
