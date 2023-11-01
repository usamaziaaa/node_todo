const fs = require("fs");

/**
 * Load and parse JSON data from a file.
 * @param {string} file - The path to the file to load and parse.
 * @returns {Object} - The parsed JSON data as a JavaScript object or an empty object if there was an error reading the file.
 */
const loadFile = (file) => {
  try {
    const data = fs.readFileSync(file, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return {};
  }
};

/**
 * Write updated user data back to the file
 */

const saveFile = (file, data) => {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
};

module.exports = { loadFile, saveFile };
