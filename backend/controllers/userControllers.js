const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, {
        expiresIn: "3d",
    });
};

// @route   POST /api/users/signup
const signupUser = async (req, res) => {
    const {
        name,
        username,
        password,
        phone_number,
        profilePicture,
        gender,
        date_of_birth,
        role,
        address
    } = req.body;
    try {
        if (
            !name ||
            !username ||
            !password ||
            !phone_number ||
            !gender ||
            !date_of_birth ||
            !role ||
            !address.street ||
            !address.city ||
            !address.state ||
            !address.zipCode
        ) {
            res.status(400);
            throw new Error("Please add all fields");
        }
        if (password.length < 8) {
            res.status(400);
            throw new Error("Password not satisfactory.");
        }
        // Check if user exists
        const userExists = await User.findOne({ username });

        if (userExists) {
            res.status(400);
            throw new Error("User already exists");
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            name,
            username,
            password: hashedPassword,
            phone_number,
            profilePicture,
            gender,
            date_of_birth,
            role,
            address
        });

        if (user) {
            // console.log(user._id);
            const token = generateToken(user._id);
            res.status(201).json({ username, token });
        } else {
            res.status(400);
            throw new Error("Invalid user data");
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ error: error.message });
    }
};

// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Check for user username
        const user = await User.findOne({ username });

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = generateToken(user._id);
            res.status(200).json({ username, token });
        } else {
            res.status(400);
            throw new Error("Invalid credentials");
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ error: error.message });
    }
};

// @route   GET /api/users/me
// @access  Private
const getMe = async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    signupUser,
    loginUser,
    getMe,
};
