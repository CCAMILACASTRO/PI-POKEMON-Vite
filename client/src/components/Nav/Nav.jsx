import React from 'react'
import styles from './Nav.module.css';
import SearchBar from '../SearchBar/SearchBar';
import { Link } from 'react-router-dom'


const Nav = () => {

    return ( 
        <div className={styles.divNav}>

            
            <Link to='/'>
                <button  className={styles.buttonBack}> Inicio </button>
            </Link>

            <div className={styles.divSelect}>
                <select className={styles.selectPokemon} name="FILTRO_ORIGEN" id="">
                    <option value="API">API</option>
                    <option value="B:D">BASE DE DATOS</option>
                </select>
                
                <select  className={styles.selectPokemon} name="FILTRO_TIPO" id="">
                    <option value="All Pokemons">All Pokemons</option>
                    <option value="Normal">Normal</option>
                    <option value="Fighting">Fighting</option>
                    <option value="Poison">Poison</option>
                    <option value="Ground">Ground</option>
                    <option value="Rock">Rock</option>
                    <option value="Flying">Flying</option>
                    <option value="Bug">Bug</option>
                    <option value="Ghost">Ghost</option>
                    <option value="Steel">Steel</option>
                    <option value="Fire">Fire</option>
                    <option value="Water">Water</option>
                    <option value="Grass">Grass</option>
                    <option value="Electric">Electric</option>
                    <option value="Psychic">Psychic</option>
                    <option value="Ice">Ice</option>
                    <option value="Dragon">Dragon</option>
                    <option value="Dark">Dark</option>
                    <option value="Fairy">Fairy</option>
                    <option value="Unknown">Unknown</option>
                    <option value="Shadow">Shadow</option>
                </select>
            </div>

            <div className={styles.divSelect}>
                <select className={styles.selectPokemon} name="ORDEN_ALFB" id="">
                    <option value="A">Ascendente</option>
                    <option value="D">Descendente</option>
                </select>
                <select className={styles.selectPokemon} name="ORDEN_ATQ" id="">
                    <option value=">50">Mayor de 50</option>
                    <option value="<50">Menor de 50</option>
                </select>
            </div>
            

            <SearchBar/>

            <Link to='/pokemons/create'>
                <button  className={styles.buttonCreate}> Crear Pokemon </button>
            </Link> 

            

           
           
        </div>
    )
}

export default Nav;