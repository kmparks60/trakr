const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const TestResult = require("./TestResult");

User.hasMany(TestResult, { foreignKey: "userId" });
TestResult.belongsTo(User, { foreignKey: "userId" });

const User = sequelize.define("User", {
    auth0Id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = User;