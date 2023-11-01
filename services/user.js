const bcrypt = require("bcrypt");
const { loadFile, saveFile } = require("../helpers/helper");
const config = require("../config/index");
const Auth = require("./auth");

class User {
  static async signup(user) {
    let users = loadFile(config.Users.filePath);
    const { username, password } = user;

    if (users[username]) {
      throw new Error("Username already exists");
    }

    try {
      const hash = await bcrypt.hash(password, 10);
      users[username] = { username, password: hash };
      saveFile(config.Users.filePath, users);
    } catch (error) {
      console.error(error);
      throw new Error("Error hashing password");
    }
  }

  static async login(user) {
    const users = loadFile(config.Users.filePath);
    const { username, password } = user;

    if (!users[username]) {
      throw new Error("User not found");
    }

    try {
      const isPasswordValid = await bcrypt.compare(password, users[username].password);

      if (isPasswordValid) {
        const accessToken = Auth.generateAccessToken({ user });
        const refreshToken = Auth.generateRefreshToken({ user });

        return { user: users[username], accessToken, refreshToken };
      } else {
        throw new Error("Authentication failed");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      throw new Error("Login failed");
    }
  }
}

module.exports = User;
