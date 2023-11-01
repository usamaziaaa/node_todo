const express = require("express");
const authRoutes = require("./auth");
const todoRoutes = require("./todo");

const router = express.Router();

router.use("/", (req, res) => res.send("Hello World"))
router.use("/", authRoutes);
router.use("/todos", todoRoutes);

module.exports = router;
