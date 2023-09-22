import React from 'react'
import styles from './Home.module.css';
import Cards from '../Cards/Cards'
import Nav from '../Nav/Nav';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllPokemons, getAllTypes } from '../../redux/actions';


const Home = () => {

    const dispatch = useDispatch() // para despachar la action al store
    const allPokemons = useSelector((state) => state.allPokemons)

    useEffect (() => { // Ciclo de vida al componente
        window.localStorage.setItem('currentPage', 1) 
        if(allPokemons.length === 0){
            dispatch( getAllPokemons() ) //cuando se monta el componente hace el dispatch de la action para traer todos los pokemons.
            dispatch(getAllTypes()) // cuando se monta el componente despacha la action para traer todos los tipos de pokemons.
            
        }
    }, [allPokemons]) //array de dependencia vacio para que se ejecute una sola cuando se monta el componente.


    return ( 
        <div className={styles.divHome}>
            <Nav/> 
            
            <Cards />

        </div>
    )
}

export default Home;