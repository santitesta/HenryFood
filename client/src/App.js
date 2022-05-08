import './App.css';
import React, { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';
import { getAllDiets, getRecipes } from './redux/actions';

import Home from './components/Home.jsx'
import Create from './components/Create';
import Nav from './components/Nav.jsx'
import Details from './components/Details.jsx';

function App() {
  let dispatch = useDispatch()
  const [meal, setMeal] = useState([]);
  const [id, setId] = useState()
  let [loading, setLoading] = useState(false);
  
  const recipes = useSelector(state => state.recipes)
  
  // This is for future improvements, like creating diets
  // useEffect(() => {
  //   dispatch(getAllDiets())
  // }, [dispatch] )
  useEffect(() => {
    dispatch(getAllDiets())
  }, [] )
  
  useEffect(() => {
    if(recipes[0] === 'empty') {
      return alert("Couldn't find that meal")
    }
    setMeal(recipes)
  }, [recipes] )

  // * Store> *

  // Find recipes by name
  async function onSearch(query) {
    setLoading(true)
    await dispatch(getRecipes(query))
    setLoading(false)
  }

  // Details id
  function handleDetails(title) {
    setLoading(true)
    setId(title)
    setLoading(false)
  }

  return (
    <div className="App">
      <Nav/>
      <Routes>
        <Route path="/" element={<Home 
        onSearch={onSearch} handleDetails={handleDetails} 
        allPosts={meal} loading={loading} 
        />}/>
        {/* <Route path="/" element={<Home 
        onSearch={onSearch} handleDetails={handleDetails} 
        allPosts={meal} currentPosts={currentPosts} loading={loading} 
        currentPage={currentPage} postsPerPage={postsPerPage} paginate={paginate}
        />}/> */}
        <Route path="/create" element={<Create />}/>
        <Route path='/details' element={<Details id={id}/>}/>
      </Routes>
    </div>
  );
}

export default App;