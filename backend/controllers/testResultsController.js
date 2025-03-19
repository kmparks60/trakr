const TestResult = require("../models/TestResult");

exports.getAllResults = async (req, res) => {
    try {
        const results = await TestResult.findAll();
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
};

exports.getUserResults = async (req, res) => {
    try {
        const results = await TestResult.findAll({ where: { userId: req.user } });
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
};

exports.createTestResult = async (req, res) => {
    try {
        const { duration, wpm, accuracy, bestWPM } = req.body;
        const newResult = await TestResult.create({
            userId: req.user,
            duration,
            wpm,
            accuracy,
            bestWPM
        });
        res.json(newResult);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
};

exports.updateTestResult = async (req, res) => {
    const { id } = req.params;
    const { duration, wpm, accuracy, bestWPM } = req.body;

    try {
        const testResult = await TestResult.findByPk(id);

        if (!testResult) {
            return res.status(404).json({ msg: "Test result not found" });
        }

        if (testResult.userId !== req.user) {
            return res.status(403).json({ msg: "Not authorized" });
        }

        testResult.duration = duration;
        testResult.wpm = wpm;
        testResult.accuracy = accuracy;
        testResult.bestWPM = bestWPM;

        await testResult.save();
        res.json(testResult);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
};

exports.deleteTestResult = async (req, res) => {
    const { id } = req.params;

    try {
        const testResult = await TestResult.findByPk(id);

        if (!result) {
            return res.status(404).json({ msg: "Test result not found" });
        }

        if (testResult.userId !== req.user) {
            return res.status(403).json({ msg: "Not authorized" });
        }

        await testResult.destroy();
        res.json({ msg: "Test result deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
};
