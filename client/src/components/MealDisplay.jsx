import React from 'react';
import './MealDisplay.css'

function MealDisplay({meals}) {
  return (
    <div>
      <ol>
        <li>{meals.name}</li>
        <li><img src={meals.img} alt="img not found" /></li>
      </ol>
    </div>
  )
};
  
export default MealDisplay;