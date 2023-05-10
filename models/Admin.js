const sequelize = require("../sequelize");
const { Sequelize, DataTypes } = require('sequelize');

const Admins = sequelize.define("admins", {
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
}, { tableName: "admins", timestamps: false});


module.exports = Admins;
