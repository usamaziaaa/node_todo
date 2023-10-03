const User = require("../services/user");

const userSignup = (req, res) => {
  User.signup(req, res);
};

const userLogin = (req, res) => {
  User.login(req, res);
};

module.exports = {
  userSignup,
  userLogin,
};
