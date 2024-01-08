import React, { useState } from 'react';
import LoggedInContainer from '../containers/LoggedInContainer';
import { Icon } from '@iconify/react';
import { makeAuthGetReq } from '../components/utils/serverHelper';
import SingleSongCard from '../components/shared/SingleSongCard';

export default function Search() {
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [songData, setSongData] = useState(null);

    const searchSong = async () => {
        // This function will call the search api
        const response = await makeAuthGetReq(
            "/song/get/songname/" + searchText
        );
        setSongData(response.data);
    };
    console.log(songData);
    return (
        <LoggedInContainer currActiveScreen='search'>
            <div className='w-100 py-3'>
                <div
                    className={`m-4 p-2 px-4 rounded-pill w-50 flex ${isInputFocused ? 'border border-white' : ''
                        }`}
                    style={{ backgroundColor: '#2d2b2b', outline: 'none' }}
                >
                    <span>
                        <Icon icon='iconamoon:search' color='white' width={22} className='iconText' />
                    </span>
                    <input
                        type='text'
                        placeholder='What do you want to listen to?'
                        className='p-2 text-gray search-bar border-0 text-white'
                        onFocus={() => {
                            setIsInputFocused(true);
                        }}
                        onBlur={() => {
                            setIsInputFocused(false);
                        }}
                        onChange={(e) => {
                            setSearchText(e.target.value);
                        }}
                        value={searchText}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                searchSong();
                            }
                        }}
                    />
                </div>
                {
                    songData && songData.length > 0 ? (
                        <div className="pt-10 m-4">
                            <div className="text-white">
                                Showing search results for
                                <span className="font-bold"> {songData[0].name}</span>
                            </div>
                            {songData.map((item) => (
                                <SingleSongCard
                                    info={item}
                                    key={item._id}
                                    playSound={() => { }}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-white m-4 fs-4 iconText">
                            Nothing to show here.
                        </div>
                    )
                }

            </div>
        </LoggedInContainer>
    );
}
