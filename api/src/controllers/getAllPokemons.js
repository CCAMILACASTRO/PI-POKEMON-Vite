const axios = require('axios')
const URL = 'https://pokeapi.co/api/v2/pokemon/'
const { Pokemon, Type } = require('../db')


//Trae los pokemones de la Api con la informacion necesaria.
const getPokemonsApi = async () => {
    const pokemonsApi = [];

    try {
        const response = await axios.get(`${URL}?limit=151`); //1281 
        const results = response.data.results 

        const arrayPromises = results.map((promesa) => axios.get(promesa.url)); 

        const pokemons = await Promise.all(arrayPromises);

        pokemonsApi.push(
            ...pokemons.map((pokemon) => ({ 
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
            }))
        );
    } catch (error) { 
        return error;
    }

    return pokemonsApi; 
}


//Trae los pokemones de la DB con la informacion necesaria.
const getPokemonsDb = async () => {
    try{
        const pokemonsDb = await Pokemon.findAll({ 
            include:[{ 
                attributes: ["name"],
                model: Type,
                through: { 
                    attributes: [],
                },
            }]
        });

        return pokemonsDb; 
    } catch(error){ 
        return error;
    }
}


const getAllPokemons = async () => {
    try {
        let apiPokemons = await getPokemonsApi(); 
        let dbPokemons = await getPokemonsDb(); 
        return apiPokemons.concat(dbPokemons); //retorna pokemons api + pokemons db.
    } catch (error) { 
        return error;
    }
};

module.exports = { getAllPokemons }