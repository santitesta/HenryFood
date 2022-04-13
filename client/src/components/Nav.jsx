import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css'

function Nav() {
    return (
        <nav className='navbar'>
          <li className='a'>
            <Link className='b' to='/'>
              Home of Henry Foods
            </Link>
          </li>
          <li className='a'>
            <Link className='b' to='/about'>
              About
            </Link>
          </li>
          <li className='a'>
            <Link className='b' to='/mealdisplay'>
              Meal searching
            </Link>
          </li>
        </nav>
    );
  };
  
  export default Nav;