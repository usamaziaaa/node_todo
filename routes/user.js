const express = require("express");
const { userSignup, userLogin } = require("../controllers/controller");

const router = express.Router();

// Routes
router.post("/signup", userSignup);
router.post("/login", userLogin);

module.exports = router;
