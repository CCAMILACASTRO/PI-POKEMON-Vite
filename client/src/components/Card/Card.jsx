import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.css';

const Card = () => {

    return (

        <div className={styles.divCard} >

            <img className={styles.imgCard} src='' alt='Imagen'/>
            <h3 className={styles.nameCard}>Nombre: </h3>
            <div className={styles.divTiposCard}>
                <h4 className={styles.typeCard}>Tipo: </h4>
                <h4 className={styles.typeCard}>Tipo: </h4> 
            </div>

            <Link to={`/pokemons/detail/1`} >
                <button className= {styles.buttonCard} > Detalle </button>
            </Link>

        </div>
    )

};

export default Card;







// const Card = (data) => {

//     return (

//         <div key={data.id}>
//               <Link to={`/pokemons/detail/${data.id}`} >
//                 <button className= {styles.butonCard} > Detalle </button>
//              </Link>

//              <img className={styles.imgCard} src={data.image} alt={data.name} />
//              <h2 className={styles.nameCard}>Nombre: {data.name}</h2>
//             <div>
//                 <h4 className={styles.typeCard}>Tipo: {data.type[0]}</h4>
//                 <h4 className={styles.typeCard}>Tipo: {data.type[1]}</h4> 
//              </div>

//         </div>
//     )

// };

// export default Card;