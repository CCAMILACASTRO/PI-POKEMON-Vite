import React from 'react'
import styles from './Home.module.css';
import Cards from '../Cards/Cards'
import Nav from '../Nav/Nav';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllPokemons, getAllTypes } from '../../redux/actions';



const Home = () => {

    const dispatch = useDispatch() // para despachar la action al store

    useEffect (() => { // Ciclo de vida al componente
        dispatch( getAllPokemons() ) //cuando se monta el componente hace el dispatch de la action para traer todos los pokemons.
        dispatch(getAllTypes()) // cuando se monta el componente despacha la action para traer todos los tipos de pokemons.
    }, []) //array de dependencia vacio para que se ejecute una sola cuando se monta el componente.


    return ( 
        <div className={styles.divHome}>
            <Nav/>
            <Cards />

        </div>
    )
}

export default Home;