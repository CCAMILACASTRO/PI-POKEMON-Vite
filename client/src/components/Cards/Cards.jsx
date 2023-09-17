import React from 'react';
import Card from '../Card/Card';
import styles from './Cards.module.css';


const Cards = () => {

    return (
        <div className={styles.divCards}>
            <Card/>
          

        </div>
    )
};

export default Cards;




  {/* { pokemons.map((pokemon) => {
                <Card
                key={pokemon.id}
                id={pokemon.id}
                name={pokemon.name}
                image={pokemon.image}
                type={pokemon.type}
                />
            })} */}