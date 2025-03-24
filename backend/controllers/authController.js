const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/User");

exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        if (!username || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const existingUserByEmail = await User.findOne({ where: { email } });
        if (existingUserByEmail) {
            return res.status(400).json({ msg: "Email already in use" });
        }

        const existingUserByUsername = await User.findOne({ where: { username } });
        if (existingUserByUsername) {
            return res.status(400).json({ msg: "Username already in use" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({ 
            username,
            email,
            password: hashedPassword
        });

        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
};

exports.login = async (req, res) => {
    const { usernameOrEmail, password } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    try {
        let user;
        if (emailRegex.test(usernameOrEmail)) {
            user = await User.findOne({ where: { email: usernameOrEmail } });
        } else {
            user = await User.findOne({ where: { username: usernameOrEmail } });
        }

        if (!user) return res.status(400).json({ msg: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1hr" });

        res.json({ token, user: { id: user.id, email: user.email, username: user.username } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.user, { attributes: ["id", "email"] });
        if (!user) return res.status(404).json({ msg: "User not found" });

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(401).json({ msg: "Server error" });
    }
}