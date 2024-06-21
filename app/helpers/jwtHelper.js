const jwt = require('jsonwebtoken');
const { jwtSecret } = require('config');

module.exports = {
  verifyToken: (token) => jwt.verify(token, jwtSecret),
  signToken: (payload) => jwt.sign(payload, jwtSecret, { expiresIn: '1h' }),
};
