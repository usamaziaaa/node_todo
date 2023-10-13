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
    try {
      let todos = loadFile(config.Todos.filePath);
      console.log(todos);
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
    } catch (error) {
      console.error("Error Adding todo:", error);
      return { code: 500, error: "Error Adding todo" };
    }
  }
  static delete(username, id) {
    try {
      let todos = loadFile(config.Todos.filePath);

      let userTodos = todos[username].todos;
      userTodos = userTodos.filter((todo) => todo.id !== id);
      todos[username].todos = userTodos;

      saveFile(config.Todos.filePath, todos);
      return { code: 201, message: "Todo Deleted Successfully" };
    } catch (error) {
      console.error("Error Deleted Todo:", error);
      return { code: 500, error: "Error Deleted Todo" };
    }
  }
  static update(username, id, title, completed) {
    try {
      let todos = loadFile(config.Todos.filePath);

      let userTodos = todos[username].todos;
      let todoToUpdate = userTodos.find((todo) => todo.id === id);

      if (!todoToUpdate) {
        return { code: 404, error: "Todo not found" };
      }

      if (title) {
        todoToUpdate.title = title;
      }

      if (completed !== undefined) {
        todoToUpdate.completed = completed;
      }

      todos[username].todos = userTodos;

      saveFile(config.Todos.filePath, todos);
      return { code: 201, message: "Todo Updated Successfully" };
    } catch (error) {
      console.error("Error Updating Todo:", error);
      return { code: 500, error: "Error Updating Todo" };
    }
  }
}

module.exports = Todos;
