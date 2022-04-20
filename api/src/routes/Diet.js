const { Router } = require('express');
const { createDiet, getDiets, chargeDiets } = require('../Controllers/dietController.js');
const router = Router();

// router.get('/', getRecipe)

// router.get('/:id', getRecipeById)

router.post('/', createDiet)

module.exports = router;