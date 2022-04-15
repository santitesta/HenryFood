const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/recipe', async (req,res) =>{
  let recipe = (await fetch('https://rickandmortyapi.com/api/character')).info.count
  console.log(recipe)
  res.send('Bro')
})

module.exports = router;
