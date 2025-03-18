const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const TestResult = require("./TestResult");


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
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

User.hasMany(TestResult, { foreignKey: "userId" });
TestResult.belongsTo(User, { foreignKey: "userId" });

module.exports = User;