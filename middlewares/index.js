const jwt = require('jsonwebtoken');
const config = require('../config');

function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, config.JWT.key);
    req.username = decoded.user.username;

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token is invalid' });
  }
}

module.exports = { verifyToken };
