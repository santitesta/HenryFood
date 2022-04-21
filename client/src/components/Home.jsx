import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipes } from "../redux/actions"

function Home() {
  const dispatch = useDispatch();
  const recipes = useSelector(state => state.recipes) //When an action is dispatched, useSelector() will do a reference comparison of the previous selector result value and the current result value. If they are different, the component will be forced to re-render. If they are the same, the component will not re-render.
  //Con useSelector traigo el estado global. Con useEffect, afecto al componente por su estado local.
  useEffect(() => {
    dispatch(getAllRecipes())
  }, [dispatch])
    return (
        <div>
          <h1>Welcome to Henry Foods PI</h1>
          {
            recipes && recipes.map(r => {
              return(
                <div key={r.id}>
                  <p>{r.name}</p>
                  <img src={r.image} alt={r.name} />
                </div>
              )
            })
          }
        </div>
    );
  };
  
  export default Home;