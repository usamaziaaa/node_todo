const express = require("express");
const { verifyToken } = require("../middlewares");
const { fetchTodos, addTodo, deleteTodo, updateTodo } = require("../controllers/todo");

const router = express.Router();

// Routes
router.get("/", verifyToken, fetchTodos);
router.delete("/:id", verifyToken, deleteTodo);
router.put("/:id", verifyToken, updateTodo);
router.post("/add", verifyToken, addTodo)

module.exports = router;
