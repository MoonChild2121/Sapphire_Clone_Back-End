// tokenUtils.js
const jwt = require('jsonwebtoken');

const generateTokens = (user) => {
    const accessToken = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' } // Short-lived access token
    );

    const refreshToken = jwt.sign(
        { id: user._id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '10y' } // Long-lived refresh token
    );

    return { accessToken, refreshToken };
};

module.exports = { generateTokens };
