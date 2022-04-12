import React from 'react';
import './MealDisplay.css'

function MealDisplay({meals}) {
  if (!meals) {
    return <p></p>
  }
  return (
    <div className='eldiv'>
      <ol>
        <li>{meals.name}</li>
        <li><img src={meals.img} alt="img not found" /></li>
      </ol>
    </div>
  )
};
  
export default MealDisplay;