const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET = process.env.SECRET;

// Creating an exports object for modularization
exports = {};

// Async function to generate a JWT token for a given user
exports.getToken = async (email, user) => {
    // Sign the JWT with the user's identifier (e.g., user._id) and the secret key
    const token = jwt.sign({ identifier: user._id }, SECRET);

    // Return the generated token
    return token;
}

// Exporting the 'getToken' function for use in other parts of the application
module.exports = exports;
