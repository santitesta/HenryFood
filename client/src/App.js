import './App.css';
import React, { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";

import Home from './components/Home.jsx'
import Create from './components/Create';
import Nav from './components/Nav.jsx'
import Details from './components/Details.jsx';
import Posts from './components/Posts.jsx'
import Pagination from './components/Pagination.jsx'
import axios from 'axios';
// import About from './components/About.jsx'
// import MealDisplay from './components/MealDisplay.jsx';

function App() {
  //Busqueda en la API
  const [meal, setMeal] = useState([]);
  const [id, setId] = useState()

  // Find recipes by name
  // Puedo pasar esta funcion solo a home? Si puedo, queda mejor ordenado?
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

  // Details id
  function handleDetails(title) {
    setId(title)
  }

  // Pagination
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    // Luego de setMeal en onSearch, tengo todo en el estado meal y lo paso a los posts
    // setPosts(meal)

    const fetchPosts = async () => {
      setLoading(true);
      // const res = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=pasta&apiKey=0c696dad87b44ab4992aff6e4ab24c8d&addRecipeInformation=true`);
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      // setPosts(res.data.results);
      setPosts(res.data);
      setLoading(false);
    };

    fetchPosts();
  }, []);

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