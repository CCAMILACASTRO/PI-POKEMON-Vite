import React from 'react';
import Card from '../Card/Card';
import styles from './Cards.module.css';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Pagination from '../Pagination/Pagination';


const Cards = () => {

    const allPokemons = useSelector((state) => state.allPokemons) 
    const [currentPage, setCurrentPage] = useState(window.localStorage.getItem('currentPage')); //estado local con el valor de currentPage
    const [pokemonsPage, setPokemonsPage] = useState(12) 
    
    const lastPokemon = currentPage * pokemonsPage; //último Pokémon de la pagina actual.
    const firstPokemon = lastPokemon - pokemonsPage; //primera pokemon en funcion de la pagina actual y la cantidad de pokemons.
    const currentPokemons = Array.from(allPokemons).slice(firstPokemon, lastPokemon); //pokemones de la pag actual
    

    const pagination = (pageNumber) => { //cambiar la pagina actual
        setCurrentPage(pageNumber); //actualiza el estado con el numero de la pagina
        window.localStorage.setItem('currentPage', pageNumber) //para que la página actual se conserve
    };
    

    return (
        <div className={styles.div}>
            <Pagination
                pokemonsPage={pokemonsPage} 
                allPokemons={allPokemons.length} 
                pagination={pagination} 
                //toma un número de página como argumento para actualizar el estado del componente principal que renderiza la lista de Pokémon.
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