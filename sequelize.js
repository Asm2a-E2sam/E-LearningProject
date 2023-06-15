const { Sequelize, DataTypes } = require('sequelize');
const db = require("./src/helpers/db-functions");

const sequelize = new Sequelize('e_learning', 'root', '', {
    port: process.env.MYSQL_PORT,
    host: process.env.MYSQL_HOSTNAME,
    dialect: 'mysql',
    logging: false
});

sequelize.sync({
    force: true
});

module.exports = sequelize;