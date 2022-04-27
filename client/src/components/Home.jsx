import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllRecipes } from "../redux/actions"
import './Home.css'
// import MealDisplay from './MealDisplay';

function Home({meal, handleDetails, onSearch}) {
  const dispatch = useDispatch();
  const recipes = useSelector(state => state.recipes) //When an action is dispatched, useSelector() will do a reference comparison of the previous selector result value and the current result value. If they are different, the component will be forced to re-render. If they are the same, the component will not re-render.
  //Con useSelector traigo el estado global. Con useEffect, afecto al componente por su estado local.
  useEffect(() => {
    dispatch(getAllRecipes())
  }, [dispatch])

  const [query, setQuery] = useState([])
  // const [diet, setDiet] = useState([])

  function handleSubmit(e) {
    e.preventDefault()
    // if(errors.name || errors.status) return alert('Wrong data!')
    onSearch(query)
  }
  
  return (
      <>
        <div>
          <h1 className='home'>Welcome to Henry Foods PI</h1>
        </div>

        <form id='myForm' className='filters' onSubmit={e => handleSubmit(e)}><label className='filtertitle'>Filter your meal</label> <br />
          <div className='columnsfil'>
            <input className='inputquery' type="text" 
              id="505"
              placeholder='Name...' 
              value={query} 
              onChange={e => setQuery(e.target.value)}/>
            <button type='submit'>Filtrar bro</button>
            <label className='labelbro'>Order alphabetically
              <button className='filterup'/>
              <button className='filterdown'/>
            </label>
            <label className='labelbro'>Order by punctuation
              <button className='filterup'/>
              <button className='filterdown'/>
            </label>
          </div>
        </form>

        <br />

        <div className='bro'>
          {/* <MealDisplay meal={query} onSearch={onSearch}/> */}

          {
            meal && meal.map(r => {
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
              )
            })
          }

        </div>

      </>
  );
};
  
export default Home;