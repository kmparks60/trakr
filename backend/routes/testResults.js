const express = require("express");
const { checkJwt } = require("../middleware/auth");
const { TestResult } = require("../models/TestResult");

const router = express.Router();

router.post("/", checkJwt, async (req, res) => {
    const { userId, duration, wpm, accuracy, bestWPM} = req.body;

    try {
        const newTestResult = await TestResult.create({
            userId,
            duration,
            wpm,
            accuracy,
            bestWPM
        });
        res.status(201).json({ testResult: newTestResult});
    } catch (error) {
        console.error("Errors saving test result:", error)
        res.status(500).send("Server error");
    }
});

router.get("/:userId", checkJwt, async (req, res) => {
    const { userId } = req.params;

    try {
        const testResults = await TestResult.findAll({ where: { userId } });
        res.status(200).json({ testResults });
    } catch (error) {
        console.error("Error fetching test results:", error);
        res.status(500).send("Server error");
    }
});

module.exports = router;