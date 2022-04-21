const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const {
  DB_NAME, DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT,
} = process.env;

const sequelize = new Sequelize({
  database: DB_NAME,
  username: DB_USERNAME,
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'postgres',
});

module.exports = sequelize;
