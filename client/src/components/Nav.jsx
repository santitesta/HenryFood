import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css'
import SearchBar from './SearchBar.jsx';

function Nav({onSearch}) {
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
            <Link className='b' to='/meal'>
              Meal
            </Link>
          </li>
          <li>
            <SearchBar
              onSearch={onSearch}
            />
          </li>
        </nav>
    );
  };
  
  export default Nav;