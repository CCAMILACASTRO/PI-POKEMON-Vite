import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.css';

const Card = (props) => {

    return (

        <div className={styles.divCard} >

            <img className={styles.imgCard} src={props.image} alt={props.name}/>
            <h3 className={styles.nameCard}>Nombre: {props.name} </h3>
            <div className={styles.divTiposCard}>
                <h4 className={styles.typeCard}>Tipo: {props.type[0]} </h4>
                <h4 className={styles.typeCard}>Tipo: {props.type[1]} </h4> 
            </div>

            <Link to={`/pokemons/detail/${props.id}`} >
                <button className= {styles.buttonCard} > Detalle </button>
            </Link>

        </div>
    )

};

export default Card;