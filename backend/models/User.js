const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        private: true
    },
    username: {
        type: String,
        required: true
    },
    likedSongs: {
        type: String,
        default: ""
    },
    likedPlaylists: {
        type: String,
        default: ""
    },
    subscribedArtists: {
        type: String,
        default: ""
    }
})

const userModel = new mongoose.model('User', userSchema);
module.exports = userModel;