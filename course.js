const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

const Course = sequelize.define('courses', {
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
});

Course.sync({ force: true });