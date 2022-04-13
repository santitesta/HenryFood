import React from 'react';
import './Details.css'

function Details({meal}) {
  if (!meal) {
    return <p>Buscate algo raton</p>
  }
  return (
    <div className='tuvieja'>
      Those will be the details of {meal.name}... TBD
    </div>
  )
};
  
export default Details;