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



const initialState = {
    pokemon: [],
    allPokemons: [],
    detail: [],
    types: [],
    origen: [],
}


const reducer = (state= initialState, action) => {
    switch (action.type) {
        case GET_POKEMONS:
            return {
                ...state,
                //pokemon: action.payload,
                allPokemons: action.payload,
            }
        case GET_POKEMON_ID:
            return {
                ...state,
                detail: action.payload,
            }
        case GET_POKEMON_NAME:
            return {
                ...state,
                pokemon: action.payload,
            }
        case GET_ALL_TYPES:
            return {
                ...state,
                types: action.payload,
            }
        case CREATE_POKEMON:
            return {
                ...state,
                pokemon: action.payload,
                allPokemons: action.payload,
            }
        case GET_POKEMON_API:
            return {
                ...state,
                origen: state.allPokemons.filter((pokemon) => !isNaN(pokemon.id)) //guarda los pokemones que su id no sea numero.
            }
        case GET_POKEMON_DB:
            return {
                ...state,
                origen: state.allPokemons.filter((pokemon) => pokemon.id.length > 4) //guarda los pokemones que su id sea de mas de 4 caracteres.
            }
            break;
    
        default:
            return { ...state }
    }
}

export default reducer;