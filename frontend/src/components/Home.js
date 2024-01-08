import React from 'react'
import Navbar from './shared/Navbar';
import Sidebar from './shared/sideBar';
import Cards from './shared/Cards';

export default function Home() {
  return (
    <div className='h-100 w-100 d-flex .font-poppins position-relative'>
      <div className='w-25 d-flex-col' style={{ backgroundColor: "#1c1c1c" }}>
        <Sidebar />
      </div>
      <div className='w-75 overflow-auto' style={{ backgroundColor: "#1b1919" }}>
        <Navbar />
        <div className='mb-4'><Cards /></div>
      </div>
    </div>
  )
}
