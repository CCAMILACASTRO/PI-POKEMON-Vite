import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.css';

const Card = (props) => {

    return (

        <div className={styles.divCard} >

            <img className={styles.imgCard} src={props.image} alt={props.name}/>
            <h4 className={styles.nameCard}>Nombre: {props.name.toUpperCase()} </h4>
            <div className={styles.divTiposCard}>
                
                <h5>Tipo: </h5>
                { props.Types?.map((type, index) => {

                        return (
                            <h5 className={styles.typeCard} key={index}> {type.name.toUpperCase()} </h5>
                        )
                    })
                }
                              
            </div>

            <Link to={`/pokemons/detail/${props.id}`} >
                <button className= {styles.buttonCard} > Detalle </button>
            </Link>

        </div>
    )
};

export default Card;