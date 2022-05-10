import './App.css';
import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';
import { getAllDiets, getRecipes } from './redux/actions';

import Nav from './components/Nav.jsx'
import Landing from './components/Landing.jsx'
import Home from './components/Home.jsx'
import Create from './components/Create';
import Details from './components/Details.jsx';
import NotFound from './components/NotFound';

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

  const {pathname} = useLocation()
  return (
    <div className="App">
      {pathname === '/'?null:<Nav/>}
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path="/home" element={<Home 
        onSearch={onSearch} handleDetails={handleDetails} 
        allPosts={meal} loading={loading} 
        />}/>
        <Route path="/create" element={<Create />}/>
        <Route path='/details' element={<Details id={id}/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;