const Auth = require("../services/auth");
const User = require("../services/user");

const userSignup = async (req, res) => {
  try {
    await User.signup(req.body);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    if (error.message === "Username already exists") {
      res.status(400).json({ error: "Username already exists" });
    } else {
      console.error(error);
      res.status(500).json({ error: "Error hashing password" });
    }
  }
};

const userLogin = async (req, res) => {
  try {
    const result = await User.login(req.body);
    res.status(201).json({ message: "Login successful", ...result });
  } catch (error) {
    if (error.message === "User not found") {
      res.status(401).json({ error: "User not found" });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const verifyRefreshToken = async (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token is required" });
  }

  try {
    const token = await Auth.verifyRefreshToken(refreshToken);
    res.status(201).json(token)
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = {
  userSignup,
  userLogin,
  verifyRefreshToken,
};
