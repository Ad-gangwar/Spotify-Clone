import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Routes/Login';
import Signup from './Routes/Signup';
// import Home from './components/Home';
import UploadSong from './Routes/UploadSong';
import toast, { Toaster } from 'react-hot-toast';
import MyMusic from './Routes/myMusic';
import LoggedInHome from './Routes/LoggedInHome';
import { useCookies } from 'react-cookie';
import songContext from './contexts/songContext';
import { useState } from 'react';
import Search from './Routes/Search';
import Library from './Routes/Library';
import SinglePlaylistView from './Routes/SinglePlaylistView';
import MyProfile from './components/MyProfile';
import AllSongs from './Routes/AllSongs';

export default function App() {
  const [cookie, setCookie] = useCookies(["token"]);
  const [currentSong, setCurrentSong] = useState(null);
  const [soundPlayed, setSoundPlayed] = useState(null);
  const [isPaused, setIsPaused] = useState(true);

  return (
    <div className='vh-100 w-100'>
      <Toaster />
      <BrowserRouter>
        {cookie.token ?
          <songContext.Provider value={{
            currentSong,
            setCurrentSong,
            soundPlayed,
            setSoundPlayed,
            isPaused,
            setIsPaused,
          }}>
            <Routes>
              {/* songContext.Provider enables these routes to use songContext */}
              {/* Passing value directly into the initial value of the songContext to avoid passing to each route */}
              <Route path='/' element={<LoggedInHome />}></Route>
              <Route path='/uploadSong' element={<UploadSong />}></Route>
              <Route path='/myMusic' element={<MyMusic />}></Route>
              <Route path='/allSongs' element={<AllSongs />}></Route>
              <Route path='/search' element={<Search />}></Route>
              <Route path='/library' element={<Library />}></Route>
              <Route path='/myProfile' element={<MyProfile />}></Route>
              <Route path='/playlist/:playlistId' element={<SinglePlaylistView />}></Route>
              <Route path='*' element={<Navigate to='/' />}></Route>
            </Routes>
          </songContext.Provider> :
          <Routes>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
            <Route path='*' element={<Navigate to='/login' />}></Route>
          </Routes>}

      </BrowserRouter>
    </div>
  );
}


