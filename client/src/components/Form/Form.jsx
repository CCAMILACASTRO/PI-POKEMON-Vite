import React from 'react';
import styles from './Form.module.css';
import { Link } from 'react-router-dom';

const Form = () => {

    return (

        <div class={styles.divForms}>
            <h2>Creá tu propio Pokemon: </h2>

            <form className={styles.formDiv} onSubmit="">
            <div className={styles.divInputsForm}>
            
                <div className={styles.divInputsForm}>
                    <label htmlFor="name">Nombre: </label>
                    <input type="text" name="name" placeholder="Nombre" value="" onChange=""/>
                </div>

                <div className={styles.divInputsForm}>
                    <label htmlFor="image">Imágen: </label>
                    <input type="text" name="image" placeholder="Imagen" value="" onChange=""/>
                </div>

                <div className={styles.divInputsForm}>
                    <label htmlFor="life">Vida: </label>
                    <input type="number" name="life" placeholder="Vida" value="" onChange="" />
                </div>

                <div className={styles.divInputsForm}>
                    <label htmlFor="attack">Ataque: </label>
                    <input type="number" name="attack" placeholder="Ataque" value="" onChange="" />
                </div>

                <div className={styles.divInputsForm}>
                    <label htmlFor="defense">Defensa: </label>
                    <input type="number" name="defense" placeholder="Defensa" value="" onChange="" />
                </div>

                <div className={styles.divInputsForm}>
                <label htmlFor="speed">Velocidad: </label>
                    <input type="number" name="speed" placeholder="Velocidad" value="" onChange="" />
                </div>

                <div className={styles.divInputsForm}>
                    <label htmlFor="height">Altura: </label>
                    <input type="number" name="height" placeholder="Altura" value="" onChange="" />
                </div>

                <div className={styles.divInputsForm}>
                    <label htmlFor="weight">Peso: </label>
                    <input type="number" name="weight" placeholder="Peso" value="" onChange="" />
                </div>

            </div>

            <div className={styles.divSelectTypes}>

                <h3 className="Type">Tipo:</h3>
                <p>(Puede seleccionar hasta 2 tipos)</p>


                <button type="submit" className={styles.buttonForm}> Crear Pokemon </button>

            
                <Link to={`/pokemons/`} >
                    <button className= {styles.buttonForm} > Volver </button>
                </Link>
                
            </div>
        
            

        </form>

        </div>
    )
}

export default Form;