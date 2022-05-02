import React from 'react';
import './Pagination.css'

const Pagination = ({ posts, postsPerPage, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(posts / postsPerPage); i++) {
    pageNumbers.push(i);
  }  

  return (
    <nav className='paginationnav'>
      Pagination
      <div className='ulnav'>
        {pageNumbers.map(number => (
          <button key={number} className={currentPage==number?'activePage':null} onClick={() => paginate(number)}>
              {number}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Pagination;