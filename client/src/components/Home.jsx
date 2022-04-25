import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllRecipes } from "../redux/actions"
import './Home.css'

// export function validate(input) {
//   let errors = {};
//   if (!input.username) {
//     errors.username = 'Username is required';
//   } else if (!/\S+@\S+\.\S+/.test(input.username)) {
//     errors.username = 'Username is invalid';
//   }
//   if (!input.password) {
//     errors.password = 'Password is required';
//   } else if ((!/(?=.*[0-9])/.test(input.password))) {
//     errors.password = 'Password is invalid';
//   }
//   return errors;
// };

function Home({handleDetails}) {
  const dispatch = useDispatch();
  const recipes = useSelector(state => state.recipes) //When an action is dispatched, useSelector() will do a reference comparison of the previous selector result value and the current result value. If they are different, the component will be forced to re-render. If they are the same, the component will not re-render.
  //Con useSelector traigo el estado global. Con useEffect, afecto al componente por su estado local.
  useEffect(() => {
    dispatch(getAllRecipes())
  }, [dispatch])

  const [query, setQuery] = useState([])

  console.log(recipes)
  
  function handleChange(e) {
  let q = recipes.filter(r => r.title.toLowerCase().includes(e.target.value.toLowerCase()))
  if(q.length) setQuery(q)
  else {
    setQuery([])
    alert('No search like that, try again')
    let inp = document.getElementById('505')
    inp.value = ''
    }
  }

  // function handleSubmit(e) {
  // e.preventDefault()
  // // if(errors.name || errors.status) return alert('Wrong data!')
  // let newRec = {...recipes, diet: dietrec.map(d => parseInt(d))}
  // dispatch(createRecipe(newRec))
  // }

  return (
      <>
        <h1 className='home'>Welcome to Henry Foods PI</h1>
        
        <form type='submit' className='filters'>Filters
          <br />
          <input type="text" id="505" placeholder='Name...' onChange={e => handleChange(e)}/>
        </form>
        <br />
        <div className={query.length === 1?'bro2':'bro'}>
        {
          !query.length?recipes && recipes.map(r => {
            return(
              <div key={r.id} className='meal'>
                <NavLink to="/details" onClick={e => handleDetails(e.target.title)}>
                  <p className='title' title={r.id}>{r.title}</p>
                </NavLink>
                <br />
                <NavLink to="/details" onClick={e => handleDetails(e.target.title)}>
                  <img className="imgbro" src={r.image} alt={r.name} width="312" height="231" title={r.id} />
                </NavLink>
              </div>
            )
          })
          :query.map(r => {
            return(
              <div key={r.id} className='meal'>
                <NavLink to="/details" onClick={e => handleDetails(e.target.title)}>
                  <p className='title' title={r.id}>{r.title}</p>
                </NavLink>
                <br />
                <NavLink to="/details" onClick={e => handleDetails(e.target.title)}>
                  <img className="imgbro" src={r.image} alt={r.name} width="312" height="231" title={r.id} />
                </NavLink>
              </div>
            )
          })
        }
        </div>
      </>
  );
};
  
export default Home;