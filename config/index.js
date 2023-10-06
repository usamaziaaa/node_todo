require('dotenv').config()

module.exports = {
  Port: process.env.PORT_NUMBER,
  Users: {
    filePath: process.env.USERS_FILE_PATH,
  },
  JWT: {
    key: process.env.SECRET_KEY,
    expirationTime: process.env.EXPIRATION_TIME
  },
  Todos:{
    filePath: process.env.TODOS_FILE_PATH,
  }
};