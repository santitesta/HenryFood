import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createRecipe, getAllDiets } from "../redux/actions"
import './Create.css'

function Create() {
  const dispatch = useDispatch();
  const diets = useSelector(state => state.diets)

  useEffect(() => {
    dispatch(getAllDiets())
  }, [dispatch])

  const [recipe, setRecipe] = useState({
    name: "",
    status: "Salado mi bro",
    species: "",
    img: "",
  })

  const [dietRec, setDietRec] = useState([])

  function handleSubmit(e) {
    e.preventDefault()
    // if(errors.name || errors.status) return alert('Wrong data!')
    let newRec = {...recipe, diet: dietRec}
    dispatch(createRecipe(newRec))
  }

  function handleChange(event) {
    setRecipe({...recipe, [event.target.name]:[event.target.value]})
  }

  function handleDiets(e) {
    if(e.target.value == 0) return;
    if (!dietRec.includes(e.target.value)) {
      setDietRec([...dietRec, e.target.value])
    } else return alert('This diet was already included')
  }

  function handleDelete(e) {
    setDietRec(dietRec.filter(d => d !== e.target.value))
  }

    return (
        <div>
          <form type="submit">
            <label>Name: <input onChange={e => handleChange(e)} type="text" id='' name='name' placeholder='Name your recipe...' /></label>
            <br />
            <label>Status<select onChange={e => handleChange(e)} name='status'>
              <option defaultValue={true}>Salado mi bro</option>
              <option >Dulzón mi pana</option>
            </select>
            </label>
            <br />
            <label>Species: <input onChange={e => handleChange(e)} type="text" id='' name='species' placeholder='Fill the specie...' /></label>
            <br />
            <label>Image: <input onChange={e => handleChange(e)} type="text" id='' name='image' placeholder='Insert image as url...' /></label>
            <br />
            {
              !diets?null:<label>Diets: <select name='diets' onChange={e => handleDiets(e)}>
                <option defaultValue={true} value={0}>Choose your diet!</option>
                {diets.map(d => {
                  return <option key={d.id} value={d.id} className={dietRec.includes(`${d.id}`)?'dietchose':'dietunchose'}>
                    {d.name}
                  </option>
                })}
                </select>
              </label>
            }
            {
              !dietRec?null:dietRec.map(d => {
                return (<div key={d}>
                  <span>{d}</span>
                  <button value={d.id} onClick={e => handleDelete(e)}>X</button>
                </div>)
              })
            }
            <br />
            <button type="submit" onClick={e => handleSubmit(e)}>
              Create Recipe!
            </button>
          </form>
          <p>Here you gonna charge your own recipe</p>
        </div>
    );
  };
  
  export default Create;