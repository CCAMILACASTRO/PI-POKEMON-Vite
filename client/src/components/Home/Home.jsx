import React from 'react'
import styles from './Home.module.css';
import Cards from '../Cards/Cards'
import Nav from '../Nav/Nav';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllPokemons, getAllTypes } from '../../redux/actions';


const Home = () => {

    const dispatch = useDispatch() // para despachar la action al store
    const allPokemons = useSelector((state) => state.allPokemons) //traigo el estado global de todos los pokemons.

    // Ciclo de vida al componente
    useEffect (() => { // realiza acciones cuando el componente se monta o cambia el estado allPokemons.
        window.localStorage.setItem('currentPage', 1) //para guardar en el navegador la pagina donde se encuentra el usuario.
        if(allPokemons.length === 0){ //si el estado es = 0 se despachan las actions.
            dispatch( getAllPokemons(), getAllTypes() ) //cuando se monta el componente hace el dispatch de la action para traer todos los pokemons.
            dispatch(getAllTypes()) // cuando se monta el componente despacha la action para traer todos los tipos de pokemons.
        }
    }, [allPokemons]) //array de dependencia para que quede atento a los cambios del estado allPokemons.

    return ( 
        <div className={styles.divHome}>
            <Nav/> 
            
            <Cards />

        </div>
    )
}

export default Home;