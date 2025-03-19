const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const TestResult = require("./TestResult");


const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: "Users",
});

User.hasMany(TestResult, { foreignKey: "id" });
TestResult.belongsTo(User, { foreignKey: "id" });

module.exports = User;