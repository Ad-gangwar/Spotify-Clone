import React, { useState, useEffect } from 'react'
import SingleSongCard from '../components/shared/SingleSongCard';
import { makeAuthGetReq } from '../components/utils/serverHelper';
import LoggedInContainer from '../containers/LoggedInContainer';

export default function MyMusic() {
    const [songData, setSongData] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const response = await makeAuthGetReq(
                "/song/get/mySongs"
            );
            setSongData(response.data);
        };
        getData();
    }, []);

    return (
        <LoggedInContainer currActiveScreen="myMusic">
            <div className='text-white fs-3 m-4 iconText'>My Songs</div>
            {songData.map((item) => {
                return <SingleSongCard info={item} playSound={() => { }} />;
            })}
        </LoggedInContainer>
    )
}
