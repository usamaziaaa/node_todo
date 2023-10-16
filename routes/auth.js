const express = require("express");
const { userSignup, userLogin, verifyRefreshToken } = require("../controllers/user");

const router = express.Router();

// Routes
router.post("/signup", userSignup);
router.post("/login", userLogin);
router.post('/refresh-token', verifyRefreshToken);

module.exports = router;
