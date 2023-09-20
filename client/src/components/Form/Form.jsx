import React from 'react';
import styles from './Form.module.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPokemons, getAllTypes, createPokemon } from '../../redux/actions';
// import { v4 as uuid4 } from 'uuid';
// import validations from './validations';

const useNameExists = (name) => { //funcion para verificar si un nombre existe
    const allPokemons = useSelector((state) => state.allPokemons)
    return allPokemons.some((pokemon) => pokemon.name.toLowerCase() === name.toLowerCase()
    );
};


const Form = () => {

    const types = useSelector((state) => state.types); //traigo el estado global de tipos.
    const navigate = useNavigate();
    const dispatch = useDispatch();

    
    useEffect(() => {
        dispatch(getAllTypes())
    }, [dispatch]);


    
    const [ form, setForm ] = useState({ //estado local del formulario
        name: "",
        image: "",
        life: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        types: [],
    });

    const [ errors, setErrors ] = useState({}); //estado local de errores.


    const nameExists = useNameExists(form.name);

//Crea una función llamada handleChange que nos permita reflejar el texto ingresado de los inputs en nuestro estado local.
    const handleChange = (event) => {
        setForm ({
            ...form,
            [event.target.name]: event.target.value
        })
        // setErrors(validations({  //La funcion setErrors se guarda el valor de la ejecucion de la funcion validation que es un objeto.
        //     ...form,  //A validation le paso un objeto donde guarda una copia del estado y el valor de lo que pone el usuario en el input.
        //     [event.target.name]: event.target.value, //Si llega a haber algun cambio, le aviso que se tiene que modificar alguna de las propiedades
        // }))  // El objeto que retorna la funcion validation, se guarda en el estado errors y es lo que permite mostrar luego el mensaje de error.
    }
    








    return (

        <div className={styles.divForms}>
            <h2>Crea tu propio Pokemon: </h2>

            <form className={styles.formDiv} >
            <div className={styles.divInputsForm}>
            
                <div className={styles.divInputsForm}>
                    <label htmlFor="name">Nombre: </label>
                    <input type="text" name="name" onChange={handleChange} placeholder="Nombre" value={form.name}/>
                </div>

                <div className={styles.divInputsForm}>
                    <label htmlFor="image">Imágen: </label>
                    <input type="text" name="image" onChange={handleChange} placeholder="Imagen" value={form.image} />
                </div>

                <div className={styles.divInputsForm}>
                    <label htmlFor="life">Vida: </label>
                    <input type="number" name="life" onChange={handleChange} placeholder="Vida" value={form.life} />
                </div>

                <div className={styles.divInputsForm}>
                    <label htmlFor="attack">Ataque: </label>
                    <input type="number" name="attack" onChange={handleChange} placeholder="Ataque" value={form.attack} />
                </div>

                <div className={styles.divInputsForm}>
                    <label htmlFor="defense">Defensa: </label>
                    <input type="number" name="defense" onChange={handleChange} placeholder="Defensa" value={form.defense} />
                </div>

                <div className={styles.divInputsForm}>
                <label htmlFor="speed">Velocidad: </label>
                    <input type="number" name="speed" onChange={handleChange} placeholder="Velocidad" value={form.speed} />
                </div>

                <div className={styles.divInputsForm}>
                    <label htmlFor="height">Altura: </label>
                    <input type="number" name="height" onChange={handleChange} placeholder="Altura" value={form.height} />
                </div>

                <div className={styles.divInputsForm}>
                    <label htmlFor="weight">Peso: </label>
                    <input type="number" name="weight" onChange={handleChange} placeholder="Peso" value={form.weight} />
                </div>

            </div>

            <div className={styles.divSelectTypes}>

                <h3 className={styles.tituloTipos}>Seleccionar Tipos:</h3>
                    <div className={styles.boxTipos}>
                        {types.map((type) => (
                            <div className="checkbox-seleccion">
                                <div className={styles.divCheck}>
                                    <input value={type.id} type="checkbox" />
                                        {type.name}
                                </div>
                            </div>
                        ))}

                    </div>

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