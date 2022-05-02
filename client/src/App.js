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
  
  const recipes = useSelector(state => state.recipes)

    // Pagination
  // const [posts, setPosts] = useState([]);
  let [loading, setLoading] = useState(false);
  let [currentPage, setCurrentPage] = useState(1);
  let [postsPerPage] = useState(9);

  // Get current posts
  let indexOfLastPost = currentPage * postsPerPage;
  let indexOfFirstPost = indexOfLastPost - postsPerPage;
  let currentPosts = meal.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);
  
  // This is for future improvements, like creating diets
  useEffect(() => {
    dispatch(getAllDiets())
  }, [dispatch] )
  
  useEffect(() => {
    if(recipes[0] === 'empty') {
      return alert("Couldn't find that meal")
    }
    setMeal(recipes)
  }, [recipes] )

  useEffect(() => {
    setCurrentPage(1)
    currentPosts = meal.slice(indexOfFirstPost, indexOfLastPost)
  },[meal])
  // * Store> *

  // Find recipes by name
  async function onSearch(query) {
    setLoading(true)
    await dispatch(getRecipes(query))
    setLoading(false)
  }

  // Details id
  function handleDetails(title) {
    console.log('Inside handleDetails: ',title)
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
        allPosts={meal} posts={currentPosts} loading={loading} 
        currentPage={currentPage} postsPerPage={postsPerPage} paginate={paginate}
        />}/>
        <Route path="/create" element={<Create />}/>
        <Route path='/details' element={<Details id={id}/>}/>
      </Routes>
    </div>
  );
}

export default App;