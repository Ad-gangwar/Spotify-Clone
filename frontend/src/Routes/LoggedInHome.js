import React, { useState } from 'react'
import Cards from '../components/shared/Cards';
import LoggedInContainer from '../containers/LoggedInContainer';


export default function Home() {
  return <LoggedInContainer currActiveScreen="home">
    <Cards/>
  </LoggedInContainer>
}

