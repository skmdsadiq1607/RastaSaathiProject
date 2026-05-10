const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const { User } = require('./model');
const { env } = require('../../config/env');
const { AppError } = require('../../utils/AppError');

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
    // Verify Access Token via Google UserInfo API
    const googleRes = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`);
    const payload = googleRes.data;
    
    if (!payload.sub) throw new Error('Invalid token');

    const { email, name, sub: googleId } = payload;
    
    let user = await User.findOne({ phone: email });
    
    if (!user) {
      user = await User.create({
        name: name,
        phone: email, 
        passwordHash: await bcrypt.hash(googleId, 12),
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

