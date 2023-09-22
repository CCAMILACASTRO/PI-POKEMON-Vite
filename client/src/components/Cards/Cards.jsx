import React from 'react';
import Card from '../Card/Card';
import styles from './Cards.module.css';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Pagination from '../Pagination/Pagination';


const Cards = () => {

    const allPokemons = useSelector((state) => state.allPokemons) 

    const [currentPage, setCurrentPage] = useState(window.localStorage.getItem('currentPage'));
    const [pokemonsPage, setPokemonsPage] = useState(12)
    const lastPokemon = currentPage * pokemonsPage;
    const firstPokemon = lastPokemon - pokemonsPage;

    const currentPokemons = allPokemons.slice(firstPokemon, lastPokemon);

    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.localStorage.setItem('currentPage', pageNumber)
    };


    if (!Array.isArray(allPokemons)) {
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