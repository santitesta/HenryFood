import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createRecipe, getAllDiets } from "../redux/actions"
import './Create.css'

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

  return (
      <div className='condet'>
        <form type="submit" className='form1'>

          <div className='minicont'>
            <label>Name</label>
            <input className='inputsc' onChange={e => handleChange(e)} type="text" id='' name='name' placeholder='Name your recipe...' />
          </div>

          <br />

          <div className='minicont'>
            <label>Status</label>
            <select className='listsc' onChange={e => handleChange(e)} name='status'>
              <option defaultValue={true}>Salado mi bro</option>
              <option >Dulzón mi pana</option>
            </select>
          </div>

          <br />

          <div className='minicont'>
            <label>Species</label>
            <input className='inputsc' onChange={e => handleChange(e)} type="text" id='' name='species' placeholder='Fill the specie...' />
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
          <br />
          <button className='submitbutton' type="submit" onClick={e => handleSubmit(e)}>
            Create Recipe!
          </button>
        </form>
      </div>
  );
};

export default Create;