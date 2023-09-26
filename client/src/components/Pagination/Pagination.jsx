import React from 'react';
import styles from './Pagination.module.css';

const Pagination = ({pokemonsPage, allPokemons, pagination}) => { //trae las propiedades establecidas en Cards donde se renderiza.

    const pageNumbers = []; //creo un array para almacenar los numeros de paginas

    for(let i = 1; i <= Math.ceil(allPokemons/pokemonsPage); i++){ //Math.ceil redondea hacia arriba
        pageNumbers.push(i)
    } //para calcular cuantas paginas se necesitan para renderizar los pokemones necesarios por pagina


    return (
        <div >
            <div className={styles.divPage}>

                {
                    pageNumbers?.map((pageNumber) => { //mapea cada pagina y crea un boton para cada una y cuando hace click cambia de pagina
                        return (
                            <div className={styles.items} key={pageNumber}> 
                                <button className={styles.buttonPage} onClick={() => pagination(pageNumber)}>{pageNumber}</button>
                            </div>                            
                        )
                    })
                }

            </div>
        </div>
    )
}

export default Pagination;
