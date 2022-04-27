import './App.css';
import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";

import Home from './components/Home.jsx'
import Create from './components/Create';
import Nav from './components/Nav.jsx'
import Details from './components/Details.jsx';
// import About from './components/About.jsx'
// import MealDisplay from './components/MealDisplay.jsx';

function App() {
  //Busqueda en la API
  const [meal, setMeal] = useState([]);
  const [id, setId] = useState()

  function onSearch(query) {
    // 20 results search
    // fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=0c696dad87b44ab4992aff6e4ab24c8d&addRecipeInformation=true&number=20`)
    // 10 results search
    fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=0c696dad87b44ab4992aff6e4ab24c8d&addRecipeInformation=true`)
      .then(r => r.json())
      .then(r => {
        if(r.totalResults > 0) {
          let aux = r.results
          setMeal(aux);
          document.getElementById("myForm").reset();
        } else {
          alert("That ain't a real meal!")
        }
      })
  }

  function handleDetails(title) {
    setId(title)
  }

  return (
    <div className="App">
      <Nav/>
      <Routes>
        <Route path="/" element={<Home meal={meal} onSearch={onSearch} handleDetails={handleDetails}/>}/>
        <Route path="/create" element={<Create />}/>
        <Route path='/details' element={<Details id={id}/>}/>
        {/* <Route path="/About" element={<About />}/>
        <Route path='/MealDisplay' element={<MealDisplay meal={meal} onSearch={onSearch}/>}/>*/
        }
      </Routes>
    </div>
  );
}

export default App;