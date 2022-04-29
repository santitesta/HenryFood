import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDiets } from "../redux/actions"

import './Home.css'

import Pagination from './Pagination';
import Posts from './Posts';

function Home({
  meal, handleDetails, onSearch,
  posts, loading,
  postsPerPage,totalPosts,paginate
}) {
  const dispatch = useDispatch();
  const diets = useSelector(state => state.diets)
  const [query, setQuery] = useState([])
  const [postss, setPostss] = useState([])


  // console.log('Posts: ',posts)
  // console.log('Postss: ',postss)
  // console.log('Points: ',posts.map(e => e.points))
  // console.log('Pointssss: ',postss.map(e => e.points))
  // console.log('Points: ',posts.map(e => e.spoonacularScore))
  // console.log('Pointssss: ',postss.map(e => e.spoonacularScore))

  useEffect(() => {
    dispatch(getAllDiets())
  }, [dispatch])

  function handleSubmit(e) {
    e.preventDefault()
    if(query != '') {
      onSearch(query)
      setQuery('')
    }
  }

  function orderAlph() {
    setPostss(posts.sort((a,b) => (a.title.toLowerCase() < b.title.toLowerCase()) ? 1 : -1))
  }

  function orderAlphRev() {
    setPostss(posts.sort((a,b) => (a.title.toLowerCase() > b.title.toLowerCase()) ? 1 : -1))
  }

  function orderByPoints() {
    // setPostss(posts.sort((a,b)=> a.spoonacularScore - b.spoonacularScore).reverse())
    setPostss(posts.sort((a,b)=> a.points - b.points).reverse())
  }
  
  function orderByPointsRev() {
    // setPostss(posts.sort((a,b)=> a.spoonacularScore - b.spoonacularScore))
    setPostss(posts.sort((a,b)=> a.points - b.points))
  }
  
  function filterPosts() {
    posts.sort()
  }

  return (
      <>
        <div>
          <h1 className='home'>Welcome to Henry Foods PI</h1>
        </div>

        <form id='myForm' className='filters' onSubmit={e => handleSubmit(e)}><label className='filtertitle'>Filter your meal</label> <br />
          <div className='columnsfil'>
            <div>
              <input className='inputquery' type="text"
                id="505"
                placeholder='Name...' 
                value={query} 
                onChange={e => setQuery(e.target.value)}/>
              <button type='submit'>Filtrar bro</button>
            </div>

            <select name="diets" id="909" onChange={e => filterPosts(e)}>
              <option defaultValue={true}>Filter by diet!</option>
              {diets.map(d => {
                return <option key={d.id} value={d.id}>{d.name}</option>
              })}
            </select>

            <label className='labelbro'>Order alphabetically
              <button className='filterdownAlph' onClick={orderAlphRev}>A-Z</button>
              <button className='filterupAlph' onClick={orderAlph}>Z-A</button>
            </label>

            <label className='labelbro'>Order by punctuation
              <button className='filterdownPoints' onClick={orderByPoints}/>
              <button className='filterupPoints' onClick={orderByPointsRev}/>
            </label>

            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={totalPosts}
              paginate={paginate}
            />
          </div>
        </form>

        <br />

        {/* <div className='bro'> */}
        <div className='bro'>
          {/* <MealDisplay meal={query} onSearch={onSearch}/> */}
          <Posts posts={postss.length?postss:posts} loading={loading} handleDetails={handleDetails} />
        </div>

      </>
  );
};
  
export default Home;