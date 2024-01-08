import { createContext, useState } from "react";

// Create a React context for managing song-related state
const songContext = createContext({
    // Initial state values for the context
    currentSong: null,                  // Currently selected song
    setCurrentSong: (currentSong) => {}, // Function to update the currently selected song

    soundPlayed: null,                  // Information about the played sound
    setSoundPlayed:(sound) => {},      // Function to update information about the played sound

    isPaused: null,                     // Flag indicating whether the song is currently paused
    setIsPaused: (isPaused) => {},      // Function to update the pause state of the song
});

export default songContext;
