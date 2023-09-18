import axios from 'axios';
import {
    GET_POKEMONS, 
    GET_POKEMON_ID, 
    GET_POKEMON_NAME, 
    GET_ALL_TYPES, 
    CREATE_POKEMON, 
    GET_POKEMON_API,
    GET_POKEMON_DB,
    SORT_NAME, 
    SORT_ATTACK, 
    FILTER_TYPE, 
    FILTER_POKEMON } from './action-types';


const URL_POKEMON = 'http://localhost:3001/pokemon'; //url del servidor
const URL_TYPE = 'http://localhost:3001/type'; //url del servidor


//Obtener todos los pokemones:
export const getAllPokemons = () => {
    return async (dispatch) => {
        try {
            const allPokemons = await axios.get(`${URL_POKEMON}`); //obtener los datos de la API.

            return dispatch ({ type: GET_POKEMONS, payload: allPokemons.data }); //se despacha el objeto al reducer para actualizar el estado global.
            
        } catch (error) {
            return response.status(404).json({error: error.message})
        }
    };
}

//Obtener un pokemon segun su ID:
export const getPokemonByID = (id) => {
    return async (dispatch) => {
        try {
            
            const pokemonId = await axios.get(`${URL_POKEMON}/${id}`); //obtener los datos de un pokemon especifico de la API.

            return dispatch ({ type: GET_POKEMON_ID, payload: pokemonId.data }) //se despacha el objeto al reducer para actualizar el estado global.

        } catch (error) {
            return response.status(404).json({error: error.message})
        }
    }
}

//Obtener un pokemon segun su nombre:
export const getPokemonByName = (name) => {
    return async (dispatch) => {
        try {

            const pokemonName = await axios.get(`${URL_POKEMON}/?name=${name}`) //obtiene info de la api segun el nombre del pokemon.

            return dispatch({ type: GET_POKEMON_NAME, payload: pokemonName.data }) //se despacha el objeto al reducer para actualizar el estado global.
            
        } catch (error) {
            return response.status(404).json({error: error.message})
        }
    }
}

//Obtener todos los Tipos de pokemones:
export const getAllTypes = () => {
    return async (dispatch) => {
        try {

            const allTypes = await axios.get(`${URL_TYPE}`) //obtiene todos los tipos de pokemon de la api.

            return dispatch({ type: GET_ALL_TYPES, payload: allTypes.data }); //se despacha el objeto al reducer para actualizar el estado global.
            
        } catch (error) {
            return response.status(404).json({error: error.message})            
        }
    }
}

//Crear un pokemon:
export const postPokemon = (createPokemon) => {
    return async (dispatch) => {
        try {

            const newPokemon = await axios.post(`${URL_POKEMON}`, createPokemon) //crea un pokemon a la url de la api.

            return dispatch({ type: CREATE_POKEMON, payload: newPokemon.data}) //se despacha el objeto al reducer para actualizar el estado global.
            
            
        } catch (error) {
            return response.status(404).json({error: error.message})                
        }
    }
}


export const pokemonApi = () => {
    return ({ type: GET_POKEMON_API, payload: 'Filtrando pokemons de la API...'})
}

export const pokemonDB = () => {
    return ({ type: GET_POKEMON_DB, payload: 'Filtrando pokemons de la Base de Datos...'})
}

