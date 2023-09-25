const axios = require('axios')
const URL = 'https://pokeapi.co/api/v2/pokemon/'
const { Pokemon, Type } = require('../db')


const getPokemonsApiById = async (id) => {
    
    try{
        const pokemonApiId = await axios.get(`${URL}/${id}`);

        if (pokemonApiId) { //Si la respuesta de la api fue exitosa...
           
            let pokemon = pokemonApiId; //guarda la informacion recibida en la variable pokemon

            return { //retorna un objeto creado con los datos del pokemon encontrado en la api
                id: pokemon.data.id,
                name: pokemon.data.name,
                image: pokemon.data.sprites.other.dream_world.front_default,  // url imagen
                Types: pokemon.data.types.map((pokemon) => { return {name: pokemon.type.name}}),
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
    } catch(error){
        return ({error});
    }   
};


const getPokemonsDbById = async(id) => {

    try {
        const pokemonDbId = await Pokemon.findOne({   //Busca en la base de datos por id y si coincide con el id del modelo Type.
            where: { id: id},
            include: [{ //incluye informacion del modelo Type.
                attributes: ['name'],
                model: Type,
                through: {
                    attributes: [],
                }
            }]
        })
        return pokemonDbId; //retorna el pokemon encontrado junto con el tipo.

    } catch (error) {
        return null;
    }
}

module.exports = { getPokemonsApiById, getPokemonsDbById }