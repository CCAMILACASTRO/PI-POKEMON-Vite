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

    if (name) { // si escribe un nombre buscar...

      let pokemonName = await getPokemonApiByName(name); //busca en la API

      if (pokemonName.error) { // si no se encontró el pokemon en la DB
        pokemonName = await getPokemonDbByName(name);
      }

      if (pokemonName.length) { // si hay coincidencia envia el pokemon encontrado
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

    if (isNaN(id)) {  //si el id es un numero busca el pokemon...
      pokemonId = await getPokemonsDbById(id); // busca en la base de datos
    } else {
      pokemonId = await getPokemonsApiById(id); // busca en la api.
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



pokemonRouter.post("/", async (req, res) => {
  //pokemon creado por el usuario en el formulario.
  try {
    const createPokemon = req.body; //envia los datos del formulario por body.

    console.log(createPokemon);
    const newPokemon = await postPokemon(createPokemon); //ejecuta la funcion para guardar los datos del nuevo pokemon
    if (newPokemon.error) return res.status(404).json(error.message);

    return res.status(200).json(newPokemon); // si sale todo bien envia el nuevo pokemon
  } catch (error) {
    //si hay algun error envia un mensaje de error.
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
