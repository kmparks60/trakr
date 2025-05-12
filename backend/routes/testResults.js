const express = require("express");
const { getAllResults, getUserResults, createTestResult,
        updateTestResult, deleteTestResult, getLeaderboard } = require("../controllers/testResultsController");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", getAllResults);
router.get("/user", auth, getUserResults);
router.post("/", auth, createTestResult);
router.put("/:id", auth, updateTestResult);
router.delete("/:id", auth, deleteTestResult);
router.get('/leaderboard', getLeaderboard);

module.exports = router;