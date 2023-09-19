import {
    GET_POKEMONS, 
    GET_POKEMON_ID, 
    CLEAN_DETAIL,
    GET_POKEMON_NAME, 
    GET_ALL_TYPES, 
    CREATE_POKEMON, 
    FILTER_CREATED,
    SORT_NAME, 
    SORT_ATTACK, 
    FILTER_TYPE } from './action-types';



const initialState = {
    pokemon: [],
    allPokemons: [],
    detail: [],
    types: [],
    
}


const reducer = (state= initialState, action) => {
    switch (action.type) {
        case GET_POKEMONS:
            return {
                ...state,
                pokemon: action.payload,
                allPokemons: action.payload,
            }
        case GET_POKEMON_ID:
            return {
                ...state,
                detail: action.payload,
            }
        case CLEAN_DETAIL:
            return {
                ...state,
                pokemon: action.payload,
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
        case FILTER_CREATED: 
            const allPokemonsCopy = [...state.allPokemons];
            let createdFiltered;
            if(action.payload === 'DB') {
                createdFiltered = allPokemonsCopy.filter((pokemon) => pokemon.createdInDb );
            } else if (action.payload === 'API') {
                createdFiltered = allPokemonsCopy.filter((pokemon) => !pokemon.createdInDb );
            } else {
                createdFiltered = allPokemonsCopy
            }
            return {
                ...state,
                pokemon: createdFiltered,
            }
        case FILTER_TYPE:
            const typesCopy = [...state.pokemon];
            let typeFiltered = action.payload === 'ALL'
            ? typesCopy
            : typesCopy.filter((pokemon) => pokemon.types.some((type) => type.name === action.payload));
            
            if(typeFiltered.length <= 0) {
                typeFiltered = typesCopy;
                alert('No hay pokemones del tipo indicado!')
            }
            return {
                ...state,
                pokemon: typeFiltered,
            }
        case SORT_NAME:
            const nameCopy = [...state.pokemon]; //guardo una copia del estado global
            return {
                ...state, //retorno la copia del estado global 
                pokemon: //propiedad pokemon con todos los pokemones ordenados.
                action.payload === 'ASD'
                ? nameCopy.sort((a, b) => a.name.toLowerCase() - b.name.toLowerCase())
                : nameCopy.sort((a, b) => b.name.toLowerCase() - a.name.toLowerCase())
            }
        case SORT_ATTACK:
            const attackCopy = [...state.pokemon];
            return {
                ...state,
                pokemon: 
                action.payload === 'A'
                ? attackCopy.sort((a, b) => a.attack - b.attack)
                : attackCopy.sort((a, b) => b.attack - a.attack)
            }

        default:
            return { ...state }
    }
}

export default reducer;