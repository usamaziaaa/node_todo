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

module.exports = {
  addTodo,
  fetchTodos,
};
