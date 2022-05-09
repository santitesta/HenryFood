import React from 'react';
import { NavLink } from 'react-router-dom';
import './Landing.css'

function Landing() {
  return (
    <div className='landing'>
      <h3 className='henrytitle'>Henry Bootcamp</h3>
      <h1 className='landingtitle'>Individual Project - Foods!</h1>
      <NavLink className='landingLinkHome' to='/home'>Begin cooking!</NavLink>
    </div>
  );
};

export default Landing;