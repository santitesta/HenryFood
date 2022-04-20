import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipes } from "../redux/actions"

function Home() {
  const dispatch = useDispatch();
  const recipes = useSelector(state => state.recipes)
  useEffect(() => {
    dispatch(getAllRecipes())
  }, [dispatch])
    return (
        <div>
          <h1>Welcome to Henry Foods PI</h1>
          {
            recipes && recipes.map(r => {
              return(
                <div>
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