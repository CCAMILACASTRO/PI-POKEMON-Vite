import React from 'react'
import styles from './Home.module.css';
import Cards from '../Cards/Cards'
import Nav from '../Nav/Nav';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllPokemons, getAllTypes } from '../../redux/actions';


const Home = () => {

    const dispatch = useDispatch() 
    const allPokemons = useSelector((state) => state.allPokemons) 

    // Ciclo de vida al componente
    useEffect (() => { 
        if(allPokemons.length === 0){ 
            window.localStorage.setItem('currentPage', 1) //guardar la pagina donde se encuentra el usuario.
            dispatch( getAllPokemons() ) 
            dispatch(getAllTypes()) 
        }
    }, [dispatch, allPokemons]) 

    



    return ( 
        <div className={styles.divHome}>
            
            <Nav/> 
            
            <Cards />

        </div>
    )
}

export default Home;