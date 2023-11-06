const axios = require('axios')
const { Pokemon, Type } = require('../db')
const URL = 'https://pokeapi.co/api/v2/pokemon/'


const getPokemonApiByName = async (name) => {

    try{
        const pokemonsApiName = await axios.get(`${URL}/${name}`.toLowerCase()); 

        if (pokemonsApiName) { 

            let pokemon = pokemonsApiName; 

            return [{ 
                id: pokemon.data.id,
                name: pokemon.data.name,
                image: pokemon.data.sprites.other.dream_world.front_default,
                Types: pokemon.data.types.map((pokemon) => { return {name: pokemon.type.name}}),
                hp: pokemon.data.stats[0].base_stat,
                attack: pokemon.data.stats[1].base_stat,
                defense: pokemon.data.stats[2].base_stat,
                speed: pokemon.data.stats[3].base_stat,
                height: pokemon.data.height,
                weight: pokemon.data.weight,
            }]; 

        }else {
            return null;
        }

    } catch(error){ 
        return ({error});
    }
};

const getPokemonDbByName = async(name) => {
    try{
        const pokemonDbName = await Pokemon.findAll({ 
            where: {
                name: name.toLowerCase(), 
              },
              include: {
                attributes: ["name"], 
                model: Type,
                through: {
                    attributes: [],
                }

              },
        });

        return pokemonDbName; 
    } catch(error){  
        return null;
    }
}

module.exports = { getPokemonApiByName, getPokemonDbByName }