import React from 'react';
import styles from './Form.module.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllTypes, createPokemon, cleanPokemons, getAllPokemons } from '../../redux/actions';
import validations from './validations';


const Form = () => {

    const [ errors, setErrors ] = useState({}); //estado local de errores.
    const types = useSelector((state) => state.types); //traigo el estado global de tipos.
    const dispatch = useDispatch();

    
    useEffect(() => {
        dispatch(getAllTypes()) //despacho todos los tipos cuando se monta el componente.
    }, [dispatch]);

    
    const [ form, setForm ] = useState({ //estado local del formulario
        name: "",
        image: "",
        types: [], 
        hp: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
    });


//Crea una función llamada handleChange que nos permita reflejar el texto ingresado de los inputs en nuestro estado local.
    const handleChange = (event) => { //se ejecuta cada vez que se cambia un campo del formulario.
        event.preventDefault(); //para que no se recargue la pagina.
        setForm ({
            ...form,
            [event.target.name]: event.target.value
        })
        setErrors(validations({  //La funcion setErrors se guarda el valor de la ejecucion de la funcion validation que es un objeto.
            ...form,  //A validation le paso un objeto donde guarda una copia del estado y el valor de lo que pone el usuario en el input.
            [event.target.name]: event.target.value, //Si llega a haber algun cambio, le aviso que se tiene que modificar alguna de las propiedades
        }, errors))  // El objeto que retorna la funcion validation, se guarda en el estado errors y es lo que permite mostrar luego el mensaje de error.
    }


    
    const useNameExists = (name) => { //funcion para verificar si un nombre de un pokemon existe.
        const allPokemons = useSelector((state) => state.allPokemons)
    
        return Array.from(allPokemons).some((pokemon) => pokemon.name.toLowerCase() === name.toLowerCase());
    };


    const nameExists = useNameExists(form.name);

    
    const handleSubmit = (event) => { // se ejecuta cuando el usuario envía el formulario
        event.preventDefault();

        if (!nameExists) { // verifica si el nombre de Pokémon ya existe 
            dispatch(createPokemon(form)); //envía los datos del formulario al servidor a través de la acción createPokemon de Redux
            setForm({
                name: "",
                image: "",
                types: [], 
                hp: 0,
                attack: 0,
                defense: 0,
                speed: 0,
                height: 0,
                weight: 0,
            });
            dispatch(getAllPokemons());
            alert('El pokemon fue creado exitosamente');
        } else {
            setErrors({
                ...errors,
                name: 'El pokemón ya existe, elija otro nombre.'
            });
            alert('Error al crear el pokemon!');
        }
    }

    const handleTypeChange = (event) => { //permite agregar tipos de pokemones
        const selectedType = event.target.value;
        if (!form.types.includes(selectedType) && form.types.length < 2) { //verifica si el tipo de Pokémon seleccionado no está incluido y si es menor a 2
            setForm({ //si ambas se cumplen actualiza el estado form
                ...form,
                types: [...form.types, selectedType] //asegura que los tipos seleccionados se mantengan en el estado form.
            });
        }
    }

   
    const handleDelete = (tipo) => { //permite eliminar la seleccion de tipos de pokemon que quiere eliminar.
        setForm({
            ...form,
            types: form.types.filter((type) => type !== tipo) // crea un nuevo array de tipos que excluye el tipo que se deseaba eliminar.
        });
    }

    


    return (

        <div className={styles.divForms}>
            <h2>Crea tu propio Pokemon: </h2>

            <form className={styles.formDiv} onSubmit={handleSubmit} >
            <div className={styles.divInputsForm}>
            
                <div className={styles.divInputsForm}>
                    <label htmlFor="name">Nombre: </label>
                    <input type="text" name="name" onChange={handleChange} placeholder="Nombre" value={form.name.toLowerCase()}/>
                    {errors.name && <p className={styles.pErrors}> {errors.name} </p>}
                </div>

                <div className={styles.divInputsForm}>
                    <label htmlFor="image">Imágen: </label>
                    <input type="text" name="image" onChange={handleChange} placeholder="Imagen" value={form.image} />
                    {errors.image && <p className={styles.pErrors}> {errors.image} </p>}
                </div>

                <div className={styles.divInputsForm}>
                    <label htmlFor="life">Vida: </label>
                    <input type="number" name="hp" onChange={handleChange} placeholder="Vida" value={form.hp} />
                    {errors.hp && <p className={styles.pErrors}> {errors.hp} </p>}
                </div>

                <div className={styles.divInputsForm}>
                    <label htmlFor="attack">Ataque: </label>
                    <input type="number" name="attack" onChange={handleChange} placeholder="Ataque" value={form.attack} />
                    {errors.attack && <p className={styles.pErrors}> {errors.attack} </p>}
                </div>

                <div className={styles.divInputsForm}>
                    <label htmlFor="defense">Defensa: </label>
                    <input type="number" name="defense" onChange={handleChange} placeholder="Defensa" value={form.defense} />
                    {errors.defense && <p className={styles.pErrors}> {errors.defense} </p>}
                </div>

                <div className={styles.divInputsForm}>
                <label htmlFor="speed">Velocidad: </label>
                    <input type="number" name="speed" onChange={handleChange} placeholder="Velocidad" value={form.speed} />
                    {errors.speed && <p className={styles.pErrors}> {errors.speed} </p>}
                </div>

                <div className={styles.divInputsForm}>
                    <label htmlFor="height">Altura: </label>
                    <input type="number" name="height" onChange={handleChange} placeholder="Altura" value={form.height} />
                    {errors.height && <p className={styles.pErrors}> {errors.height} </p>}
                </div>

                <div className={styles.divInputsForm}>
                    <label htmlFor="weight">Peso: </label>
                    <input type="number" name="weight" onChange={handleChange} placeholder="Peso" value={form.weight} />
                    {errors.weight && <p className={styles.pErrors}> {errors.weight} </p>}
                </div>

            </div>


            <div className={styles.divSelectTypes}>

                <h3 className={styles.tituloTipos}>Seleccionar Tipos:</h3>
                <div className={styles.boxTipos}>
                        {types.map((type) => (
                            <div key={type.id} className="checkbox-seleccion">
                                <div className={styles.divCheck}>
                                    <input
                                        type="checkbox"
                                        value={type.name}
                                        onChange={handleTypeChange}
                                        checked={form.types.includes(type.name)}
                                    />
                                    {type.name}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={styles.divSeleccionados}>
                        {form.types.map((type) => (
                            <div key={type} className={styles.divSelecc}>
                                <span>{types.find(t => t.name === type)?.name}</span>
                                <button className={styles.buttonSeleccion} type='button' name='types' onClick={() => handleDelete(type)} > X </button>
                            </div>
                        ))}
                    </div>
                    {errors.types && <p className={styles.pErrors}> {errors.types} </p>}

                    <button type="submit" className={styles.buttonForm} disabled={!form.name || !form.image || !form.types || !form.hp || !form.attack || !form.defense}>
                        Crear Pokemon
                    </button>

                </div>
            </form>
        </div>
    );
}

export default Form;



