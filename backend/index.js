// Importing necessary modules and configurations
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const cors=require('cors');
// Getting the secret key from environment variables
const SECRET = process.env.SECRET;
const URL=process.env.URL;

// Importing the User model and authentication routes
const User = require('./models/User');
const authRoutes = require('./Routes/auth');
const songRoutes = require('./Routes/song');
const playlistRoutes = require('./Routes/playlist');
// Creating an Express application
const app = express();

// Setting up the port for the server
const PORT = 5000 || process.env.PORT;

app.use(cors());
// Middleware to parse incoming JSON data
app.use(express.json());

// Simple route to test if the server is running
app.get("/", (req, res) => {
    res.send('Hello world');
});

// Setting up routes for authentication
app.use('/auth', authRoutes);
app.use('/song', songRoutes);
app.use('/playlist', playlistRoutes);
console.log(URL);
// Connecting to the MongoDB database
mongoose.connect(URL).then((x) => {
    console.log('Connected to the database');
}).catch((err) => {
    console.log('Error connecting to the database');
});

// Setting up Passport middleware for JWT authentication
// This code checks the user against the authToken
//The name of this strategy is by default jwt
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET;

passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    // Find the user in the database based on the JWT's sub (subject) claim
    User.findOne({ id: jwt_payload.sub }).then(function (user) {
        if (user) {
            // If user is found, pass the user to the next middleware
            return done(null, user);
        } else {
            // If user is not found, deny access
            return done(null, false);
            // Alternatively, you could create a new account or handle as needed
        }
    }).catch((err) => {
        return done(err, false);
    });
}));

// Starting the Express server
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
