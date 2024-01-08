import React from 'react'
import spotify_logo from "../../assets/images/spotify_logo_white.svg";
import TextIcon from '../shared/textIcon';
import { Icon } from '@iconify/react';
export default function sideBar() {
  return (
    <div>
        <div className='p-4 container'>
          <img src={spotify_logo} alt='spotify_logo' width={140}></img>
        </div>
        <div>
          <TextIcon iconName="ion:home-sharp" text="Home" active />
          <TextIcon iconName="iconamoon:search-bold" text="Search" />
          <TextIcon iconName="fluent:library-16-filled" text="Your Library" />
        </div>
        <div className='mt-4'>
          <TextIcon iconName="icon-park-solid:add" text="Create Playlist" />
          <TextIcon iconName="fluent-emoji:heart-decoration" text="Liked Songs" />
        </div>
        <div className='rounded-pill border border-secondary p-2 d-inline-block position-absolute bottom-0 my-5 mx-4'>
          <div className='d-flex'>
            <Icon icon="ic:baseline-language" color='white' width={20} />
            <div className='text-white mx-1' style={{ fontWeight: "500", fontSize: "0.87rem" }}>English</div>
          </div>
        </div>
    </div>
  )
}
