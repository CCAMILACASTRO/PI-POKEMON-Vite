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
            const allPokemonsCopy = [...state.pokemon];
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
                allPokemons: createdFiltered,
            }
            
        case FILTER_TYPE:
            const typesCopy = [...state.pokemon]
            let typesFilter = typesCopy.filter((type) => type.name === action.payload);
            console.log(typesFilter)
            
            return {
                ...state,
                allPokemons:
                    action.payload === 'ALL'
                    ? [...state.pokemon]
                    : typesFilter
            }

        case SORT_NAME:
            const nameCopy = [...state.pokemon];
            
            let nameFiltered;
            if(action.payload === 'ASD') {
                nameFiltered = nameCopy.sort((a, b) => a.name.toLowerCase() - b.name.toLowerCase());
            } else if (action.payload === 'DSC') {
                nameFiltered = nameCopy.sort((a, b) => b.name.toLowerCase() - a.name.toLowerCase());
            } else {
                nameFiltered = nameCopy;
            }
            return {
                ...state,
                AllPokemons: nameFiltered,
                
            }
        case SORT_ATTACK:
            const attackCopy = [...state.allPokemons];
            let attackFiltered;
            if(action.payload === 'ASD') {
                attackFiltered = attackCopy.sort((a, b) => a.attack - b.attack);
            } else if (action.payload === 'DSC') {
                attackFiltered = attackCopy.sort((a, b) => b.attack - a.attack);
            } else {
                attackFiltered = attackCopy;
            }
            return {
                ...state,
                pokemon: attackFiltered,
            }

        default:
            return { ...state }
    }
}

export default reducer;