const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const validator = require('validator');

// Sign Up Handler
exports.signUp = async (req, res) => {
    const { name, email, password } = req.body;

    // Validate email and password
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    if (!validator.isLength(password, { min: 6 })) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
        return res.status(400).json({ message: 'Password must contain at least one uppercase letter and one number' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '10h' });

        res.status(201).json({ token, userId: newUser._id });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
    }
};

// Sign In Handler
exports.signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, userId: user._id });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
    }
};
