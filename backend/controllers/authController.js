const User = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//generating JWT
const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );
};

//register
exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        //hash password
        const hashingPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashingPassword,
            role
        });

        const token = generateToken(newUser);

        res.status(201).json({
            message: "User created successfully!",
            token
        });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

//login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = generateToken(user);

        res.status(200).json({
            message: "Login successful",
            token
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}