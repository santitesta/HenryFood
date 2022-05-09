import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getRecipeById } from '../redux/actions';
import './Details.css'

function Details({id}) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    async function newIp(id) {
      setLoading(true)
      await dispatch(getRecipeById(id))
      setLoading(false)
    } 
    newIp(id)
  },[dispatch,id])

  const recipe = useSelector(state => state.recipe)

  if(!id) {
    return <p>How did you get here? Please send review! Anyways, come again with a recipe to get details!</p>
  }

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <NavLink to='/home'>Return</NavLink>
      {
      !Object.keys(recipe).length?<h1>Loading...</h1>
      :<div className='container'>
        <h1>Those are the details of {recipe.name}!</h1>
        <img src={recipe.image} alt={`${recipe.name} not found`} />
        <p>Dish types: {recipe.dishTypes}</p>
        <p>Diets: {recipe.diets?recipe.diets:'Not part of any diet registered'}</p>
        <p>Summary: {recipe.summary}</p>
        <p>Spoonacular score: {recipe.spoonacularScore}</p>
        <p>Health score: {recipe.healthScore}</p>
        <div className='steps'>
          {
            String(id).length > 7?<p>Steps for a database recipe: {recipe.steps}</p>
            :recipe.analyzedInstructions[0].steps.map(s => {
              return (<p key={s.number}>Step {s.number}: {s.step}</p>)
            })
          }
        </div>
      </div>
      }
    </>
  )
};
  
export default Details;