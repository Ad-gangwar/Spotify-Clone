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

//get route to get songs by their name
router.get('/get/name/:songName', passport.authenticate("jwt", { session: false }), async (req, res) => {
    const songName = req.params.songName;
    const song = await Song.findOne({ name: songName });
    return res.status(200).json(song);
})


module.exports = router;
