const fs = require('fs');

module.exports = {
  development: {
    username: 'me',
    password: 'me2',
    database: 'caption_contest',
    host: 'localhost',
    dialect: 'postgres'
  },
  test: {
    username: 'me',
    password: 'me2',
    database: 'caption_contest',
    host: 'localhost',
    dialect: 'postgres'
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: 'postgres'
  }
}
