import React, { useEffect, useState } from 'react'
import LoggedInContainer from '../containers/LoggedInContainer'
import SingleSongCard from '../components/shared/SingleSongCard'
import { makeAuthGetReq } from '../components/utils/serverHelper'


export default function AllSongs() {
    const [songData, setSongData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const response = await makeAuthGetReq(
                "/song/get/allSongs"
            );
            setSongData(response.data);
        };
        getData();
    }, []);

    return (
        <LoggedInContainer currActiveScreen="allSongs">
            <div className='text-white fs-3 m-4 iconText'>All Songs</div>
            {songData.map((item) => {
                return <SingleSongCard info={item} playSound={() => { }} />;
            })}
        </LoggedInContainer>
    )
}
