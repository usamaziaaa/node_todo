const fs = require("fs");

// Load existing user data or initialize an empty object
const loadUsers = (file) => {
  try {
    const data = fs.readFileSync(file, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return {};
  }
};

// Write updated user data back to the file
const saveUsers = (file, data) => {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
};

module.exports = {
  loadUsers,
  saveUsers,
};
