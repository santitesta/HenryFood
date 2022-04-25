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
  // function onSearch(query) {
  //   fetch(`http://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=4ae2636d8dfbdc3044bede63951a019b&units=metric`)

  // function onSearch(mealSearch) {
  //   fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=0c696dad87b44ab4992aff6e4ab24c8d&addRecipeInformation=true`)
  //     .then(r => r.json())
  //     .then(r => {
  //       if(r.totalResults > 0) {
  //         // let aux = {
  //         //   name: r.results[0].title,
  //         //   img: r.results[0].image
  //         // }
  //         let aux = r.results
  //         setMeal(aux);
  //         document.getElementById("myForm").reset();
  //       } else {
  //         alert("That ain't a real meal!")
  //       }
  //     })
  // }

  function handleDetails(title) {
    setMeal([title])
  }

  return (
    <div className="App">
      <Nav/>
      <Routes>
        {/* <Route path="/" element={<Home handleDetails={handleDetails} onSearch={onSearch}/>}/> */}
        <Route path="/" element={<Home handleDetails={handleDetails} />}/>
        <Route path="/create" element={<Create />}/>
        <Route path='/details' element={<Details meal={meal}/>}/>
        {/* <Route path="/About" element={<About />}/>
        <Route path='/MealDisplay' element={<MealDisplay meal={meal} onSearch={onSearch}/>}/>*/
        }
      </Routes>
    </div>
  );
}

export default App;