import React from 'react';
import styles from './SearchBar.module.css'
import { useState } from 'react';
import { getPokemonByName } from '../../redux/actions';
import { useDispatch } from 'react-redux';


const SearchBar = () =>{ //la barra de busqueda de pokemones.

    const dispatch = useDispatch();

    const [pokemonName, setPokemonName] = useState(''); //estado local que inicia en un string vacio

    const handleChange = (event) => { //se ejecuta cuando el valor del input cambia.
        event.preventDefault();
        setPokemonName(event.target.value); //actualiza el estado local con el valor del input.
    }

    const handleSubmit = (event) => { //cuando aprieta el boton envia el formulario de busqueda.
        event.preventDefault(); 
        dispatch(getPokemonByName(pokemonName)); //despacha la action para buscar el pokemon por su nombre.
        setPokemonName(''); //limpia el estado.
        
    }


    const handleInput = (event) => { //se ejecuta cada vez que el valor del input cambia.
        event.preventDefault();
        setPokemonName(event.target.value.toLowerCase())
    }

    return (
        <div >
            <form onChange={handleChange} className={styles.divSearchBar}>

                <input 
                className={styles.inputSearchBar}
                placeholder= "Buscar..." //campo descriptivo
                type="text"
                value={pokemonName} 
                onChange={handleInput}
                />

                <button
                className={styles.buttonSearchBar}
                type='submit'
                onClick={handleSubmit}
                > Buscar </button>-
            </form>
                

        </div>
    )
}

export default SearchBar;
