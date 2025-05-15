const express = require("express");
const cors = require("cors");
const { connectDB, sequelize } = require("./config/database");
const testResults = require('./routes/testResults');
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/testResults", require("./routes/testResults"));
app.use("/api/users", require("./routes/userRoutes"));
app.use('/api/testResults', testResults);

const startServer = async () => {
    try {
        await connectDB();
        await sequelize.sync({ alter: true });
        console.log("Database synced!");
        app.listen(5000, () => console.log("Server running on port 5000"));
    } catch (error) {
        console.error("Error starting server:", error);
    }
};

startServer();