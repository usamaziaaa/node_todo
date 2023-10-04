const User = require("../services/user");

const userSignup = async (req, res) => {
  const result = await User.signup(req.body);
  console.log("result---",result)
  res.status(result.code).json(result);
};

const userLogin =  async (req, res) => {
  const result = await User.login(req.body);
  console.log("result---", result)
  res.status(result.code).json(result);
};

module.exports = {
  userSignup,
  userLogin,
};
