const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const TestResult = sequelize.define("TestResult", {
    duration: {
        type: DataTypes.INTEGER, // in seconds
        allowNull: false
    },
    wpm: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    accuracy: {
        type: DataTypes.FLOAT, 
        allowNull: false
    },
    bestWpm: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
});

module.exports = TestResult;