const express = require('express')
const typeRouter = express.Router()
const { getAllTypes } = require('../controllers/getTypes');

typeRouter.get('/', async (req, res) => {
    try {
      
      const allTypes = await getAllTypes(); // para obtener tipos desde la base de datos o de la api.
      
      return res.status(200).json(allTypes);
       
      } catch (error) {
        return res.status(500).json({error: error.message})
      }
})




module.exports = typeRouter;