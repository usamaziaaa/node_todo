const express = require("express");
const { user_signup, user_login } = require("./controllers/controller");

const app = express();

// Middleware for parsing JSON request bodies
app.use(express.json());

// Routes
app.post("/signup", user_signup);
app.post("/login", user_login);

// Start the Express server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
