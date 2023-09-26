import React from 'react';
import styles from './Nav.module.css';
import SearchBar from '../SearchBar/SearchBar';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { filterCreated, sortByName, sortByAttack, filterType, getAllPokemons, cleanPokemons } from '../../redux/actions'


const Nav = () => {

    const dispatch = useDispatch();

    const allTypes = useSelector((state) => state.types) //trae el estado global de types.


    //Manejador del filtrado del pokemon segun su origen:
    const handleFilterCreated = (event) => { //toma la seleccion del onChange y maneja el evento con la action.
        event.preventDefault();
        dispatch(filterCreated(event.target.value)) //despacha la action y toma el valor segun la opcion elegida
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
        dispatch(sortByAttack(event.target.value))
    }

    //Para limpiar los filtros y mostrar todos los pokemons.
    const handleClick = (event) => { 
        event.preventDefault(); //evita el comportamiento estandar de un evento.
        dispatch(cleanPokemons(dispatch))
        dispatch(getAllPokemons())
    }

    return ( 
        <div className={styles.divNav}>

            
            <Link to='/'>
                <button  className={styles.buttonBack}> Inicio </button>
            </Link>

            <Link to={`/pokemons/`} >
                        <button className={styles.buttonBack} >Home</button>
            </Link>

            <div className={styles.divSelect}>
                <select className={styles.selectPokemon} onChange={(event) => handleFilterCreated(event)}>
                    <option value="ALL">ORIGEN</option>
                    <option value="API">ORIGINALES</option>
                    <option value="DB">CREADOS</option>
                    
                </select>

                <select className={styles.selectPokemon} onChange={(event) => handleFilterType(event)} >
                    <option value="ALL">ALL POKEMONS</option>
                    {
                        allTypes?.map((type) =>{
                            return (
                                <option key={type.id} value={type.name} > {type.name} </option>
                            )
                        })
                    }
                </select>
                
            </div>

            <div className={styles.divSelect}>
                <select className={styles.selectPokemon} onChange={(event) => handleSortName(event)} defaultValue="ALL">
                    <option value="ALL">NOMBRE</option>
                    <option value="ASD">A - Z</option>
                    <option value="DSC">Z - A</option>
                </select>
                <select className={styles.selectPokemon} onChange={(event) => handleSortAttack(event)}>
                    <option value="ALL">ATAQUE</option>
                    <option value="ASD">Ascendente </option>
                    <option value="DSC">Descendente</option>
                    
                </select>
            </div>
            
            <button
                className={styles.buttonClean}
                type='submit'
                onClick={(event) => handleClick(event)}
                > Limpiar Filtros </button>

            <SearchBar/>


            <Link to='/pokemons/create'>
                <button  className={styles.buttonCreate}> Crear Pokemon </button>
            </Link> 

            

           
           
        </div>
    )
}

export default Nav;