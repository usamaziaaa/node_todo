const jwt = require("jsonwebtoken");
const config = require("../config");

class Auth {
  static generateAccessToken(user) {
    return jwt.sign(user, config.JWT.accessTokenSecret, {
      expiresIn: config.JWT.accessTokenExpireTime,
    });
  }

  static generateRefreshToken(user) {
    return jwt.sign(user, config.JWT.refreshTokenSecret, {
      expiresIn: config.JWT.refreshTokenExpireTime,
    });
  }

  static async verifyRefreshToken(token) {
    try {
      const decoded = jwt.verify(token, config.JWT.refreshTokenSecret);
      const { user } = decoded;
      const accessToken = this.generateAccessToken({ user });

      return { accessToken };
    } catch (error) {
      console.error(error);
      throw new Error("Invalid refresh token");
    }
  }
}

module.exports = Auth;
