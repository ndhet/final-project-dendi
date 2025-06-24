const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });

        if (user && (await user.comparePassword(password))) {
            res.json({
                id: user.id,
                username: user.username,
                token: generateToken(user.id),
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const logoutUser = (req, res) => {
    res.json({ message: 'Logout successful' });
};

module.exports = { loginUser, logoutUser };
