import React from 'react';
import { NavLink } from 'react-router-dom';
import './Posts.css'

import Pagination from './Pagination';

const Posts = ({
  handleDetails,
  allPosts, currentPosts, loading,
  currentPage, postsPerPage, paginate
}) => {
  //Returns of incomplete searchs
  if (loading) return <h2>Loading...</h2>;
  if(!currentPosts.length) return <h1 className='testito'>Look after a meal! They will be displayed here</h1>

  console.log('Posts render')
  return (
    <>
      <div className='postscont'>
        {currentPosts.map(r => {
          return(
            <div key={r.id} className='post'>
              <NavLink className='navlinkimg' to="/details" onClick={e => handleDetails(e.target.title)}>
                <img className='postImg' src={r.image} alt={r.name} title={r.id}/>
              </NavLink>
              <NavLink className='navlinktitle' to="/details" onClick={e => handleDetails(e.target.title || e.target.name)}>
                <p className='postTitle' title={r.id}>{r.title || r.name}</p>
              </NavLink>
              <span className='postDiets'>{r.diets?.length?<p>{r.diets.join(' - ')}</p>:<p>Diets: none</p>}</span>
            </div>
        )})}
      </div>
      <Pagination
        allPosts={allPosts}
        currentPage={currentPage}
        postsPerPage={postsPerPage}
        paginate={paginate}
      />
    </>
  );
};

export default Posts;