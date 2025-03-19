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
        const user = await User.findByPk(req.params.id, { attributes: ["id", "email"] });

        if (!user) return res.status(404).json({ msg: "User not found" });

        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);

        if (!user || user.id !== req.user) {
            return res.status(404).json({ msg: "User not found" });
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
        const user = await User.findByPk(req.params.id);

        if (!user || user.id !== req.user) {
            return res.status(404).json({ msg: "User not found" });
        }

        await user.destroy();
        res.json({ msg: "User deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
};
