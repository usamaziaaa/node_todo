const bcrypt = require("bcrypt");
const { loadUsers, saveUsers } = require("../helpers/helper");
const usersFilePath = "users.json";
const secretKey = "secretKey";
const jwt = require("jsonwebtoken");

class User {
  static async signup(user) {
    let users = loadUsers(usersFilePath);
    const { username, password } = user;

    if (users[username]) {
      return { code: 400, error: "Username already exists" };
    }

    try {
      const hash = await bcrypt.hash(password, 10);
      users[username] = { username, password: hash };
      saveUsers(usersFilePath, users);
      return { code: 201, message: "User registered successfully" };
    } catch (error) {
      console.error(error);
      return { code: 500, error: "Error hashing password" };
    }
  }

  static async login(user) {
    const users = loadUsers(usersFilePath);
    const { username, password } = user;

    if (!users[username]) {
      return { code: 401, error: "User not found" };
    }

    try {
      const result = await bcrypt.compare(password, users[username].password);
      if (result) {
        const token = jwt.sign({user}, secretKey, { expiresIn: '1h' });
        users[username].token = token
        saveUsers(usersFilePath, users);
        return { code: 201, message: "Login successful", user: users[username] };
      } else {
        return { code: 401, message: "Authentication failed" };
      }
    } catch (error) {
      console.error(error);
      return { code: 500, message: "Bycrpt error" };
    }
  }
}

module.exports = User;
