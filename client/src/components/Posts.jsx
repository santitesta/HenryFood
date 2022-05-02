import React from 'react';
import { NavLink } from 'react-router-dom';
import './Posts.css'

import Pagination from './Pagination';

const Posts = ({ posts, loading, handleDetails, currentPage, postsPerPage, paginate }) => {
  //Returns of incomplete searchs
  if (loading) return <h2>Loading...</h2>;
  if(!posts.length) return <h1 className='testito'>Look after a meal! They will display here</h1>

  // Different quantity of columns depending on post quantities. TBD: Set CSS property 'ColumnCount'
  let contClass = 'postscont3'
  if(posts.lenght <= 3 || posts.length == 5 || posts.length ==7) {
    contClass = 'postscont1'
  } else if(posts.length == 4 || posts.length == 8) {
    contClass = 'postscont2'
  }

  return (
    <>
      <div className={contClass}>
        {posts.map(r => {
          return(
            <div key={r.id} className='post'>
              <NavLink className='navlinktitle' to="/details" onClick={e => handleDetails(e.target.title || e.target.name)}>
                <p className='postTitle' title={r.id}>{r.title || r.name}</p>
              </NavLink>
              <NavLink className='navlinkimg' to="/details" onClick={e => handleDetails(e.target.title)}>
                <img className='postImg' src={r.image} alt={r.name} title={r.id}/>
              </NavLink>
              <span className='postDiets'>{r.diets?.length?<p>{r.diets.join('-')}</p>:<p>Not part of any diet</p>}</span>
            </div>
        )})}
      </div>
      <Pagination
        posts={posts}
        currentPage={currentPage}
        postsPerPage={postsPerPage}
        paginate={paginate}
      />
    </>
  );
};

export default Posts;