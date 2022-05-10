const { Router } = require('express');

const Recipe = require('./Recipe')
const Diet = require('./Diet')

const router = Router();

router.use('/recipe', Recipe)

router.use('/diet', Diet)

module.exports = router;