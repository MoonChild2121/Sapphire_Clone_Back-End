const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            console.log('Token received:', token); // Debugging log

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Decoded token:', decoded); // Debugging log

            req.user = await User.findById(decoded.id).select('-password');
            console.log('User from DB:', req.user); // Debugging log

            if (!req.user) {
                return res.status(401).json({ message: 'User not found' });
            }

            next();
        } catch (error) {
            console.error('Token verification failed:', error); // Debugging log
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        console.error('Authorization header missing or incorrect format'); // Debugging log
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };
