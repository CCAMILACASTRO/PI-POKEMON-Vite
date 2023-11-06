const express = require("express");
const pokemonRouter = express.Router();
const { getAllPokemons } = require("../controllers/getAllPokemons");
const { getPokemonsApiById, getPokemonsDbById } = require("../controllers/getPokemonById");
const { getPokemonApiByName, getPokemonDbByName } = require("../controllers/getPokemonByName");
const { postPokemon } = require("../controllers/postPokemon");
const { deletePokemon } = require("../controllers/deletePokemon");


pokemonRouter.get("/", async (req, res) => {
  try {

    const { name } = req.query;

    if (name) { 

      let pokemonName = await getPokemonApiByName(name); 

      if (pokemonName.error) { 
        pokemonName = await getPokemonDbByName(name);
      }

      if (pokemonName.length) { 
        res.status(200).send(pokemonName);
      } else {
        res.status(404).json({message: `No se encontró un Pokémon con el nombre: ${name}`});
      }

    } else { 
      let allPokemons = await getAllPokemons();
      return res.status(200).send(allPokemons);
    }

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});



pokemonRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    let pokemonId = null;

    if (isNaN(id)) { 
      pokemonId = await getPokemonsDbById(id); 
    } else {
      pokemonId = await getPokemonsApiById(id); 
    }

    if (pokemonId.error) {
      return res.status(404).json({message: `No se encontró un Pokemon con el siguiente id: ${id}`});
    } else {
      return res.status(200).json(pokemonId);
    }

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});


//pokemon creado por el usuario en el formulario.
pokemonRouter.post("/", async (req, res) => {
  
  try {
    const createPokemon = req.body; 

    const newPokemon = await postPokemon(createPokemon); 
    
    if (newPokemon.error) return res.status(404).json(error.message);

    return res.status(200).json(newPokemon); 
    
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
});



pokemonRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const pokemonDeleted = await deletePokemon(id);

    if (pokemonDeleted.error) return res.status(404).json(pokemonDeleted.error);

    return res.status(200).json(pokemonDeleted);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
});

module.exports = pokemonRouter;
