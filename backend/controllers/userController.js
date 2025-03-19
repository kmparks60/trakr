const User = require("../models/User");

exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll({ attributes: ["id", "email"] });
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, { attributes: ["id", "email", "username"] });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findByPk(req.params.id);

        if (!user || user.id !== userId) {
            return res.status(403).json({ msg: "You are not authorized to update this user" });
        }

        await user.update(req.body);
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findByPk(req.params.id);

        if (!user || user.id !== userId) {
            return res.status(403).json({ msg: "You are not authorized to delete this user" });
        }

        await user.destroy();
        res.json({ msg: "User deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
};
