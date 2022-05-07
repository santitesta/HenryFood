import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Posts from './Posts';
import './Home.css'

import { personalSorts } from '../Misc/sort'

function Home({
  onSearch, handleDetails,
  allPosts, loading
}) {
  const diets = useSelector(state => state.diets)

  const [query, setQuery] = useState([])
  const [filtPosts, setFiltPosts] = useState([])
  const [currentPosts, setCurrentPosts] = useState([])
  // Filt posts es un array, por eso no detecta cambios, a menos que sea en su length. Chequear

  console.log('Home render')
  // Pagination
  let [currentPage, setCurrentPage] = useState(1);
  let postsPerPage = 9
  // Get current posts. Set posts per page
  let indexOfLastPost = currentPage * postsPerPage;
  let indexOfFirstPost = indexOfLastPost - postsPerPage;

  useEffect(() => {
    console.log('filtPosts has changed')
  }, [filtPosts])

  useEffect(() => {
    setCurrentPosts(filtPosts.length
      ?filtPosts.slice(indexOfFirstPost, indexOfLastPost)
      :allPosts.slice(indexOfFirstPost, indexOfLastPost))
  }, [filtPosts, currentPage])
  
  // let currentPosts = filtPosts.lenght
  // ?filtPosts.slice(indexOfFirstPost, indexOfLastPost)
  // :allPosts.slice(indexOfFirstPost, indexOfLastPost)

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

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
    e.preventDefault()
    let aux = []
    if(filtPosts.length){
      filtPosts.forEach(element => {
      aux.push(element)
    })};
    switch (e.target.name) {
      case 'alph':
        setFiltPosts(personalSorts.orderAlph(filtPosts.length?aux:allPosts))
        break;
      case 'alphrev':
        setFiltPosts(personalSorts.orderAlphRev(filtPosts.length?aux:allPosts))
        break;
      case 'points':
        setFiltPosts(personalSorts.orderByPoints(filtPosts.length?aux:allPosts))
        break;
      case 'pointsrev':
        setFiltPosts(personalSorts.orderByPointsRev(filtPosts.length?aux:allPosts))
        break;
      case 'diets':
        setFiltPosts(personalSorts.filterByDiet(filtPosts.length?aux:allPosts,e.target.value))
        break;
      default:
        setFiltPosts([])
        break;
    }
  }

  return (
      <div className='mainhome'>

        <div id='myForm' className='filters' onSubmit={e => handleSubmit(e)}>
          <label className='filtertitle'>Filters</label> 

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
              <div className='filtbn'>
                <button name='alph' className='filterdownAlph' onClick={e => handleFilter(e)}>A-Z</button>
                <button name='alphrev' className='filterupAlph' onClick={e => handleFilter(e)}>Z-A</button>
              </div>
            </label>

            <label className='labelbro'>Order by punctuation
              <div className='filtbn'>
                <button name='points' className='filterdownPoints' onClick={e => handleFilter(e)}>.</button>
                <button name='pointsrev' className='filterupPoints' onClick={e => handleFilter(e)}>.</button>
              </div>
            </label>

          </div>
        </div>

        <div className='derecha'>
          <div className='banner'>aber</div>

          <Posts 
            handleDetails={handleDetails} 
            allPosts={allPosts} currentPosts={currentPosts} loading={loading} 
            currentPage={currentPage} postsPerPage={postsPerPage} paginate={paginate}
          />
          {/* <Posts 
            handleDetails={handleDetails} 
            allPosts={allPosts} currentPosts={filtPosts.length?filtPosts:currentPosts} loading={loading} 
            currentPage={currentPage} postsPerPage={postsPerPage} paginate={paginate}
          /> */}
        </div>

      </div>
  );
};
  
export default Home;