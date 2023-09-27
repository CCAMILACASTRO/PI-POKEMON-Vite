import React from 'react';
import styles from './SearchBar.module.css'
import { useState } from 'react';
import { getPokemonByName } from '../../redux/actions';
import { useDispatch } from 'react-redux';



const SearchBar = () =>{ 

    const dispatch = useDispatch();
    

    const [pokemonName, setPokemonName] = useState(''); 


    const handleSubmit = (event) => { //guarda la info
        event.preventDefault();
        dispatch(getPokemonByName(pokemonName)); //despacha la action para buscar el pokemon por su nombre.
        setPokemonName('');
    }

    const handleChange = (event) => { 
        event.preventDefault(); 
        setPokemonName(event.target.value)       
    }


    return (
        <div >
            <form onSubmit={handleSubmit} className={styles.divSearchBar}>

                <input 
                className={styles.inputSearchBar}
                placeholder= "Buscar..." 
                type="text"
                value={pokemonName} 
                onChange={handleChange}
                />

                <button
                className={styles.buttonSearchBar}
                type='submit'
                > Buscar </button>-
            </form>
                

        </div>
    )
}

export default SearchBar;
