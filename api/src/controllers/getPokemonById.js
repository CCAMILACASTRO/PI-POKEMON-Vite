const axios = require('axios')
const URL = 'https://pokeapi.co/api/v2/pokemon/'
const { Pokemon, Type } = require('../db')


//Busca un pokemon de la API segun su id.
const getPokemonsApiById = async (id) => {
    
    try{
        const pokemonApiId = await axios.get(`${URL}/${id}`);

        if (pokemonApiId) { 
           
            let pokemon = pokemonApiId; 

            return { //objeto con los datos especificos del pokemon.
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


//Busca un pokemon de la DB segun su id.
const getPokemonsDbById = async(id) => {

    try {
        const pokemonDbId = await Pokemon.findOne({   //Busca por id y si y por id del modelo Type.
            where: { id: id},
            include: [{ 
                attributes: ['name'],
                model: Type,
                through: {
                    attributes: [],
                }
            }]
        })
        return pokemonDbId; //retorna el pokemon encontrado + tipo

    } catch (error) {
        return null;
    }
}

module.exports = { getPokemonsApiById, getPokemonsDbById }