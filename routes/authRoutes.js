const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const authenticateToken = require("../middleware/authMiddleware.js");

router.post('/register', async (req, res) => {
    const { name, email, role, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        //to encrypt the password , 10 => salt rounds
        const hashedPassword = await bcrypt.hash(password, 10);

        //save new user
        const user = new User({ name, email, password: hashedPassword, role });
        await user.save();

        res.status(201).json({ message: "User registered successfully!" });
    } catch (err) {
        res.status(500).json({ message: "Error registering user" });
    }
})

//login 
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({ message: "User not found" });
        }

        //checking if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ message: "Invalid password." });
        }

        // to create a token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ message: "Login successful", token });
    } catch (err) {
        res.status(500).json({ message: "Error during login" })
    }
});

//protected route
router.get("/dashboard", (req, res) => {
    console.log(" Dashboard route hit");
    res.json({
        message: `Welcome ${req.user.role}!`,
        user: req.user
    });
});
module.exports = router;
