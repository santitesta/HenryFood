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

  // Pagination
  let [currentPage, setCurrentPage] = useState(1);
  let postsPerPage = 9
  // Get current posts. Set posts per page
  let indexOfLastPost = currentPage * postsPerPage;
  let indexOfFirstPost = indexOfLastPost - postsPerPage;

  useEffect(() => {
    setCurrentPosts(filtPosts.length
      ?filtPosts.slice(indexOfFirstPost, indexOfLastPost)
      :allPosts.slice(indexOfFirstPost, indexOfLastPost))
  }, [filtPosts, currentPage, allPosts, indexOfFirstPost, indexOfLastPost])

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

  console.log('Points list: ')
  filtPosts.forEach(e => console.log('Points: ',e.healthScore))
  console.log('Minutes list: ')
  filtPosts.forEach(e => console.log('Points: ',e.readyInMinutes))

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
      case 'readyInMinutes':
        setFiltPosts(personalSorts.filterByMinutes(filtPosts.length?aux:allPosts))
      case 'readyInMinutesRev':
        setFiltPosts(personalSorts.filterByMinutesRev(filtPosts.length?aux:allPosts))  
      default:
        setFiltPosts([])
        break;
    }
  }

  return (
      <div className='mainhome'>
        <h1 className='mainhometitle'>Welcome to every chef dream!</h1>
        <div className='banner'/>


        <div className='display'>
          <form id='myForm' className='filters' onSubmit={e => handleSubmit(e)}>
            <label className='filtertitle'></label> 

            <div className='columnsfil'>
              <div className='mainsearch'>
                <input data-testid='search-button' className='inputquery' type="text"
                  id="505"
                  placeholder='Name...' 
                  value={query}
                  onChange={e => setQuery(e.target.value)}/>
                <button tpye='submit' className='querybtn' onClick={e => handleSubmit(e)}>.</button>
              </div>

              <select className='filtdiets' name="diets" id="909" onChange={e => handleFilter(e)}>
                <option defaultValue={true}>Filter by diet!</option>
                {diets.map(d => {
                  return <option key={d.id} value={d.name}>{d.name}</option>
                })}
              </select>

              <label className='orderlabel'>Order alphabetically
                <div className='filtbn'>
                  <button name='alph' className='filterdownAlph' onClick={e => handleFilter(e)}>A-Z</button>
                  <button name='alphrev' className='filterupAlph' onClick={e => handleFilter(e)}>Z-A</button>
                </div>
              </label>

              <label className='orderlabel'>Order by health score
                <div className='filtbn'>
                  <button name='points' className='filterdownPoints' onClick={e => handleFilter(e)}>.</button>
                  <button name='pointsrev' className='filterupPoints' onClick={e => handleFilter(e)}>.</button>
                </div>
              </label>

              <label className='orderlabel'>Order by minutes
                <div className='filtbn'>
                  <button name='readyInMinutes' className='filterdownPoints' onClick={e => handleFilter(e)}>.</button>
                  <button name='readyInMinutesRev' className='filterupPoints' onClick={e => handleFilter(e)}>.</button>
                </div>
              </label>

            </div>
          </form>

          <Posts 
            handleDetails={handleDetails} 
            allPosts={filtPosts.length?filtPosts:allPosts} currentPosts={currentPosts} loading={loading} 
            currentPage={currentPage} postsPerPage={postsPerPage} paginate={paginate}
          />
        </div>

      </div>
  );
};
  
export default Home;