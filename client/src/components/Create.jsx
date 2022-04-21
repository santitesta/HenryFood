import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDiets } from "../redux/actions"

function Create() {
  const dispatch = useDispatch();
  const diets = useSelector(state => state.diets)

  useEffect(() => {
    dispatch(getAllDiets())
  }, [dispatch])

  function handleSubmit() {

  }

    return (
        <div>
          <form onSubmit={handleSubmit}>
            <label>Name: <input type="text" id='' name='name' placeholder='Name your recipe...' /></label>
            <br />
            <label>Status<select >
              <option defaultValue={true}>Salado mi bro</option>
              <option >Dulzón mi pana</option>
            </select>
            </label>
            <br />
            <label>Species: <input type="text" id='' name='species' placeholder='Fill the specie...' /></label>
            {
              !diets?null:<label>Diets: <select>
                <option defaultValue={true}>Choose your diet!</option>
                {diets.map((d,i) => {
                  return <option value={d.id}>{d.name}</option>
                })}
                </select>
              </label>
            }
          </form>
          <p>Here you gonna charge your own recipe</p>
        </div>
    );
  };
  
  export default Create;