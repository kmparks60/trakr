const express = require("express");
const router = express.Router();
const User  = require("../models/User");
const { checkJwt } = require("../middleware/auth");

router.post("/create", checkJwt, async (req, res) => {
    try{
        const { sub, name, email } = req.user;
        let user = await User.findOne({ where : { auth0_id: sub } });

        if (!user) {
            user = await User.create({ auth0_id: sub, username: name, email });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

router.get("/profile", checkJwt, async (req, res) => {
    try {
        const user = await User.findOne({ where: { auth0_id: req.user.sub } });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

router.put("/update", checkJwt, async (req, res) => {
    try {
        const { username } = req.body;
        const user = await User.findOne({ where: { auth0_id: req.user.sub } });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        user.username = username;
        await user.save();

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

router.delete("/delete", checkJwt, async (req, res) => {
    try {
        const user = await User.findOne({ where: { auth0_id: req.user.sub } });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        await user.destroy();
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;