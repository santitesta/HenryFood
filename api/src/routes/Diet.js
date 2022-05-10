const { Router } = require('express');
const { createDiet, getDiets, chargeDiets } = require('../Controllers/dietController.js');
const router = Router();

router.get('/', getDiets)

router.post('/', createDiet)

module.exports = router;