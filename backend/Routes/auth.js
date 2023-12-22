const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { getToken } = require('../utils/helpers');
const app = express();

// Register endpoint
router.post('/register', async (req, res) => {
    // Extracting user details from the request body
    const { firstName, lastName, email, username, password } = req.body;

    // Check if a user with the same email already exists
    const user = await User.findOne({ email });
    if (user) {
        return res.status(403).json({ error: "A user with this email already exists" });
    }

    // Hash the password using bcrypt
    const hashPass = await bcrypt.hash(password, 10);

    // Create a new user with hashed password
    const newUserData = {
        firstName,
        lastName,
        email,
        username,
        password: hashPass,
    };

    // Save the new user to the database
    const newUser = await User.create(newUserData);

    // Generate a token for the new user
    const token = await getToken(email, newUser);

    // Prepare user data to return in the response
    const userToReturn = { ...newUser.toJSON(), token };
    // Remove the password from the response for security reasons
    delete userToReturn.password;

    res.status(200).json(userToReturn);
});

// Login endpoint
router.post('/login', async (req, res) => {
    // Extracting login credentials from the request body
    const { email, password } = req.body;

    // Find the user with the provided email in the database
    const user = await User.findOne({ email: email });

    // If no user is found, return a 403 status with an error message
    if (!user) {
        return res.status(403).json({ err: 'Enter valid Credentials' });
    }

    // Compare the provided password with the hashed password stored in the database
    const isValidPass = await bcrypt.compare(password, user.password);

    // If the password is not valid, return a 403 status with an error message
    if (!isValidPass) {
        return res.status(403).json({ err: 'Enter valid Credentials' });
    }

    // Generate a token for the authenticated user
    const token = await getToken(user.email, user);

    // Prepare user data to return in the response
    const userToReturn = { ...user.toJSON(), token };
    // Remove the password from the response for security reasons
    delete userToReturn.password;

    return res.status(200).json(userToReturn);
});

module.exports = router;
