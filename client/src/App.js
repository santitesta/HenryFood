import './App.css';
import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";

import Home from './components/Home.jsx'
import Nav from './components/Nav.jsx'
import About from './components/About.jsx'
import Meal from './components/Meal.jsx'

function App() {
  //Busqueda en la API
  const [meal, setMeal] = useState({name: 'Facu'});
  // fetch(`https://api.spoonacular.com/recipes/complexSearch?query=pasta&apiKey=0c696dad87b44ab4992aff6e4ab24c8d`)
  //   .then(r => r.json())
  //   .then((res) => {
  //     meal = res.results[0].title
  //   })
  function onSearch() {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=London&appid=4ae2636d8dfbdc3044bede63951a019b&units=metric`)
      .then(r => r.json())
      .then(r => {
        let aux = {
          name: r.name,
          weather: r.weather[0].main
        }
        setMeal(aux);
      })
  }
  // let meal='Chicken nugget'
  console.log('Outside fetch: ' + meal)
  return (
    <div className="App">
      <Nav onSearch={onSearch}/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/About" element={<About />}/>
        <Route path='/Meal' element={<Meal meal={meal}/>}/>
      </Routes>
    </div>
  );
}

export default App;
