import React from 'react';
import { Link } from 'react-router-dom';
import styles  from './Landing.module.css';

const Landing = () => {

    return (
        <div className= {styles.divLanding}>
            
            <h1>Bienvenidos al Mundo Pokemóm...!</h1>
           
            <Link to='/pokemons'>
                <button className= {styles.botonLanding}>INGRESAR</button>
            </Link>

        </div>
    );

}

export default Landing;

