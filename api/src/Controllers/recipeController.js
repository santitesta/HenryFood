const axios = require("axios")
const { Recipes} = require("../db")

require('dotenv').config();
const { apiKey } = process.env;
const URLid = "https://api.spoonacular.com/recipes/"
const URLcs = `https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&apiKey=${apiKey}`

// !! Refactor getRecipe, API and DB separated
async function getRecipe(req,res){
  try {

    let query = req.query.query
    let recipesAPI = (await axios.get(`${URLcs}&query=${query}&number=90`)).data.results
    .map(e => {
      return {
        id: e.id,
        title: e.title,
        summary: e.summary,
        points: e.spoonacularScore,
        healthScore: e.healthScore,
        image: e.image,
        diets: e.diets
      }
    })

    let recipesfound = await Recipes.findAll({
      where: {
        name: query
      }
    })

    let allDiets = []

    for (let i = 0; i < recipesfound.length; i++) {
      let dietsfound = []
      let dietbro = await recipesfound[i].getDiets()
      for (let j = 0; j < dietbro.length; j++) {
        dietsfound.push(dietbro[j].dataValues.name)
      }
      allDiets.push(dietsfound)
    }

    recipesfound.map((r,index) => {
      r.dataValues.diets = allDiets[index]
    })

    if(!recipesfound.length && !recipesAPI.length) {
      return res.status(404).send('Recipe not found!')
    }
    if(recipesfound.length) {
      let allRecipes = recipesfound.concat(recipesAPI).slice(0,90)
      return res.json(allRecipes)
    } else {
      let allRecipes = recipesAPI
      return res.json(allRecipes)
    }

  } catch (error) {
    res.status(500).send(error)
  }
}

async function getRecipeById(req,res){
  const {id} = req.params;
  
  if(String(id).length > 7) {
    let recipedb = await Recipes.findOne({
      where: {
        id: id
      }
    })
    res.json(recipedb)
  } else {
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
          analyzedInstructions: response.data.analyzedInstructions
        }
        res.json(recipe)
      })
      .catch(error => res.status(400).send(error))
  }
}

async function createRecipe(req,res){
  const {name, summary, points, image, steps, healthScore, diet} = req.body
  let recipe = {name, summary, points, image, steps, healthScore}
  Recipes.create(recipe)
    .then(reci => reci.addDiets(diet))
    .then(reci => res.status(201).json(reci))
    .catch(error => res.status(500).send(error))
}

module.exports = {
  getRecipe,
  getRecipeById,
  createRecipe
}