const axios = require("axios")
const { Recipes, Diets } = require("../db")

require('dotenv').config();
const { apiKey } = process.env;
const URLid = "https://api.spoonacular.com/recipes/"
const URLcs = `https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&apiKey=${apiKey}`

const fs = require('fs')
let jsonData = JSON.parse(fs.readFileSync('spoonacular.json', 'utf-8'))

async function getRecipe(req,res){
  try {
    // let query = req.query.query
    // let recipes = (await axios.get(`${URLcs}&query=${query}&number=90`)).data.results
    // .map(e => {
    //   return {
    //     id: e.id,
    //     title: e.title,
    //     summary: e.summary,
    //     points: e.spoonacularScore,
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
      res.send("Succesfully done!")
    })
    .catch(error => res.send('Cannot create recipe'))
}

module.exports = {
  getRecipe,
  getRecipeById,
  createRecipe
}