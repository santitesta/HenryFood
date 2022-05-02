import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDiets } from "../redux/actions"

import Posts from './Posts';
import './Home.css'

function Home({
  allPosts, handleDetails, onSearch,
  posts, loading,
  currentPage, postsPerPage,paginate
}) {
  const dispatch = useDispatch();
  const diets = useSelector(state => state.diets)
  const [query, setQuery] = useState([])
  const [filtPosts, setFiltPosts] = useState([])

  useEffect(() => {
    dispatch(getAllDiets())
  }, [dispatch])

  useEffect(() => {
    setFiltPosts([])
  }, [allPosts])

  function handleSubmit(e) {
    e.preventDefault()
    if(query != '') {
      onSearch(query)
      setQuery('')
    }
  }

  function orderAlph() {
    setFiltPosts(posts.sort((a,b) => (a.title.toLowerCase() < b.title.toLowerCase()) ? 1 : -1))
  }

  function orderAlphRev() {
    setFiltPosts(posts.sort((a,b) => (a.title.toLowerCase() > b.title.toLowerCase()) ? 1 : -1))
  }

  function orderByPoints() {
    // setFiltPosts(posts.sort((a,b)=> a.spoonacularScore - b.spoonacularScore).reverse())
    setFiltPosts(posts.sort((a,b)=> a.points - b.points).reverse())
  }

  function orderByPointsRev() {
    // setFiltPosts(posts.sort((a,b)=> a.spoonacularScore - b.spoonacularScore))
    setFiltPosts(posts.sort((a,b)=> a.points - b.points))
  }

  function filterByDiet(e) {
    let d = e.target.value
    let newPosts = d => allPosts.filter(p => p.diets.includes(d.toLowerCase()))
    setFiltPosts(newPosts(d))
  }

  return (
      <>
        <div>
          <h1 className='home'>Welcome to Henry Foods PI</h1>
        </div>

        <div id='myForm' className='filters' onSubmit={e => handleSubmit(e)}><label className='filtertitle'>Filter your meal</label> <br />
          <div className='columnsfil'>
            <div>
              <input data-testid='search-button' className='inputquery' type="text"
                id="505"
                placeholder='Name...' 
                value={query} 
                onChange={e => setQuery(e.target.value)}/>
              <button onClick={e => handleSubmit(e)}>Filtrar bro</button>
            </div>

            <select name="diets" id="909" onChange={e => filterByDiet(e)}>
              <option defaultValue={true}>Filter by diet!</option>
              {diets.map(d => {
                return <option key={d.id} value={d.name}>{d.name}</option>
              })}
            </select>

            <label className='labelbro'>Order alphabetically
              <button className='filterdownAlph' onClick={orderAlphRev}>A-Z</button>
              <button className='filterupAlph' onClick={orderAlph}>Z-A</button>
            </label>

            <label className='labelbro'>Order by punctuation
              <button className='filterdownPoints' onClick={orderByPoints}>.</button>
              <button className='filterupPoints' onClick={orderByPointsRev}>.</button>
            </label>

          </div>
        </div>

        <br style={{backgroundColor: 'blue'}} />

        <Posts posts={filtPosts.length?filtPosts:posts} loading={loading} handleDetails={handleDetails}
          currentPage={currentPage}
          postsPerPage={postsPerPage}
          paginate={paginate}
        />

      </>
  );
};
  
export default Home;