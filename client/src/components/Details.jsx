import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './Details.css'

function Details({meal}) {
  const recipes = useSelector(state => state.recipes)
  let rec = recipes.filter(r => r.id == meal)[0]
  if (meal.length == 0) {
    return <p>How did you get here? Please send review! Anyways, come again with a recipe to get details!</p>
  }
  return (
    <>
      <NavLink to='/'>HOME BRODI</NavLink>
      <div className='container'>
        <h1>Those are the details of {rec.title}!</h1>
        <img src={rec.image} alt={`${rec.title} not found`} />
        <p>Dish types: {rec.dishTypes}</p>
        <p>Diets: {rec.diets.length?rec.diets:'Not part of any diet registered'}</p>
        <p>Summary: {rec.summary}</p>
        <p>Spoonacular score: {rec.spoonacularScore}</p>
        <p>Health score: {rec.healthScore}</p>
        <div className='steps'>
          {
            !rec?null:rec.analyzedInstructions[0].steps.map(s => {
              return (<p key={s.number}>Step {s.number}: {s.step}</p>)
            })
          }
        </div>
      </div>
    </>
  )
};
  
export default Details;