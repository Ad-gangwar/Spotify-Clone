const Song = require('../models/Song');
const User = require('../models/User');
const express = require('express');
const passport = require('passport');
const Playlist = require('../models/Playlist');
const router = express.Router();
const app = express();

//api to create playlist
router.post('/create', passport.authenticate("jwt", { session: false }), async (req, res) => {
    const { name, thumbnail, owner, songs } = req.body;

    if (!name || !thumbnail) {
        return res.status(301).json({ err: "Insufficient Information to create Playlist" });
    }

    const info = {
        name,
        thumbnail,
        owner: req.user._id,
        songs,
        collaborators: []
    }

    const createdPlaylist = await Playlist.create(info);
    return res.status(200).json(createdPlaylist);
});

//api to fetch playlist
// /:xyz to assign any value to playlistId and to hit this route for any value of playlistId 
router.get('/get/playlist/:playlistId', passport.authenticate("jwt", { session: false }), async (req, res) => {
    const plId = req.params.playlistId;
    const playlist = await Playlist.findOne({ _id: plId }).populate({
        path: "songs",
        populate: {
            path: "artist"
        }
    });
    if (!playlist) {
        return res.status(301).json({ err: "Invalid ID" });
    }

    res.status(200).json(playlist);
});

// Get all playlists made by me
// /get/me
router.get(
    "/get/me",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        const artistId = req.user._id;

        const playlists = await Playlist.find({ owner: artistId }).populate(
            "owner"
        );
        return res.status(200).json({ data: playlists });
    }
);


//end point to fetch all the playlist created by an artist
router.get('/get/artist/:artistId', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const artistId = req.params.artistId;
    const artist = await User.findOne({ _id: artistId });

    if (!artist) {
        return res.status(301).json({ err: 'Invalid Artist ID!' });
    }

    const playlists = await Playlist.find({ owner: artistId });

    if (playlists.length === 0) {
        return res.status(302).json({ err: 'No playlist created by the artist' });
    }

    return res.status(200).json(playlists);
});


//end point route to add song to playlist
router.post('/add/song', passport.authenticate("jwt", { session: false }), async (req, res) => {
    const { songId, playlistId } = req.body;

    const playlist = await Playlist.findOne({ _id: playlistId });
    if (!playlist) {
        return res.status(304).json({ err: "Playlist not found!" });
    }

    //cannot use === here because these both ids are of type object and objects cannot be comapared like this
    if (!playlist.owner.equals(req.user._id) && !playlist.collaborators.includes(req.user._id)) {
        return res.status(403).json({ err: 'Not Allowed!' });
    }

    const song = await Song.findOne({ _id: songId });

    if (!song) {
        return res.status(301).json({ err: "Song not found!" });
    }

    playlist.songs.push(songId);
    await playlist.save();

    return res.status(200).json(playlist);
});

module.exports = router;

