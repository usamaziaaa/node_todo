const express = require("express");
const { verifyToken } = require("../middlewares");
const { fetchTodos, addTodo, deleteTodo, updateTodo } = require("../controllers/todo");

const router = express.Router();

// Middleware for authorization
router.use(verifyToken)

// Routes
router.get("/", fetchTodos);
router.delete("/:id", deleteTodo);
router.put("/:id", updateTodo);
router.post("/add", addTodo)

module.exports = router;
