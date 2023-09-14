const { Router } = require('express');
// Importar todos los routers;
const pokemonRouter = require('./pokemonRouter')
const typeRouter = require('./typeRouter')

// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/pokemons', pokemonRouter );

router.use('/types', typeRouter )


module.exports = router;
