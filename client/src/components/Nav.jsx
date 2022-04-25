import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css'

function Nav() {
    return (
        <nav className='navbar'>
            <NavLink className='b' to='/'>
              Home of Henry Foods
            </NavLink>
            <NavLink className='b' to='/create'>
              Create your recipe!
            </NavLink>
            <NavLink className='b' to='/mealdisplay'>
              Meal searching
            </NavLink>
        </nav>
    );
  };
  
  export default Nav;