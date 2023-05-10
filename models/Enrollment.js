const sequelize = require("../sequelize");
const { Sequelize, DataTypes } = require('sequelize');
const User = require("./User");
const Course = require("./Course");

User.belongsToMany(Course, {through : "enrollment", sourcekey: "id"});

module.exports = Enrollment;
