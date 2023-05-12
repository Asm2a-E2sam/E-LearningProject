const sequelize = require("../sequelize");
const { Sequelize, DataTypes } = require('sequelize');
const User = require("./User");

Course = sequelize.define('course', {
    name: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING(120)
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{ tableName: "courses", timestamps: false});

try{
    User.findAll();
}catch(error){
    console.log(error.message);
}

Course.sync({ alter: true });
module.exports = Course ;