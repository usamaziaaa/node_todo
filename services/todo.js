const { v4: uuidv4 } = require("uuid");
const config = require("../config");
const { loadFile, saveFile } = require("../helpers/helper");

class Todos {
  static fetch(username) {
    try {
      let todos = loadFile(config.Todos.filePath);
      let userTodos = todos[username]?.todos || [];

      return { code: 201, username, userTodos };
    } catch (error) {
      console.error("Error fetching todos:", error);
      return { code: 500, error: "Error fetching todos" };
    }
  }
  static add(username, title, completed) {
    let todos = loadFile(config.Todos.filePath);
    const todo = { title, completed, id: uuidv4() };

    if (todos[username]) {
      todos[username].todos = [...todos[username].todos, todo];
    } else {
      todos[username] = {
        todos: [todo],
      };
    }

    saveFile(config.Todos.filePath, todos);
    return { code: 201, message: "New Todo Added", todo };
  }
}

module.exports = Todos;
