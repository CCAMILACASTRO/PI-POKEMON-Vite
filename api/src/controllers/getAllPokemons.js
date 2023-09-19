const axios = require('axios')
const URL = 'https://pokeapi.co/api/v2/pokemon/'
const { Pokemon, Type } = require('../db')

const getPokemonsApi = async () => {
    const pokemonsApi = [];

    try {
        const response = await axios.get(`${URL}?limit=151`); //almacena en response el resultado de la solicitud a la api.
        const results = response.data.results; //objeto con info del pokemon que viene de la api.

        const arrayPromises = results.map((promesa) => axios.get(promesa.url)); // detalles individuales de cada pokemon.

        const pokemons = await Promise.all(arrayPromises); //espera que se completen todas las solicitudes individuales.

        pokemonsApi.push(
            ...pokemons.map((pokemon) => ({ //desestructurar un arreglo de objetos y crear una nueva lista de objetos.
                id: pokemon.data.id,
                name: pokemon.data.name,
                image: pokemon.data.sprites.other.dream_world.front_default, // url imagen
                types: pokemon.data.types.map((pokemon) => pokemon.type.name), //devuelve un array con los tipos
                hp: pokemon.data.stats[0].base_stat,
                attack: pokemon.data.stats[1].base_stat,
                defense: pokemon.data.stats[2].base_stat,
                speed: pokemon.data.stats[3].base_stat,
                height: pokemon.data.height,
                weight: pokemon.data.weight,
            }))
        );
    } catch (error) { //capta el error y lo retorna.
        return error;
    }

    return pokemonsApi; //contiene los datos de todos los Pokémon obtenidos de la API.
}


const getPokemonsDb = async () => {
    try{
        const pokemonsDb = await Pokemon.findAll({ //para traer todos los registros de la base de datos.
            include:[{ //incluyendo info del modelo Type del nombre del tipo de pokemon.
                attributes: ["name"],
                model: Type,
                through: { //para no agregar atributos adicionales
                    attributes: [],
                },
            }]
        });

        return pokemonsDb; // devuelve un arreglo con un objeto con los datos del pokemon
    } catch(error){ //capta si hay algun error en la consulta.
        return error;
    }
}


const getAllPokemons = async () => {
    try {
        let apiPokemons = await getPokemonsApi(); //guarda los datos obtenidos de la api
        let dbPokemons = await getPokemonsDb(); //guarda los datos obtenidos de la base de datos
        return apiPokemons.concat(dbPokemons); //devuelve la info de todos los pokemones de la api y de la base de datos.
      } catch (error) { //capta si hay algun error en la consulta.
        return error;
      }
};

module.exports = { getAllPokemons }