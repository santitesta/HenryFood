const axios = require("axios")
const { Recipes, Diets } = require("../db")

// require('dotenv').config();
// const { apiKey } = process.env;

const URL = "https://rickandmortyapi.com/api"
// const URLcs = "https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&${apiKey}"

const fs = require('fs')
let jsonData = JSON.parse(fs.readFileSync('spoonacular.json', 'utf-8'))

async function getRecipe(req,res){
  try {
    // let recipes = (await axios.get(`${URLcs}&query=pasta`)).data.results

    // let recipes = (await axios.get(`${URL}/character`)).data.results
    // .map(e => {
    //   return {
    //     id: e.id,
    //     name: e.name,
    //     status: e.status,
    //     species: e.species,
    //     image: e.image
    //   }
    // })

    let recipes = jsonData.results

    let allRecipes = (await Recipes.findAll()).concat(recipes)

    res.send(allRecipes)
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