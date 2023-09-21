import React from 'react';
import styles from './SearchBar.module.css'
import { useState } from 'react';
import { getPokemonByName } from '../../redux/actions';
import { useDispatch } from 'react-redux';


const SearchBar = () =>{ //la barra de busqueda de pokemones.

    const dispatch = useDispatch();
    const [pokemonName, setPokemonName] = useState('');

    const handleChange = (event) => {
        event.preventDefault();
        setPokemonName(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(getPokemonByName(pokemonName));
        setPokemonName('');
    }


    const handleInput = (event) => {
        event.preventDefault();
        setPokemonName(event.target.value)
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
                > Buscar </button>

            </form>
                

        </div>
    )
}

export default SearchBar;
