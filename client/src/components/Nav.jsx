import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css'
import SearchBar from './SearchBar.jsx';

function Nav({onSearch}) {
    return (
        <nav className='navbar'>
          <li className='a'>
            <Link to='/'>
              Home of Henry Foods
            </Link>
          </li>
          <li className='a'>
            <Link to='/about'>
              About
            </Link>
          </li>
          <li className='a'>
            <Link to='/meal'>
              Meal
            </Link>
          </li>
          <SearchBar
            onSearch={onSearch}
          />
        </nav>
    );
  };
  
  export default Nav;