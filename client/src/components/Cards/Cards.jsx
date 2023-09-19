import React from 'react';
import Card from '../Card/Card';
import styles from './Cards.module.css';
import { useSelector } from 'react-redux';


const Cards = () => {

    const allPokemons = useSelector((state) => state.allPokemons) //

    if(!allPokemons) {
        return 'No se pudieron cargar los pokemons'
    }

    return (
        <div className={styles.divCards}>
           { allPokemons.map((pokemon) => {
            return (
                <Card
                key={pokemon.id}
                id={pokemon.id}
                name={pokemon.name}
                image={pokemon.image}
                types={pokemon.types}
            />
            )
            })}
        </div>
    )
};

export default Cards;