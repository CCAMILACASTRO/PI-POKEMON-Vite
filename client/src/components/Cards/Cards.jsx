import React from 'react';
import Card from '../Card/Card';
import styles from './Cards.module.css';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Pagination from '../Pagination/Pagination';


const Cards = () => {

    const allPokemons = useSelector((state) => state.allPokemons) //trae el estado global allPokemons.

    const [currentPage, setCurrentPage] = useState(window.localStorage.getItem('currentPage')); //estado local con el valor de currentPage
    //guarda en el navegador la variable para realizar un seguimiento de la página actual en la que se encuentra el usuario.
    const [pokemonsPage, setPokemonsPage] = useState(12) //para establecer la cantidad de pokemones por pagina.
    const lastPokemon = currentPage * pokemonsPage; 
    const firstPokemon = lastPokemon - pokemonsPage;
    //para calcular el indice del ultimo y primera pokemon en funcion de la pagina actual y la cantidad de pokemons.
    const currentPokemons = allPokemons.slice(firstPokemon, lastPokemon);
    //array para mostrar los pokemones de la pagina actual.

    const pagination = (pageNumber) => { //funcion para cambiar la pagina actual
        setCurrentPage(pageNumber); //actualiza el estado con el numero de la pagina
        window.localStorage.setItem('currentPage', pageNumber) //actualiza el valor en el almacenamiento local para que la página actual se conserve
    };


    if (!Array.isArray(allPokemons)) { //verifica si allPokemons no es un arreglo
        return 'No se pudieron cargar los pokemons';
    }

    return (
        <div className={styles.div}>
            <Pagination
                pokemonsPage={pokemonsPage}
                allPokemons={allPokemons.length}
                pagination={pagination}
            />


            <div className={styles.divCards}>
            
           { currentPokemons.map((pokemon) => {
                return (
                    <Card
                        key={pokemon.id}
                        id={pokemon.id}
                        name={pokemon.name}
                        image={pokemon.image}
                        Types={pokemon.Types}
                    />
                )
            })}

        </div>

        </div>
        
    )
};

export default Cards;