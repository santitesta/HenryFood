import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createRecipe, getAllDiets } from "../redux/actions"
import './Create.css'

function validate(input, item) {
  let errors = {}
  console.log(Number(input.points))

  if(item === 'name') {
    if(!input.name) errors.name = 'Must have a name'
  }

  if(item === 'points') {
    // if(typeof(input.name) !== 'number' && input.value >= 0 && input.value <= 100) {
    if(Number(input.points) < 0 || Number(input.points) > 100) {
      errors.points = 'Must be a number between 0 and 100'
    }
  }

  return errors
}

function Create() {
  const dispatch = useDispatch();
  const diets = useSelector(state => state.diets)

  useEffect(() => {
    dispatch(getAllDiets())
  }, [dispatch])

  const [recipe, setRecipe] = useState({})
  const [dietrec, setDietrec] = useState([])
  const [errors, setErrors] = useState({});

  function handleSubmit(e) {
    e.preventDefault()
    // if(errors.name || errors.status) return alert('Wrong data!')
    let newRec = {...recipe, diet: dietrec.map(d => parseInt(d))}
    dispatch(createRecipe(newRec))
  }

  function handleChange(e) {
    let item = e.target.name

    if(item === 'name') {
      setErrors(validate({...recipe, [item]:e.target.value }, item))
      setRecipe({...recipe, [item]:e.target.value})
    }

    if(item === 'points') {
      setErrors(validate({...recipe, [item]:e.target.value }, item))
      setRecipe({...recipe, [item]:e.target.value})
    }

  }

  function handleDiets(e) {
    if(e.target.value == 0) return;
    if (!dietrec.includes(e.target.value)) {
      setDietrec([...dietrec, e.target.value])
    } else return alert('This diet was already included')
  }

  function handleDelete(e) {
    e.preventDefault()
    //There's a problem comparing strings to number in ids: 1 != '1'
    setDietrec(dietrec.filter(d => d != e.target.value))
  }

  return (
      <div className='condet'>
        <form type="submit" className='form1'>

          <div className='minicont'>
            <label className={errors.name?'nashe':null}>Name</label>
            <input className='inputsc' onChange={e => handleChange(e)} type="text" id='' name='name' placeholder='Name your recipe...' />
          </div>

          <br />

          <div className='minicont'>
            <label>Summary</label>
            <input className='inputsc' onChange={e => handleChange(e)} name='summary' placeholder='Whats the deal?...'/>
          </div>

          <br />

          <div className='minicont'>
            <label>Score</label>
            <input className='inputsc' onChange={e => handleChange(e)} type="number" id='' name='points' placeholder='Score out of 100...' />
          </div>

          <div className='minicont'>
            <label>Healthness</label>
            <input className='inputsc' onChange={e => handleChange(e)} type="text" id='' name='healthness' placeholder='Score out of 100...' />
          </div>

          <br />
          <div className='minicont'>
            <label>Image</label>
            <input className='inputsc' onChange={e => handleChange(e)} type="text" id='' name='image' placeholder='Insert image as url...' />
          </div>

          <br />

          {
            !diets?null:<div className='minicont'>
              <label>Diets</label>
              <select className='listsc' name='diets' onChange={e => handleDiets(e)}>
                <option defaultValue={true} value={0}>Choose your diet!</option>
                {diets.map(d => {
                  return <option key={d.id} value={d.id} className={dietrec.includes(`${d.id}`)?'dietchose':'dietunchose'}>
                    {d.name}
                  </option>
                })}
              </select>
            </div>
          }
          {
            !dietrec?null:<div className='minicont'>
              {dietrec.map(d => {
                return (<div key={d}>
                  <span>{d}</span>
                  <button value={d} onClick={e => handleDelete(e)}>X</button>
                </div>)
              })}
            </div>
          }

          <div className='minicont'>
            {Object.keys(errors).length?<h4>Fix those before creating: </h4>:<h4>Free to go</h4>}
          </div>

          <div className='minicont'>
            <h4>{errors.name?errors.name:'Alright!'}</h4>
          </div>

          <button className='submitbutton' type="submit" onClick={e => handleSubmit(e)}>
            Create Recipe!
          </button>
          
        </form>
      </div>
  );
};

export default Create;