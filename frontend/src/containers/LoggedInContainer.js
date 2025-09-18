import { useContext, useState, useLayoutEffect, useRef, useEffect } from "react";
import spotify_logo from "../assets/images/spotify_logo_white.svg";
import LoggedInNavbar from '../components/shared/LoggedInNavbar';
import TextIcon from '../components/shared/textIcon';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { Howl, Howler } from 'howler';
import songContext from '../contexts/songContext';
import CreatePlaylistModal from "../modals/CreatePlaylistModal";
import AddToPlaylistModal from "../modals/AddToPlaylistModal";
import { makeAuthPostReq } from "../components/utils/serverHelper";
import toast from "react-hot-toast";

export default function LoggedInContainer({ children, currActiveScreen }) {
  const navigate = useNavigate();
  const [createPlaylistModalOpen, setCreatePlaylistModalOpen] = useState(false);
  const [addToPlaylistModalOpen, setAddToPlaylistModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const {
    currentSong,
    setCurrentSong,
    soundPlayed,
    setSoundPlayed,
    isPaused,
    setIsPaused,
  } = useContext(songContext);

  const firstUpdate = useRef(true);

  useLayoutEffect(() => {
    // the following if statement will prevent the useEffect from running on the first render.
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    if (!currentSong) {
      return;
    }
    changeSong(currentSong.track);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSong && currentSong.track]);


  const playSound = () => {
    if (!soundPlayed) {
      return;
    }
    soundPlayed.play();
  };

  const changeSong = (songSrc) => {
    if (soundPlayed) {
      soundPlayed.stop();
    }
    let sound = new Howl({
      src: [songSrc],
      html5: true,
    });
    setSoundPlayed(sound);
    sound.play();
    setIsPaused(false);
  };

  const addSongToPlaylist = async (playlistId) => {
    const songId = currentSong._id;

    const payload = { playlistId, songId };
    const response = await makeAuthPostReq(
      "/playlist/add/song",
      payload
    );
    if (response._id) {
      setAddToPlaylistModalOpen(false);
      toast.success('Song added successfully!');
    }
    else{
      toast.error('Failed to add the song!');
    }
  };

  const pauseSound = () => {
    soundPlayed.pause();
  };

  const togglePlayPause = () => {
    if (isPaused) {
      playSound();
      setIsPaused(false);
    } else {
      pauseSound();
      setIsPaused(true);
    }
  };


  return (
    <div className='h-100 w-100 .font-poppins'>
      {/* Mobile Overlay */}
      <div 
        className={`mobile-overlay ${sidebarOpen ? 'show' : ''}`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Render CreatePlaylistModal conditionally */}
      {createPlaylistModalOpen && (
        <CreatePlaylistModal
          closeModal={() => {
            setCreatePlaylistModalOpen(false);
          }}
        />
      )}
      {addToPlaylistModalOpen && (
        <AddToPlaylistModal
          closeModal={() => {
            setAddToPlaylistModalOpen(false);
          }}
          addSongToPlaylist={addSongToPlaylist}
        />

      )}

      <div className='w-100 d-flex .font-poppins position-relative' style={{ height: currentSong ? "89%" : "100%" }}>
        {/* Sidebar */}
        <div className={`w-25 d-flex-col mobile-sidebar ${sidebarOpen ? 'open' : ''}`} style={{ backgroundColor: "#1c1c1c" }}>
          <div className='p-4 container'>
            <img src={spotify_logo} alt='spotify_logo' width={140}></img>
          </div>
          <div>
            <div onClick={() => { navigate("/"); setSidebarOpen(false); }}>
              <TextIcon iconName="ion:home-sharp" text="Home" active={currActiveScreen === "home"} />
            </div>
            <div onClick={() => { navigate("/allSongs"); setSidebarOpen(false); }}>
              <TextIcon iconName="streamline:music-folder-song" text="All Songs" active={currActiveScreen === "allSongs"} />
            </div>
            <div onClick={() => { navigate("/search"); setSidebarOpen(false); }}>
              <TextIcon iconName="iconamoon:search-bold" text="Search" active={currActiveScreen === "search"} />
            </div>
            <div onClick={() => { navigate("/library"); setSidebarOpen(false); }}><TextIcon iconName="fluent:library-16-filled" text="Your Library" active={currActiveScreen === "library"} /></div>
            <div onClick={() => {
              navigate("/myMusic");
              setSidebarOpen(false);
            }}><TextIcon iconName="solar:music-notes-bold" text="My Music" active={currActiveScreen === "myMusic"} /></div>
          </div>

          <div className='mt-4'>
            <div onClick={() => { setCreatePlaylistModalOpen(true); setSidebarOpen(false); }}>
              <TextIcon iconName="icon-park-solid:add" text="Create Playlist" active={currActiveScreen === "playlist"} />
            </div>

            <TextIcon iconName="fluent-emoji:heart-decoration" text="Liked Songs" active={currActiveScreen === "likedSongs"} />
          </div>
          <div className='rounded-pill border border-secondary p-2 d-inline-block position-absolute bottom-0 my-5 mx-4'>
            <div className='d-flex'>
              <Icon icon="ic:baseline-language" color='white' width={20} />
              <div className='text-white mx-1' style={{ fontWeight: "500", fontSize: "0.87rem" }}>English</div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className='w-75 overflow-auto mobile-main-content' style={{ backgroundColor: "#1b1919" }}>
          <LoggedInNavbar onMenuClick={() => setSidebarOpen(true)} />
          {children}
        </div>
      </div>

      {/* This div is for the current playing song */}
      {
        currentSong &&
        <div className="bg-dark w-100 fixed-bottom text-white d-flex flex-row justify-content-between align-items-center mobile-player" style={{ height: "11%" }}>
          <div className='d-flex flex-row align-items-center'>
            <img src={currentSong.thumbnail} alt=" " height="50rem" width="50rem" className='mx-2 my-2 rounded' />
            <div className='mx-2 my-1 mobile-hidden'>
              <div>{currentSong.name}</div>
              <div style={{ color: "#ada5a5" }}>{currentSong.artist.firstName + " " + currentSong.artist.lastName}</div>
            </div>
            <Icon icon="ant-design:heart-outlined" width={22} className='mx-3 cursor-pointer mobile-hidden' color="gray" />
            <Icon icon="icon-park-solid:full-screen-play" width={22} className='mx-2 cursor-pointer mobile-hidden' color="gray" />
          </div>
          <div className='d-flex flex-column align-items-center mt-2 mobile-player-controls'>
            <div className='d-flex align-items-center'>
              <Icon icon="raphael:shuffle" width={18} className='mx-3 cursor-pointer mobile-hidden' color="gray" />
              <Icon icon="streamline:button-previous-solid" width={15} className='mx-2 cursor-pointer' color="gray" />
              <Icon icon={isPaused ? "ic:baseline-play-circle" : "ic:baseline-pause-circle"} width={40} className='mx-3 cursor-pointer' color="gray" onClick={() => {
                togglePlayPause();
              }} />
              <Icon icon="streamline:button-next-solid" width={15} className='mx-2 cursor-pointer' color="gray" />
              <Icon icon="icon-park-outline:loop-once" width={18} className='mx-3 cursor-pointer mobile-hidden' color="gray" />
            </div>
            <div className='d-flex align-items-center mobile-hidden'>
              <div style={{ fontSize: "0.8rem" }}>0:01</div>
              <div><Icon icon="pepicons-pop:line-x" className='mx-4' /></div>
              <div style={{ fontSize: "0.8rem" }}>3:44</div>
            </div>
          </div>
          <div className='d-flex flex-row align-items-center mx-3 mobile-hidden'>
            <Icon icon="ph:microphone-stage" className='mx-2 cursor-pointer' width={22} color="gray" />
            <Icon icon="mdi:television-speaker" className='mx-2 cursor-pointer' width={22} color="gray" />
            <Icon icon="mdi:speakerphone" className='mx-2 cursor-pointer' width={22} color="gray" />
            <Icon
              icon="tabler:playlist-add"
              className='mx-2 cursor-pointer'
              width={30}
              color="gray"
              onClick={() => setAddToPlaylistModalOpen(true)}
            />
          </div>
        </div>
      }
    </div>
  )
}
