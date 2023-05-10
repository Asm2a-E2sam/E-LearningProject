const sequelize = require("../sequelize");
const { Sequelize, DataTypes } = require('sequelize');

const Users = sequelize.define("users", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name:{
        type: Sequelize.STRING(60),
        allowNull: false,
    },
    email:{
        type: Sequelize.STRING(120),
        allowNull: false,
    },
    password:{
        type: Sequelize.STRING(60),
        allowNull: false,
    }
}, { tableName: "users", timestamps: false});

module.exports = Users;
