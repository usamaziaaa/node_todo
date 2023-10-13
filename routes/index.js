const express = require("express");
const authRoutes = require("./auth");
const todoRoutes = require("./todo");

const router = express.Router();

router.use("/", authRoutes);
router.use("/todos", todoRoutes);

module.exports = router;
