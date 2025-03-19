const express = require("express");
const { check } = require("express-validator");
const { register, login, getUser } = require("../controllers/authController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post(
    "/register",
    [
        check("email", "Please include a valid email").isEmail(),
        check("password", "Password must be at least 6 characters").isLength({ min: 6})
    ],
    register
);

router.post("/login", login);
router.get("/user", auth, getUser);

module.exports = router;