const { Router } = require('express');
const { getRecipe, getRecipeById } = require('../Controllers/recipeController');
const router = Router();

router.get('/', getRecipe)

router.get('/:id', getRecipeById)

module.exports = router;