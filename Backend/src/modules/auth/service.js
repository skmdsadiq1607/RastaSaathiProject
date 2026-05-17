const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const https = require('https');

const { User } = require('./model');
const { env } = require('../../config/env');
const { AppError } = require('../../utils/AppError');

// High-performance Keep-Alive agent to reuse connections and avoid TLS handshake latency
const httpsAgent = new https.Agent({
  keepAlive: true,
  maxSockets: 32,
  keepAliveMsecs: 1000,
});

// In-memory cache for validated Google access tokens to avoid redundant network requests
const googleTokenCache = {
  cache: new Map(),
  ttlMs: 15 * 60 * 1000, // 15 minutes TTL

  get(token) {
    const item = this.cache.get(token);
    if (!item) return null;
    if (Date.now() > item.expiry) {
      this.cache.delete(token);
      return null;
    }
    return item.value;
  },

  set(token, value) {
    // Evict expired entries to prevent memory leaks
    const now = Date.now();
    for (const [k, v] of this.cache.entries()) {
      if (now > v.expiry) {
        this.cache.delete(k);
      }
    }
    this.cache.set(token, {
      value,
      expiry: now + this.ttlMs
    });
  }
};

function signAccessToken(user) {
  return jwt.sign({ sub: String(user._id), role: user.role }, env.JWT_SECRET, { expiresIn: '15m' });
}

function signRefreshToken(user) {
  return jwt.sign({ sub: String(user._id), type: 'refresh' }, env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
}

async function register({ name, phone, password, role, language, emergencyContacts, fcmToken }) {
  const existing = await User.findOne({ phone }).lean();
  if (existing) throw new AppError('Phone already registered', 409, 'PHONE_EXISTS');

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({
    name,
    phone,
    passwordHash,
    role,
    language,
    emergencyContacts,
    fcmToken: fcmToken || undefined
  });

  return {
    user: sanitizeUser(user),
    accessToken: signAccessToken(user),
    refreshToken: signRefreshToken(user)
  };
}

async function login({ phone, password, fcmToken }) {
  const user = await User.findOne({ phone });
  if (!user) throw new AppError('Invalid credentials', 401, 'INVALID_CREDENTIALS');

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) throw new AppError('Invalid credentials', 401, 'INVALID_CREDENTIALS');

  if (typeof fcmToken === 'string' && fcmToken.length > 0) {
    user.fcmToken = fcmToken;
    await user.save();
  }

  return {
    user: sanitizeUser(user),
    accessToken: signAccessToken(user),
    refreshToken: signRefreshToken(user)
  };
}

async function logout({ accessToken, refreshToken }) {
  // In-memory blacklist could be added here
}

async function refresh({ refreshToken }) {
  let payload;
  try {
    payload = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET);
  } catch {
    throw new AppError('Unauthorized', 401, 'UNAUTHORIZED');
  }

  if (payload.type !== 'refresh') throw new AppError('Unauthorized', 401, 'UNAUTHORIZED');

  const user = await User.findById(payload.sub);
  if (!user) throw new AppError('Unauthorized', 401, 'UNAUTHORIZED');

  return {
    accessToken: signAccessToken(user),
    refreshToken: signRefreshToken(user)
  };
}

async function googleLogin({ token, fcmToken, role = 'victim' }) {
  try {
    // 1. Check in-memory cache for validated token details
    let payload = googleTokenCache.get(token);

    if (!payload) {
      // 2. Cache miss: Verify Access Token via Google UserInfo API using Keep-Alive
      const googleRes = await axios.get(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`,
        { httpsAgent, timeout: 8000 }
      );
      payload = googleRes.data;
      
      if (!payload || !payload.sub) throw new Error('Invalid token');

      // 3. Cache the verified payload
      googleTokenCache.set(token, payload);
    }

    const { email, name, sub: googleId } = payload;
    
    let user = await User.findOne({ phone: email });
    
    if (!user) {
      // 4. Optimize bcrypt salt rounds (4) for social logins to eliminate CPU registry bottleneck
      user = await User.create({
        name: name,
        phone: email, 
        passwordHash: await bcrypt.hash(googleId, 4),
        role: role,
        language: 'en'
      });
    }

    if (fcmToken) {
      user.fcmToken = fcmToken;
      await user.save();
    }

    return {
      user: sanitizeUser(user),
      accessToken: signAccessToken(user),
      refreshToken: signRefreshToken(user)
    };
  } catch (error) {
    console.error('Google Auth Error:', error.response?.data || error.message);
    throw new AppError('Invalid Google Token', 401, 'UNAUTHORIZED');
  }
}

function sanitizeUser(user) {
  return {
    id: String(user._id),
    name: user.name,
    phone: user.phone,
    role: user.role,
    language: user.language,
    emergencyContacts: user.emergencyContacts || [],
    fcmToken: user.fcmToken
  };
}

async function updateProfile(userId, data) {
  const user = await User.findById(userId);
  if (!user) throw new AppError('User not found', 404, 'NOT_FOUND');

  const { name, language, emergencyContacts } = data;
  if (name) user.name = name;
  if (language) user.language = language;
  if (emergencyContacts) user.emergencyContacts = emergencyContacts;

  await user.save();
  return sanitizeUser(user);
}

module.exports = { register, login, logout, refresh, googleLogin, updateProfile };

