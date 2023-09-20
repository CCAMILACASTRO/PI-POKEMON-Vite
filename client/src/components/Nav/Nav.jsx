import React from 'react';
import styles from './Nav.module.css';
import SearchBar from '../SearchBar/SearchBar';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTypes, filterCreated, sortByName, sortByAttack, filterType, getAllPokemons, cleanPokemons } from '../../redux/actions'


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
        dispatch(sortByAttack(event.target.value))
    }

    //Para limpiar los filtros
    const handleClick = (event) => {
        event.preventDefault();
        dispatch(cleanPokemons(dispatch))
        dispatch(getAllPokemons())
    }

    return ( 
        <div className={styles.divNav}>

            
            <Link to='/'>
                <button  className={styles.buttonBack}> Inicio </button>
            </Link>

            <div className={styles.divSelect}>
                <select className={styles.selectPokemon} onChange={(event) => handleFilterCreated(event)}>
                    <option value="ALL">ORIGEN</option>
                    <option value="API">API</option>
                    <option value="DB">CREADOS</option>
                    
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
                
            </div>

            <div className={styles.divSelect}>
                <select className={styles.selectPokemon} onChange={(event) => handleSortName(event)}>
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
            

            <SearchBar/>

            <button
                className={styles.buttonClean}
                type='submit'
                onClick={(event) => handleClick(event)}
                > Limpiar Filtros </button>

            <Link to='/pokemons/create'>
                <button  className={styles.buttonCreate}> Crear Pokemon </button>
            </Link> 

            

           
           
        </div>
    )
}

export default Nav;