import React from 'react';
import './Pagination.css'

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className='paginationnav'>
      Navigation
      <div className='ulnav'>
        {pageNumbers.map(number => (
          <button key={number} onClick={() => paginate(number)}>
              {number}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Pagination;