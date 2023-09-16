import axios from 'axios'; 
import styles from './SearchBar.module.css'
import { useState } from 'react';
import { useNavigate } from 'react-router';

const SearchBar = () =>{ //la barra de busqueda de pokemones.

    const [ pokemonName, setPokemonName ] = useState('') //estado local para guardar el valor del input.
    const navigate = useNavigate();

    const searchPokemon = async() => { //se ejecuta cuando hace click en el boton de busqueda.
        const URL = 'http://localhost:3001/pokemons'; //url local para traer pokemones de la api.

        const response = await axios.get(`${URL}?name=${pokemonName}`); // solicitud por el nombre/query.
        const pokemon = response.data //guardo en la constante pokemon la respuesta (objeto data) de la api
        if(pokemon.name) { //verifico si el nombre existe...
            const id = pokemon.id; //guardo el id del pokemon
            navigate(`detail/${id}`); // redirecciono hacia la ruta detail del pokemon.

        } else { // si no existe mando un alert...
            alert(`El pokemon ${pokemonName} no existe!`) //envio una alerta diciendo que el pokemon no existe
        }
    }

    const handleChange = (event) => { //evento del onChange
        setPokemonName(event.target.value.toLowerCase());
    } //actualiza el estado de pokemonName con el valor ingresado en el input

    return (
        <div className={styles.divSearch}>

            <input 
            className={styles.inputSearch}
            placeholder= 'Nombre del pokemon' //campo descriptivo
            type="text"
            value={pokemonName} //toma el valor del input para luego actualizar el estado
            onChange={handleChange} // ejecuta la funcion handle para actualizar el estado de pokemonName
            />

            <button
            className={styles.searchButton}
            type='button'
            onClick={searchPokemon} //cuando hace click se ejecuta la funcion searchPokemon.
            ></button>

        </div>
    )
} //FALTA RENDERIZAR EN LA NAV

export default SearchBar;
