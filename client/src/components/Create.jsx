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

  const [dietrec, setDietrec] = useState([])

  function handleSubmit(e) {
    e.preventDefault()
    // if(errors.name || errors.status) return alert('Wrong data!')
    let newRec = {...recipe, diet: dietrec.map(d => parseInt(d))}
    dispatch(createRecipe(newRec))
  }

  function handleChange(event) {
    setRecipe({...recipe, [event.target.name]:event.target.value})
  }

  function handleDiets(e) {
    console.log('entro a handle diets: e.target: ',e.target,'e.target.value: ',e.target.value )
    if(e.target.value == 0) return;
    if (!dietrec.includes(e.target.value)) {
      setDietrec([...dietrec, e.target.value])
    } else return alert('This diet was already included')
  }

  function handleDelete(e) {
    e.preventDefault()
    console.log('entro al delete, target value: ',e.target.value)
    console.log('dietrec: ',dietrec)
    //There's a problem comparing strings to number in ids: 1 != '1'
    setDietrec(dietrec.filter(d => d != e.target.value))
  }

  console.log(dietrec)

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
                  return <option key={d.id} value={d.id} className={dietrec.includes(`${d.id}`)?'dietchose':'dietunchose'}>
                    {d.name}
                  </option>
                })}
                </select>
              </label>
            }
            {
              !dietrec?null:dietrec.map(d => {
                return (<div key={d}>
                  <span>{d}</span>
                  <button value={d} onClick={e => handleDelete(e)}>X</button>
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