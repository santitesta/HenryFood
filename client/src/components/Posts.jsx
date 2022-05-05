import React from 'react';
import { NavLink } from 'react-router-dom';
import './Posts.css'

import Pagination from './Pagination';

const Posts = ({ currentPosts, allPosts, loading, handleDetails, currentPage, postsPerPage, paginate }) => {
  //Returns of incomplete searchs
  if (loading) return <h2>Loading...</h2>;
  if(!currentPosts.length) return <h1 className='testito'>Look after a meal! They will be displayed here</h1>

  // Different quantity of columns depending on post quantities. TBD: Set CSS property 'ColumnCount'
  let contClass = 'postscont3'
  if(currentPosts.lenght <= 3 || currentPosts.length == 5 || currentPosts.length ==7) {
    contClass = 'postscont1'
  } else if(currentPosts.length == 4 || currentPosts.length == 8) {
    contClass = 'postscont2'
  }

  return (
    <>
      <div className={contClass}>
        {currentPosts.map(r => {
          return(
            <div key={r.id} className='post'>
              <NavLink className='navlinktitle' to="/details" onClick={e => handleDetails(e.target.title || e.target.name)}>
                <p className='postTitle' title={r.id}>{r.title || r.name}</p>
              </NavLink>
              <NavLink className='navlinkimg' to="/details" onClick={e => handleDetails(e.target.title)}>
                <img className='postImg' src={r.image} alt={r.name} title={r.id}/>
              </NavLink>
              <span className='postDiets'>{r.diets?.length?<p>Diets: {r.diets.join('-')}</p>:<p>Diets: none</p>}</span>
            </div>
        )})}
      </div>
      <Pagination
        currentPosts={currentPosts}
        allPosts={allPosts}
        currentPage={currentPage}
        postsPerPage={postsPerPage}
        paginate={paginate}
      />
    </>
  );
};

export default Posts;