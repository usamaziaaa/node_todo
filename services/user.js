const bcrypt = require("bcrypt");
const { loadUsers, saveUsers } = require("../helpers/helper");
const usersFilePath = "users.json";

class User {
  static signup(req, res) {
    let users = loadUsers(usersFilePath);
    const { username, password } = req.body;

    if (users[username]) {
      return res.status(400).json({ error: "Username already exists" });
    }

    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({ message: "Error hashing password" });
      }

      users[username] = { username, password: hash };

      saveUsers(usersFilePath, users);

      res.status(201).json({ message: "User registered successfully" });
    });
  }

  static login(req, res) {
    const users = loadUsers(usersFilePath);
    const { username, password } = req.body;

    if (!users[username]) {
      return res.status(401).json({ error: "User not found" });
    }

    bcrypt.compare(password, users[username].password, (err, result) => {
      if (err || !result) {
        return res.status(401).json({ message: "Authentication failed" });
      }

      res.json({ message: "Login successful" });
    });
  }
}

module.exports = User;
