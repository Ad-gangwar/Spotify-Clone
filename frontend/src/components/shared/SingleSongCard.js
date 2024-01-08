import React from 'react'
import { Icon } from '@iconify/react';
import { useContext } from 'react';
import songContext from '../../contexts/songContext';

export default function SingleSongCard({info, playSound}) {
    const {currentSong, setCurrentSong} = useContext(songContext);

    return (
        <div className='d-flex text-white rounded justify-content-between song-box m-4 cursor-pointer' onClick={()=>{
            setCurrentSong(info);
        }}>
            <div className='d-flex flex-row h-25'>
                <img src={info.thumbnail} alt=" " height="50rem" width="50rem" className='mx-2 my-2'/>
                <div className='mx-3 my-1'>
                    <div>{info.name}</div>
                    <div>{info.artist.firstName+" "+info.artist.lastName}</div>
                </div>

            </div>
            <div className='d-flex align-items-center'>
                <Icon icon="ant-design:heart-outlined" width={25} className='mx-4' />
                <div className='mx-4'>3:44</div>
                <Icon icon="tabler:dots" width={25} className='mx-4' />
            </div>
        </div>
    )
}
