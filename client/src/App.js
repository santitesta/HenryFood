import './App.css';
import Home from './components/Home.jsx'
import Nav from './components/Nav.jsx'
import About from './components/About.jsx'
import Meal from './components/Meal.jsx'
import { Routes, Route } from "react-router-dom";

function App() {
  //Busqueda en la API
  let meal='Chicken nugget'
  return (
    <div className="App">
      <Nav/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/About" element={<About />}/>
        <Route path='/Meal' element={<Meal meal={meal}/>}/>
      </Routes>
    </div>
  );
}

export default App;
