const axios = require("axios")
const URL = "https://rickandmortyapi.com/api"
const {Diets, Recipes} = require('../db')

async function getDiets(req,res,next){
  try {
    let diets = (await axios.get(`${URL}/episode`)).data.results
      .map(e => {
        return {
          id: e.id,
          name: e.name
        }
      })
      return diets;
  } catch (error) {
    next(error)
  }
}

async function chargeDiets(req,res){
  let diets = await getDiets()
  return Diets.bulkCreate(diets)
    // .then(response => res.send(response))
    .then(response => console.log('Diets loaded'))
    .catch(error => console.log(error))
}

module.exports = {
  getDiets,
  chargeDiets
}