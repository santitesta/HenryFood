import React from 'react';
import { Link } from 'react-router-dom';
import './MealDisplay.css'
import SearchBar from './SearchBar.jsx'

function MealDisplay({meal, onSearch}) {
  if (!meal) {
    return <SearchBar onSearch={onSearch}/>
  }
  return (
    <div>
      <SearchBar onSearch={onSearch}/>
        {meal.map(m => <div className='eldiv')}
        <p>{meal.name}</p>
        <p><img src={meal.img} alt="img not found" /></p>
        <Link className='d' to='/details'>Details!</Link>
    </div>
  )
};
  
export default MealDisplay;

// export default function Cards({cities, onClose}) {
//   return (
//     <div className='cards'>
//       {cities.map(c => <Card
//           key={c.id}
//           id={c.id}
//           max={c.max}
//           min={c.min}
//           name={c.name}
//           img={c.img}
//           onClose={() => onClose(c.id)}
//         /> )}
//     </div>
//   );