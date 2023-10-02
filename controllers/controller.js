const bcrypt = require("bcrypt");
const { load_users, save_users } = require("../helpers/helper");

const usersFilePath = "users.json";

const user_signup = (req, res) => {
  const { username, password } = req.body;
  let userData = load_users(usersFilePath);

  // Check if the username already exists
  if (userData[username]) {
    return res.status(400).json({ error: "Username already exists" });
  }

  // Hash the password
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({ message: "Error hashing password" });
    }

    // Add the new user to the data
    userData[username] = { username, password: hash };

    // Write updated user data back to the file
    save_users(usersFilePath, userData);

    res.status(201).json({ message: "User registered successfully" });
  });
};

const user_login = (req, res) => {
  const { username, password } = req.body;
  let userData = load_users(usersFilePath);

  // Check if the user exists and the password matches
  if (!userData[username]) {
    return res.status(401).json({ error: "User not found" });
  }

  bcrypt.compare(password, userData[username].password, (err, result) => {
    if (err || !result) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    res.json({ message: "Login successful" });
  });
};

module.exports = {
  user_signup,
  user_login,
};
