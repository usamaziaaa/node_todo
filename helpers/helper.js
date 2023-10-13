const fs = require("fs");
const jwt = require("jsonwebtoken");
const config = require("../config");

// Load existing user data or initialize an empty object
const loadFile = (file) => {
  try {
    const data = fs.readFileSync(file, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return {};
  }
};

// Write updated user data back to the file
const saveFile = (file, data) => {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
};

const generateAccessToken = (user) => {
  return jwt.sign(user, config.JWT.accessTokenSecret, {
    expiresIn: config.JWT.accessTokenExpireTime,
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign(user, config.JWT.refreshTokenSecret, {
    expiresIn: config.JWT.refreshTokenExpireTime,
  });
};

module.exports = {
  loadFile,
  saveFile,
  generateAccessToken,
  generateRefreshToken,
};
