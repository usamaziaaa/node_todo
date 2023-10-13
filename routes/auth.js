const express = require("express");
const { userSignup, userLogin, refreshToken } = require("../controllers/user");

const router = express.Router();

// Routes
router.post("/signup", userSignup);
router.post("/login", userLogin);
router.post('/refresh-token', refreshToken);

module.exports = router;
