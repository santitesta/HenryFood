import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css'
import SearchBar from './SearchBar.jsx';

function Nav({onSearch}) {
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
          <SearchBar
            onSearch={onSearch}
          />
        </nav>
    );
  };
  
  export default Nav;