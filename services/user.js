const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  loadFile,
  saveFile,
  generateAccessToken,
  generateRefreshToken,
} = require("../helpers/helper");
const config = require("../config/index");

class User {
  static async signup(user) {
    let users = loadFile(config.Users.filePath);
    const { username, password } = user;

    if (users[username]) {
      return { code: 400, error: "Username already exists" };
    }

    try {
      const hash = await bcrypt.hash(password, 10);
      users[username] = { username, password: hash };
      saveFile(config.Users.filePath, users);
      return { code: 201, message: "User registered successfully" };
    } catch (error) {
      console.error(error);
      return { code: 500, error: "Error hashing password" };
    }
  }

  static async login(user) {
    const users = loadFile(config.Users.filePath);
    const { username, password } = user;

    if (!users[username]) {
      return { code: 401, error: "Sorry, User not found" };
    }

    try {
      const result = await bcrypt.compare(password, users[username].password);
      if (result) {
        const accessToken = generateAccessToken({ user });
        const refreshToken = generateRefreshToken({ user });

        return {
          code: 201,
          message: "Login successful",
          user: users[username],
          accessToken,
          refreshToken,
        };
      } else {
        return { code: 401, message: "Authentication failed" };
      }
    } catch (error) {
      console.error(error);
      return { code: 500, message: "Bycrpt error" };
    }
  }

  static async refreshToken(token) {
    try {
      const decoded = jwt.verify(token, config.JWT.refreshTokenSecret);
      const { user } = decoded;
      const accessToken = generateAccessToken({ user });

      return { code: 201, accessToken };
    } catch (error) {
      return { code: 403, error: "Invalid refresh token" };
    }
  }
}

module.exports = User;
