const HttpStatus = require("../constants");
const Auth = require("../services/auth");
const User = require("../services/user");

const userSignup = async (req, res) => {
  try {
    await User.signup(req.body);
    res
      .status(HttpStatus.CREATED)
      .json({ message: "User registered successfully" });
  } catch (error) {
    if (error.message === "Username already exists") {
      res
        .status(HttpStatus.CONFLICT)
        .json({ error: "Username already exists" });
    } else {
      console.error(error);
      res
        .status(HttpStatus.SERVER_ERROR)
        .json({ error: "Error hashing password" });
    }
  }
};

const userLogin = async (req, res) => {
  try {
    const result = await User.login(req.body);
    res
      .status(HttpStatus.CREATED)
      .json({ message: "Login successful", ...result });
  } catch (error) {
    if (error.message === "User not found") {
      res.status(HttpStatus.NOT_FOUND).json({ error: "User not found" });
    } else {
      res.status(HttpStatus.SERVER_ERROR).json({ error: error.message });
    }
  }
};

const verifyRefreshToken = async (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ message: "Refresh token is required" });
  }

  try {
    const token = await Auth.verifyRefreshToken(refreshToken);
    res.status(HttpStatus.CREATED).json(token);
  } catch (error) {
    res.status(HttpStatus.UNAUTHORIZED).json({ error: error.message });
  }
};

module.exports = {
  userSignup,
  userLogin,
  verifyRefreshToken,
};
