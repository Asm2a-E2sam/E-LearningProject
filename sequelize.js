const { Sequelize, DataTypes } = require('sequelize');
const db = require("./src/helpers/db-functions");

const sequelize = new Sequelize('e_learning', 'root', '', {
    host: 'localhost',
    port: 8080,
    dialect: 'mysql',
    logging: console.log
});

module.exports = sequelize;