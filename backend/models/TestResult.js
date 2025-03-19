const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const User = require("./User");

const TestResult = sequelize.define("TestResult", {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Users",
            key: "id"
        }
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    wpm: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    accuracy: {
        type: DataTypes.FLOAT, 
        allowNull: false,
        defaultValue: 0.00
    },
    bestWpm: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
}, {
    tableName: "TestResults"
});

module.exports = TestResult;