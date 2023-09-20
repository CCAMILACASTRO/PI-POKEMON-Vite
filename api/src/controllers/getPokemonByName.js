const axios = require('axios')
const { Pokemon, Type } = require('../db')
const URL = 'https://pokeapi.co/api/v2/pokemon/'


const getPokemonApiByName = async (name) => {

    try{
        const pokemonsApiName = await axios.get(`${URL}/${name}`.toLowerCase()); //insensible a mayusculas o minusculas

        if (pokemonsApiName) { //Si la respuesta de la api fue exitosa...

            let pokemon = pokemonsApiName; //guarda la informacion recibida en la variable pokemon

            return { //retorna un objeto creado con los datos del pokemon encontrado en la api
                id: pokemon.data.id,
                name: pokemon.data.name,
                image: pokemon.data.sprites.other.dream_world.front_default,
                types: pokemon.data.types.map((pokemon) => { return {name: pokemon.type.name}}),
                hp: pokemon.data.stats[0].base_stat,
                attack: pokemon.data.stats[1].base_stat,
                defense: pokemon.data.stats[2].base_stat,
                speed: pokemon.data.stats[3].base_stat,
                height: pokemon.data.height,
                weight: pokemon.data.weight,
            }; 

        }else {
            return null;
        }

    } catch(error){ // capta el error si no encontró un pokemon.
        return ({error});
    }
};

const getPokemonDbByName = async(name) => {
    try{
        const pokemonDbName = await Pokemon.findAll({ //busco en el modelo Pokemon por nombre
            where: {
                name: name.toLowerCase(), // insensible a mayusculas y minusculas.
                
              },
              include: {
                attributes: ["name"], //incluye informacion del modelo Type.
                model: Type,
                through: {
                    attributes: [],
                }

              },
        });

        return pokemonDbName; //retorna el pokemon encontrado junto con el tipo.
    } catch(error){  // capta el error si no encontró un pokemon.
        return error;
    }
}

module.exports = { getPokemonApiByName, getPokemonDbByName }