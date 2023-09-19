import React from 'react';
import styles from './Nav.module.css';
import SearchBar from '../SearchBar/SearchBar';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTypes, filterCreated, sortByName, sortByAttack, filterType } from '../../redux/actions'


const Nav = () => {

    const dispatch = useDispatch();

    const allTypes = useSelector((state) => state.types)

    //Ciclo de vida del componente. Trae todos los tipos cuando se monta el componente.
    useEffect(() => {
        dispatch(getAllTypes())
    }, [dispatch])


    //Manejador del filtrado del pokemon segun su origen:
    const handleFilterCreated = (event) => { //toma la seleccion del onChange y maneja el evento con la action.
        event.preventDefault();
        dispatch(filterCreated(event.target.value))
    }

    //Manejador del filtrado del pokemon segun su tipo:
    const handleFilterType = (event) => {
        event.preventDefault();
        dispatch(filterType(event.target.value))
    }

    //Manejador del ordenamiento de pokemons alfabeticamente por su nombre:
    const handleSortName = (event) => {
        event.preventDefault();
        dispatch(sortByName(event.target.value))
    }

    //Manejador del ordenamiento de pokemons por su ataque:
    const handleSortAttack = (event) => {
        event.preventDefault();
        dispatch(sortByAttack())
    }

    return ( 
        <div className={styles.divNav}>

            
            <Link to='/'>
                <button  className={styles.buttonBack}> Inicio </button>
            </Link>

            <div className={styles.divSelect}>
                <select className={styles.selectPokemon} onChange={(event) => handleFilterCreated(event)}>
                    <option >ORIGEN</option>
                    <option value="API">API</option>
                    <option value="BD">CREADOS</option>
                    <option value="ALL">All Pokemons</option>
                </select>

                <select className={styles.selectPokemon} onChange={(event) => handleFilterType(event)} >
                    <option value="ALL">All Pokemons</option>
                    {
                        allTypes?.map((type) =>{
                            return (
                                <option key={type.id} value={type.name} > {type.name} </option>
                            )
                        })
                    }
                </select>
                
                {/* <select  className={styles.selectPokemon} onChange={(event) => handleFilterType(event)}>
                    <option >TIPOS</option>
                    <option value="ALL">All Pokemons</option>
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
                </select> */}
            </div>

            <div className={styles.divSelect}>
                <select className={styles.selectPokemon} onChange={(event) => handleSortName(event)}>
                    <option >NOMBRE</option>
                    <option value="ASD">A - Z</option>
                    <option value="DSC">Z - A</option>
                    <option value="ALL">All Pokemons</option>
                </select>
                <select className={styles.selectPokemon} onChange={(event) => handleSortAttack(event)}>
                    <option >ATAQUE</option>
                    <option value="A">Ascendente </option>
                    <option value="D">Descendente</option>
                    <option value="ALL">All Pokemons</option>
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