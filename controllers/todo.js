const Todos = require("../services/todo");

const addTodo = (req, res) => {
  const username = req.username;
  const { title, completed } = req.body;
  const result = Todos.add(username, title, completed);
  res.status(result.code).json(result);
};

const fetchTodos = (req, res) => {
  const result = Todos.fetch(req.username);
  res.status(result.code).json(result);
};

const deleteTodo = (req, res) => {
  const username = req.username;
  const todoId = req.params.id
  const result = Todos.delete(username, todoId)
  res.status(result.code).json(result);
};

const updateTodo = (req, res) => {
  const username = req.username;
  const todoId = req.params.id
  const { title, completed } = req.body;
  const result = Todos.update(username, todoId, title, completed)
  res.status(result.code).json(result);
};

module.exports = {
  addTodo,
  fetchTodos,
  deleteTodo,
  updateTodo
};
