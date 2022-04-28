const axios = require("axios")
const { Recipes, Diets } = require("../db")

require('dotenv').config();
const { apiKey } = process.env;
const URLid = "https://api.spoonacular.com/recipes/"
// const URLcs = "https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&${apiKey}"

const fs = require('fs')
let jsonData = JSON.parse(fs.readFileSync('spoonacular.json', 'utf-8'))

async function getRecipe(req,res){
  try {
    // let recipes = (await axios.get(`${URLcs}&query=${query}`)).data.results
    // .map(e => {
    //   return {
    //     id: e.id,
    //     name: e.name,
    //     summary: e.summary,
    //     points: e.points,
    //     image: e.image
    //   }
    // })

    let recipes = jsonData.results
    console.log(recipes)

    let allRecipes = (await Recipes.findAll()).concat(recipes)

    res.send(allRecipes)
  } catch (error) {
    console.log(error)
  }
}

async function getRecipeById(req,res){
  const {id} = req.params;
  await axios.get(`${URLid}${id}/information?apiKey=${apiKey}`)
    .then(response => {
      let recipe = {
        id: response.data.id,
        name: response.data.title,
        summary: response.data.summary,
        points: response.data.spoonacularScore,
        healthScore: response.data.healthScore,
        image: response.data.image,
        diets: response.data.diets,
        dishTypes: response.data.dishTypes,
        analyzedInstructions: response.data.analyzedInstructions,
      }
      res.send(recipe)
    })
    .catch(error => console.log(error))
}

async function createRecipe(req,res){
  const {name, summary, points, image, diet} = req.body
  let recipe = {name, summary, points, image}
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