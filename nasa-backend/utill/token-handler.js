require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.CreateToken = (userData) => {
    const payload = {
        id: userData._id,
        userName: userData.UserName,
        email: userData.UserEmail
    };
    return jwt.sign(payload, process.env.TOKEN_KEY, { expiresIn: '3h' });
};

module.exports.verifyToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Authorization denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token is not valid.' });
    }
};