import './App.css';
import React, { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';
import { getAllDiets, getRecipes } from './redux/actions';

import Home from './components/Home.jsx'
import Create from './components/Create';
import Nav from './components/Nav.jsx'
import Details from './components/Details.jsx';
import Posts from './components/Posts.jsx'
import Pagination from './components/Pagination.jsx'

function App() {
  let dispatch = useDispatch()
  const [meal, setMeal] = useState([]);
  const [id, setId] = useState()

  const recipes = useSelector(state => state.recipes)
  
  useEffect(() => {
    dispatch(getAllDiets())
  }, [dispatch] )
  
  useEffect(() => {
    setMeal(recipes)
  }, [recipes] )
  
  // Can i delete posts and only use meal?
  useEffect(() => {
      setPosts(meal)
  }, [meal] );

  // * Store> *

  // Find recipes by name
  // Puedo pasar esta funcion solo a home? Si puedo, queda mejor ordenado?
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

  // Pagination
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="App">
      <Nav/>
      <Routes>
        <Route path="/" element={<Home 
        meal={meal} onSearch={onSearch} handleDetails={handleDetails} 
        posts={currentPosts} loading={loading} 
        postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate}
        />}/>
        {/* <Route path="/" element={<Home meal={meal} onSearch={onSearch} handleDetails={handleDetails}/>}/> */}
        <Route path="/create" element={<Create />}/>
        <Route path='/details' element={<Details id={id}/>}/>
        <Route path='/about' element={<>
          <Posts posts={currentPosts} loading={loading} />
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            paginate={paginate}
          />
        </>}/>
      </Routes>
    </div>
  );
}

export default App;