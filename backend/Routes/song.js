const Song = require('../models/Song');
const User = require('../models/User');
const express = require('express');
const passport = require('passport');
const router = express.Router();
const app = express();

//passport.authenticate to verify user before creating the song, also req.user gets the user because of it
//The name of this strategy is by default jwt
//session if true, then the passport will verify user once and will use the stored token at further authentications
router.post('/createSong', passport.authenticate("jwt", { session: false }), async (req, res) => {
    const { name, thumbnail, track } = req.body;

    //check all info of the song
    if (!name || !thumbnail || !track) {
        return res.status(403).json('Insufficient details to create song');
    }

    //artist is the user creating this song
    const artist = req.user._id;

    const songData = { name, thumbnail, track, artist };
    const createdSong = await Song.create(songData);
    return res.status(200).json(createdSong);
});

//get route to get all songs I had published
router.get('/get/mySongs', passport.authenticate("jwt", { session: false }), async (req, res) => {
    const songs = await Song.find({ artist: req.user._id }).populate("artist");
    return res.status(200).json({ data: songs });
});

//get route to get all the songs
router.get('/get/allSongs', async (req, res) => {
    try {
        const songs = await Song.find({}).populate("artist");
        if (!songs) {
            return res.status(404).json({ error: 'No songs found' });
        }
        return res.status(200).json({ data: songs });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

//get route to get all songs that a particular artist had published
router.get('/get/artist/:artistId', passport.authenticate("jwt", { session: false }), async (req, res) => {
    const artistId= req.params.artistId;
    const artist = await User.find({ _id: artistId });
    if (!artist) {
        return res.status(301).json({ err: "Artist not found!" });
    }
    const songs = await Song.find({ artist: artistId });
    return res.status(200).json({ data: songs });
});

// Get route to get a single song by name
router.get(
    "/get/songname/:songName",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        const { songName } = req.params;

        // Case-insensitive regex for pattern matching
        const regex = new RegExp(songName, 'i');

        // Using regex for case-insensitive matching
        const songs = await Song.find({ name: regex }).populate("artist");

        return res.status(200).json({ data: songs });
    }
);



module.exports = router;
