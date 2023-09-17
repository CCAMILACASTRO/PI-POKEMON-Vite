import React from 'react'
import styles from './Home.module.css';
import Cards from '../Cards/Cards'
import Nav from '../Nav/Nav';


const Home = () => {

    return ( 
        <div className={styles.divHome}>
            <Nav/>
            <Cards/>
            
        </div>
    )
}

export default Home;