const HttpStatus = require("../constants");
const Todo = require("../services/todo");

const addTodo = (req, res) => {
  const username = req.username;
  const { title, completed } = req.body;
  try {
    const result = Todo.add(username, title, completed);
    res.status(HttpStatus.CREATED).json(result);
  } catch (error) {
    res.status(HttpStatus.SERVER_ERROR).json({ error: error.message });
  }
};

const fetchTodos = (req, res) => {
  try {
    const result = Todo.fetch(req.username);
    res.status(HttpStatus.CREATED).json(result);
  } catch (error) {
    res.status(HttpStatus.SERVER_ERROR).json({ error: error.message });
  }
};

const deleteTodo = (req, res) => {
  const username = req.username;
  const todoId = req.params.id;
  try {
    const result = Todo.delete(username, todoId);
    res.status(HttpStatus.CREATED).json(result);
  } catch (error) {
    res.status(HttpStatus.SERVER_ERROR).json({ error: error.message });
  }
};

const updateTodo = (req, res) => {
  const username = req.username;
  const todoId = req.params.id;
  const { title, completed } = req.body;
  try {
    const result = Todo.update(username, todoId, title, completed);
    res.status(HttpStatus.CREATED).json(result);
  } catch (error) {
    res.status(HttpStatus.SERVER_ERROR).json({ error: error.message });
  }
};

module.exports = {
  addTodo,
  fetchTodos,
  deleteTodo,
  updateTodo,
};
