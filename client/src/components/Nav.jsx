import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css'

function Nav() {
    return (
        <nav className='navbar'>
          <li className='a'>
            <NavLink className='b' to='/'>
              Home of Henry Foods
            </NavLink>
          </li>
          <li className='a'>
            <NavLink className='b' to='/create'>
              Create your recipe!
            </NavLink>
          </li>
          <li className='a'>
            <NavLink className='b' to='/mealdisplay'>
              Meal searching
            </NavLink>
          </li>
        </nav>
    );
  };
  
  export default Nav;