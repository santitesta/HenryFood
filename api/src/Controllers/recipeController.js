const axios = require("axios")
const URL = "https://rickandmortyapi.com/api"

async function getRecipe(req,res){
  try {
    // let recipe = (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=pasta&apiKey=${apiKey}&addRecipeInformation=true`)).data
   
    
    let recipe = (await axios.get(`${URL}/character`)).data.results
    .map(e => {
      return {
        id: e.id,
        name: e.name,
        status: e.status,
        species: e.species,
        image: e.image
      }
    })
    res.send(recipe)
    // fetch('https://rickandmortyapi.com/api/character') // why doesnt it work???
    //   .then(r => r.json())
    //   .then(data => {
    //     res.send(data.results)
    //   })
  } catch (error) {
    console.log(error)
  }
}

function getRecipeById(req,res){
  const {id} = req.params; 
  axios.get(`${URL}/character/${id}`)
    .then(response => {
      let recipe = {
        id: response.data.id,
        name: response.data.name,
        status: response.data.status,
        species: response.data.species,
        image: response.data.image
      }
      res.send(recipe)
    })
    .catch(error => console.log(error))
}

module.exports = {
  getRecipe,
  getRecipeById
}