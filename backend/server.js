const express = require("express");
const cors = require("cors");
const { connectDB, sequelize } = require("./config/database");
const userRoutes = require("./routes/userRoutes")
const testResultsRoute = require("./routes/testResults");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/test-results", testResultsRoute);

const startServer = async () => {
    try {
        await connectDB();
        await sequelize.sync({ force: false });
        console.log("Database synced!");
        app.listen(5000, () => console.log("Server running on port 5000"));
    } catch (error) {
        console.error("Error starting server:", error);
    }
};

startServer();