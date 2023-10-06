const express = require("express");
const { verifyToken } = require("../middlewares");
const { fetchTodos, addTodo } = require("../controllers/todo");

const router = express.Router();

// Routes
router.get("/", verifyToken, fetchTodos);
router.post("/add", verifyToken, addTodo)

module.exports = router;
