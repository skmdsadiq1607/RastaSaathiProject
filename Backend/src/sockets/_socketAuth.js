const jwt = require('jsonwebtoken');
const { env } = require('../config/env');

function socketAuthMiddleware(socket, next) {
  try {
    const token =
      socket.handshake.auth?.token ||
      (socket.handshake.headers.authorization || '').split(' ')[1] ||
      socket.handshake.query?.token;

    if (!token) return next(new Error('UNAUTHORIZED'));
    const payload = jwt.verify(token, env.JWT_SECRET);
    socket.user = payload;
    next();
  } catch {
    next(new Error('UNAUTHORIZED'));
  }
}

module.exports = { socketAuthMiddleware };

