import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDiets } from "../redux/actions"

import Posts from './Posts';
import './Home.css'
import { personalSorts } from '../Misc/sort'

function Home({
  currentPosts, allPosts, 
  handleDetails, onSearch, loading,
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

  function handleFilter(e) {
    switch (e.target.name) {
      case 'alph':
        setFiltPosts(personalSorts.orderAlph(currentPosts))
        break;
      case 'alphrev':
        setFiltPosts(personalSorts.orderAlphRev(currentPosts))
        break;
      case 'points':
        setFiltPosts(personalSorts.orderByPoints(currentPosts))
        break;
      case 'pointsrev':
        setFiltPosts(personalSorts.orderByPointsRev(currentPosts))
        break;
      case 'diets':
        setFiltPosts(personalSorts.filterByDiet(currentPosts,e.target.value))
        break;
    }
  }

  return (
      <div className='mainhome'>

        <div id='myForm' className='filters' onSubmit={e => handleSubmit(e)}>
          <label className='filtertitle'>Filter your meal</label> 

          <div className='columnsfil'>
            <div>
              <input data-testid='search-button' className='inputquery' type="text"
                id="505"
                placeholder='Name...' 
                value={query} 
                onChange={e => setQuery(e.target.value)}/>
              <button className='querybtn' onClick={e => handleSubmit(e)}>.</button>
            </div>

            <select name="diets" id="909" onChange={e => handleFilter(e)}>
              <option defaultValue={true}>Filter by diet!</option>
              {diets.map(d => {
                return <option key={d.id} value={d.name}>{d.name}</option>
              })}
            </select>

            <label className='labelbro'>Order alphabetically
              <button name='alph' className='filterdownAlph' onClick={e => handleFilter(e)}>A-Z</button>
              <button name='alphrev' className='filterupAlph' onClick={e => handleFilter(e)}>Z-A</button>
            </label>

            <label className='labelbro'>Order by punctuation
              <button name='points' className='filterdownPoints' onClick={e => handleFilter(e)}>.</button>
              <button name='pointsrev' className='filterupPoints' onClick={e => handleFilter(e)}>.</button>
            </label>

          </div>
        </div>

        <div className='derecha'>
          <div className='banner'>aber</div>

          <Posts currentPosts={filtPosts.length?filtPosts:currentPosts}
            allPosts={allPosts}
            loading={loading} handleDetails={handleDetails}
            currentPage={currentPage}
            postsPerPage={postsPerPage}
            paginate={paginate}
          />
        </div>

      </div>
  );
};
  
export default Home;