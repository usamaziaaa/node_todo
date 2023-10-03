const express = require("express");
const userRoutes = require("./routes/user");

const app = express();

// Middleware for parsing JSON request bodies
app.use(express.json());

// Routes
app.use("/", userRoutes);

// Start the Express server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
