import React from 'react';
import styles from './Pagination.module.css';

const Pagination = ({pokemonsPage, allPokemons, pagination}) => {

    const pageNumbers = [];

    for(let i = 1; i < Math.ceil(allPokemons/pokemonsPage); i++){
        pageNumbers.push(i)
    }


    return (
        <div >
            <div className={styles.divPage}>

                {
                    pageNumbers?.map((number) => {
                        return (
                            <div className={styles.items} key={number}>
                                <button className={styles.buttonPage} onClick={() => pagination(number)}>{number}</button>
                            </div>                            
                        )
                    })
                }

            </div>
        </div>
    )
}

export default Pagination;
