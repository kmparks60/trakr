const { Sequelize } = require("sequelize")
require("dotenv").config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    logging: true
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Express successfully connected to trakr db!")
    } catch (error) {
        console.error("Database connection failed:", error)
        process.exit(1);
    }
};

module.exports = { sequelize, connectDB };