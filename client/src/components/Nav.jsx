import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css'

function Nav() {
    return (
        <nav className='navbar'>
          <Link to='/'>
            Home of Henry Foods
          </Link>
          <Link to='/about'>
            About
          </Link>
          <Link to='/meal'>
            Meal
          </Link>
        </nav>
    );
  };
  
  export default Nav;