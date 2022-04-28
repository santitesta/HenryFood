import React from 'react';
import './Pagination.css'

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className='paginationnav'>
    {pageNumbers.map(number => (
        <button key={number} onClick={() => paginate(number)}>
            {number}
        </button>
        ))}
    </nav>
  );
};

export default Pagination;