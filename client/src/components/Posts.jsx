import React from 'react';
import { NavLink } from 'react-router-dom';
import './Posts.css'

const Posts = ({ posts, loading, handleDetails }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  if(!posts.length) return <h1 className='testito'>No hay nada todavia reysito</h1>

  return (
    <ul>
      {posts.map(r => {
        return(
          <div key={r.id} className='meal'>
            <NavLink className='navlinktitle' to="/details" onClick={e => handleDetails(e.target.title)}>
              <p className='title' title={r.id}>{r.title}</p>
            </NavLink>
            <span className='spandiets'>{r.diets?.length?r.diets:'Not part of any diet'}</span>
            <NavLink className='navlinkimg' to="/details" onClick={e => handleDetails(e.target.title)}>
              <img className="imgbro" src={r.image} alt={r.name} width="312" height="231" title={r.id}/>
            </NavLink>
          </div>
      )})}
    </ul>
  );
};

export default Posts;