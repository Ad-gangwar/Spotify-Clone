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
                    <div className='mobile-hidden'>{info.name}</div>
                    <div className='mobile-hidden'>{info.artist.firstName+" "+info.artist.lastName}</div>
                    {/* Mobile version - show truncated text */}
                    <div className='d-block d-md-none' style={{ fontSize: '0.9rem' }}>
                        <div>{info.name.length > 20 ? info.name.slice(0, 20) + "..." : info.name}</div>
                        <div style={{ fontSize: '0.8rem', color: '#ada5a5' }}>{info.artist.firstName+" "+info.artist.lastName}</div>
                    </div>
                </div>

            </div>
            <div className='d-flex align-items-center'>
                <Icon icon="ant-design:heart-outlined" width={25} className='mx-4 mobile-hidden' />
                <div className='mx-4 mobile-hidden'>3:44</div>
                <Icon icon="tabler:dots" width={25} className='mx-4' />
            </div>
        </div>
    )
}
