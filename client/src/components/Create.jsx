import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createRecipe, getAllDiets } from "../redux/actions"
import './Create.css'
import { validate } from '../Misc/validate'

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
    if(Object.keys(errors).length) {
      return alert('The form is not completed right')
    }
    let newRec = {...recipe, diet: dietrec.map(d => parseInt(d))}
    console.log(newRec)
    dispatch(createRecipe(newRec))
    document.getElementById('101').reset()
  }

  function handleChange(e) {
    let item = e.target.name

    if(item === 'name' || item === 'points' || item === 'healthness') {
      setErrors(validate({...recipe, [item]:e.target.value }, item))
      setRecipe({...recipe, [item]:e.target.value})
    } else {
      setRecipe({...recipe, [item]:e.target.value})
    }
  }

  function handleDiets(e) {
    if(e.target.value == 0) return;
    if (!dietrec.includes(e.target.value)) {
      setDietrec([...dietrec, e.target.value])
    }
  }

  function handleDelete(e) {
    e.preventDefault()
    //There's a problem comparing strings to number in ids: 1 != '1'
    setDietrec(dietrec.filter(d => d != e.target.value))
  }

  return (
      <div className='condet'>
        <form type="submit" className='form1' id='101'>

          <div className='minicont'>
            <div className='errorsadd'>
              <label>Name</label>
              <input className='inputsc' onChange={e => handleChange(e)} type="text" id='' name='name' placeholder='Name your recipe...' />
              {errors.name?<p className='errors'>{errors.name}</p>:<p/>}
            </div>
          </div>

          <br />

          <div className='minicont'>
            <div className='errorsadd'>
              <label>Summary</label>
              <input className='summaryinp' onChange={e => handleChange(e)} type='text' name='summary' placeholder='Whats the deal?...'/>
              {errors.summary?<p className='errors'>{errors.summary}</p>:<p/>}
            </div>
          </div>

          <br />

          <div className='minicont'>
            <div className='errorsadd'>
              <label>Score</label>
              <input className='inputsc' onChange={e => handleChange(e)} type="number" id='' name='points' placeholder='Score out of 100...' />
              {errors.points?<p className='errors'>{errors.points}</p>:<p/>}
            </div>
          </div>

          <div className='minicont'>
            <div className='errorsadd'>
              <label>Healthness</label>
              <input className='inputsc' onChange={e => handleChange(e)} type="number" id='' name='healthness' placeholder='Score out of 100...' />
              {errors.healthness?<p className='errors'>{errors.healthness}</p>:<p/>}
            </div>
          </div>

          <br />
          <div className='minicont'>
            <div className='errorsadd'>
              <label>Image</label>
              <input className='inputsc' onChange={e => handleChange(e)} type="text" id='' name='image' placeholder='Insert image as url...' />
              <p/>
            </div>
          </div>

          <br />

          {
            !diets?null:<div className='minicont'>
              <div className='errorsadd'>
                <label>Diets</label>
                <select className='inputsc' name='diets' onChange={e => handleDiets(e)}>
                  <option defaultValue={true} value={0}>Choose your diet!</option>
                  {diets.map(d => {
                    return <option key={d.id} value={d.id} className={dietrec.includes(`${d.id}`)?'dietchose':'dietunchose'}>
                      {d.id}.{d.name}
                    </option>
                  })}
                </select>
                <p/>
              </div>
            </div>
          }

          <div className='minicont'>
            <span>Steps</span>
          </div>

          {
            !dietrec.length?<div className='minicont'><div className='delete'><p>No diets chosen</p></div></div>:<div className='minicont'>
              <div className='delete'>
                {dietrec.map(d => {
                  return (<div key={d}>
                    <span>{d}</span>
                    <button value={d} onClick={e => handleDelete(e)}>X</button>
                  </div>)
                })}
              </div>
            </div>
          }

          <div className='minicont'>
            <textarea name="steps" id="" cols="40" rows="7" onChange={e => handleChange(e)}></textarea>
          </div>

          <button className='submitbutton' type="submit" onClick={e => handleSubmit(e)}>
            Create Recipe!
          </button>
          
        </form>
      </div>
  );
};

export default Create;