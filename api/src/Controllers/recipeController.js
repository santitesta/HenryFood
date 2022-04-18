const axios = require("axios")
const URL = "https://rickandmortyapi.com/api"
const {Recipes, Diets} = require("../db")

async function getRecipe(req,res){
  try {
    // let recipe = (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=pasta&apiKey=${apiKey}&addRecipeInformation=true`)).data
    let recipes = (await axios.get(`${URL}/character`)).data.results
    .map(e => {
      return {
        id: e.id,
        name: e.name,
        status: e.status,
        species: e.species,
        image: e.image
      }
    })

    let allRecipes = (await Recipes.findAll()).concat(recipes)
    // console.log("Database Recipes: ", dbRecipes[0]?.dataValues)

    res.send(allRecipes)
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

async function createRecipe(req,res,next){
  const {name, status, species, img, diet} = req.body
  let recipe = {name, status, species, img}
  Recipes.create(recipe)
    .then(resp => {
      resp.addDiets(diet)
      res.send("Recetas cargadas padre")
    })
    .then(recipe => console.log(recipe))
    .catch(error => console.log(error))
}

module.exports = {
  getRecipe,
  getRecipeById,
  createRecipe
}