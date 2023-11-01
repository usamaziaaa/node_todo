const jwt = require("jsonwebtoken");
const config = require("../config");
const HttpStatus = require("../constants");

function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(HttpStatus.UNAUTHORIZED).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, config.JWT.accessTokenSecret);
    req.username = decoded.user.username;

    next();
  } catch (error) {
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ error: "Token is invalid" });
  }
}

module.exports = { verifyToken };
