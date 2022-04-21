const { Sequelize } = require('sequelize');
require('dotenv').config();

const {
  DB_NAME, DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT,
} = process.env;

const sequelize = new Sequelize({
  host: DB_HOST,
  port: DB_PORT,
  database: DB_NAME,
  username: DB_USERNAME,
  password: DB_PASSWORD || undefined,
  dialect: 'postgres',
});

module.exports = sequelize;
