const express = require("express");
const routes = require("./routes/index");
const config = require("./config");

const app = express();

// Middleware for parsing JSON request bodies
app.use(express.json());

// Routes
app.use("/", routes);

// Start the Express server
const PORT = config.Port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
