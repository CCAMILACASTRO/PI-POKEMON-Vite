import React from 'react';
import styles from './Detail.module.css';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPokemonByID, cleanDetail } from '../../redux/actions';

const Detail = () => {

//Con este hooks podemos acceder al valor de la variable id del detail.
    const { id } = useParams(); //Hacemos useParams del id que nos traemos.
    
    const dispatch = useDispatch();

    const pokemonId = useSelector((state) => state.detail) //guardo en la constante pokemonId la prop del estado global detail.

//simula los 3 ciclos de vida de un componente funcional.
    useEffect(() => {
        dispatch(getPokemonByID(id)) //montaje
        dispatch(cleanDetail(id)) //desmontaje
    }, [dispatch, id]) //Actualizacion (Es cuando el usuario pone el numero de id que esta buscando y ese id se actualiza)



    return (

        <div className={styles.divDetail}>
            <h2>INFORMACION GENERAL</h2>
            <div className={styles.detailPokemon}>
                <img className={styles.imgCard} src={pokemonId?.image} alt={pokemonId?.name}/>
                <h2 className={styles.nameCard}>Nombre: {pokemonId?.name} </h2>
                 

                <div className={styles.divInfo}>
                    <h4>Peso: {pokemonId?.weight} kg </h4>
                    <h4>Altura: {pokemonId?.height} cm </h4>
                </div>

                <div className={styles.divTipos}>
                    <h5>Tipo: </h5>
                        {
                            pokemonId.Types?.map((type, index) => {
                                return (
                                    <h5 className={styles.typeCard} key={index}> {index > 0 ? ', ' : ''}{type.name.toUpperCase()} </h5>
                                )
                            })
                         }
                              
                </div>

               
                <div className={styles.divInfo}>

                    <h4>Vida: {pokemonId?.hp} pts </h4>
                    <h4>Ataque: {pokemonId?.attack} pts </h4>
                    <h4>Defensa: {pokemonId?.defense} pts </h4>
                    <h4>Velocidad: {pokemonId?.speed} pts </h4>
                </div>
                
                <Link to={`/pokemons/`} >
                    <button className= {styles.buttonBack} > Volver </button>
                </Link>

            </div>
            

        </div>


    )
}

export default Detail;