// const axios = require("axios")
// const URL = "https://rickandmortyapi.com/api"
const { Diets } = require('../db')

apiDiets = [{
  id:1,
  name: 'Gluten Free'
},
{ id:2,
  name: 'Ketogenic'
},
{ id:3,
  name: 'Vegetarian'
},
{ id:4,
  name: 'Lacto-Vegetarian'
},
{ id:5,
  name: 'Ovo-Vegetarian'
},
{ id:6,
  name: 'Vegan'
},
{ id:7,
  name: 'Pescetarian'
},
{ id:8,
  name: 'Paleo'
},
{ id:9,
  name: 'Primal'
},
{ id:10,
  name: 'Low FODMAP'
},
{ id:11,
  name: 'Whole30'
}]

async function getDiets(req,res){
  let diets = await Diets.findAll()
  console.log(diets)
  res.send(diets)
}

async function createDiet(req,res,next){
  try {
    const {name} = req.body
    return Diets.create({name})
      .then(console.log('Diet loaded!'))
      .then(res.send('Diet loaded!'))
  } catch (error) {
    next(error)
  }
}

async function chargeDiets(req,res){
  return Diets.bulkCreate(apiDiets)
  .then(response => console.log('API Diets loaded'))
  .catch(error => console.log(error))
}

module.exports = {
  getDiets,
  createDiet,
  chargeDiets
}