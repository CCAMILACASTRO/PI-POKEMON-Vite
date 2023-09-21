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



const initialState = {
    pokemon: [],
    allPokemons: {},
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
        case CLEAN_POKEMONS:
            return {
                ...state,
                pokemon: action.payload
            }
        case GET_POKEMON_NAME:
            return {
                ...state,
                pokemon: action.payload,
                allPokemons: action.payload, // Agrega los Pokémon buscados a allPokemons
                
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

            const typesCopy = [...state.pokemon];
            let typeFiltered;
            if (action.payload === 'ALL') {
                typeFiltered = typesCopy;
            } else {
                typeFiltered = typesCopy.filter((pokemon) => {
                    if (!pokemon.types) return false;
                    return pokemon.types.some((type) => type.name === action.payload);
                });
            }
            return {
                ...state,
                allPokemons: typeFiltered,
            }

        case SORT_NAME:
            const nameCopy = [...state.allPokemons];
            if (action.payload === 'ALL') {
                return { ...state, allPokemons: state.pokemon, // Usar los pokemons originales sin ordenar
                };

            } else {
                let nameSort = nameCopy.sort((a, b) => {
                    if (a.name < b.name) return action.payload === 'ASD' ? -1 : 1;
                    if (a.name > b.name) return action.payload === 'DSC' ? -1 : 1;
                    return 0;
                });
                return {
                    ...state,
                    allPokemons: nameSort,
                };
            }          
                
        case SORT_ATTACK:
            const attackCopy = [...state.allPokemons];
            
            if (action.payload === 'ALL') {
                return { ...state, allPokemons: state.pokemon, // Usar los pokemons originales sin ordenar
                };

            }  else {
                let attackSort = attackCopy.sort((a, b) => {
                    if (a.attack < b.attack) {  return action.payload === 'ASD' ? -1 : 1; } //menor a mayor ataque / + debil a + fuerte
                    if (a.attack > b.attack) {  return action.payload === 'DSC' ? -1 : 1;} //mayor a menor ataque / + fuerte a + debil
                    return 0;
                });
                return {
                    ...state,
                    allPokemons: attackSort,
                   
                }
            }
            
        default:
            return { ...state }
    }
}

export default reducer;