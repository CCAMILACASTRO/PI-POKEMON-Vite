import React from 'react';
import styles from './Detail.module.css';
import { Link } from 'react-router-dom';

const Detail = () => {

    return (

        <div className={styles.divDetail}>
            <div className={styles.detailPokemon}>
                <h2>INFORMACION GENERAL</h2>
                <img className={styles.imgCard} src='' alt='Imagen'/>
                <h3 className={styles.nameCard}>Nombre: </h3>
                <div className={styles.divTipos}>
                    <h4 className={styles.typeCard}>Tipo: </h4>
                    <h4 className={styles.typeCard}>Tipo: </h4> 
                </div>

                <h3>Cualidades</h3>
                <div className={styles.divInfo}>
                    <h4>Peso: </h4>
                    <h4>Altura: </h4>
                </div>

                <h3>Habilidades</h3>
                <div className={styles.divInfo}>
                    <h4>Ataque: </h4>
                    <h4>Defensa: </h4>
                    <h4>Velocidad: </h4>
                </div>

                <Link to={`/pokemons/`} >
                    <button className= {styles.buttonBack} > Volver </button>
                </Link>

            </div>
            

        </div>


    )
}

export default Detail;