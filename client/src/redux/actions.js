import axios from 'axios';
import {
    GET_POKEMONS, 
    GET_POKEMON_ID, 
    CLEAN_DETAIL,
    CLEAN_POKEMONS,
    GET_POKEMON_NAME, 
    GET_ALL_TYPES, 
    CREATE_POKEMON, 
    FILTER_CREATED,
    SORT_NAME, 
    SORT_ATTACK, 
    FILTER_TYPE } from './action-types';


const URL_POKEMON = 'http://localhost:3001/pokemon'; 
const URL_TYPE = 'http://localhost:3001/type'; 


//Obtener todos los pokemones:
export const getAllPokemons = () => {
    return async (dispatch) => {
        try {
            const allPokemons = await axios.get(`${URL_POKEMON}`); 

            return dispatch ({ type: GET_POKEMONS, payload: allPokemons.data }); 
            
        } catch (error) {
            return response.status(404).json({error: error.message})
        }
    };
}


//Obtener un pokemon segun su ID:
export const getPokemonByID = (id) => {
    return async (dispatch) => {
        try {
            
            const pokemonId = await axios.get(`${URL_POKEMON}/${id}`); 

            return dispatch ({ type: GET_POKEMON_ID, payload: pokemonId.data }) 

        } catch (error) {
            return response.status(404).json({error: error.message})
        }
    }
}

//Obtener un pokemon segun su nombre:
export const getPokemonByName = (name) => {
    return async (dispatch) => {
        try {

            const pokemonName = await axios.get(`${URL_POKEMON}?name=${name}`);

            return dispatch({ type: GET_POKEMON_NAME, payload: pokemonName.data });

        } catch (error) {
            alert(error.response.data.message)               
        }
    };
}



//limpiar el detail:
export const cleanDetail = () => {
    return ({ type: CLEAN_DETAIL, payload: []})
}

//limpiar el pokemon buscado:
export const cleanPokemons = (dispatch) => {
    return dispatch({ type: CLEAN_POKEMONS, payload: []})
}


//Obtener todos los Tipos de pokemones:
export const getAllTypes = () => {
    return async (dispatch) => {
        try {

            const allTypes = await axios.get(`${URL_TYPE}`) 
            
            return dispatch({ type: GET_ALL_TYPES, payload: allTypes.data }); 
            
        } catch (error) {
            return response.status(404).json({error: error.message})            
        }
    }
}


//Crear un pokemon:
export const createPokemon = (createPokemon) => {
    return async (dispatch) => {
        try {

            const newPokemon = await axios.post(`${URL_POKEMON}`, createPokemon) 
            
            return dispatch({ type: CREATE_POKEMON, payload: newPokemon.data}) 
            
            
        } catch (error) {
            return response.status(404).json({error: error.message}) 
                     
        }
        
    }
    
}


//filtros por origen
export const filterCreated = (pokemonCreated) => {
    return ({ type: FILTER_CREATED, payload: pokemonCreated })
}


//orden alfabeticamente por nombre
export const sortByName = (name) => {
    return ({ type: SORT_NAME, payload: name})
}


//orden de mayor o menor por ataque
export const sortByAttack = (attack) => {
    return ({ type: SORT_ATTACK, payload: attack})
}


//filtro por tipo
export const filterType = (types) => {
    return ({ type: FILTER_TYPE, payload: types})  
}




