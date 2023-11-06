import React from 'react';
import styles from './Pagination.module.css';

const Pagination = ({ pokemonsPage, allPokemons, pagination }) => {
    
  const pageNumbers = Math.ceil(allPokemons / pokemonsPage); // Calcula la cantidad total de páginas.

  const currentPage = localStorage.getItem('currentPage'); // Obtiene la página actual del almacenamiento local.
  const currentPageNumber = parseInt(currentPage);

  // Calcula los números de página que se mostrarán en la paginación.
  const pagesToShow = [];
  if (currentPageNumber <= 2) {
    // Si la página actual es 1 o 2, muestra las páginas 1, 2 y 3.
    for (let i = 1; i <= 3 && i <= pageNumbers; i++) {
      pagesToShow.push(i);
    }
  } else if (currentPageNumber >= pageNumbers - 1) {
    // Si la página actual está cerca del final, muestra las últimas 3 páginas.
    for (let i = pageNumbers - 2; i <= pageNumbers; i++) {
      pagesToShow.push(i);
    }
  } else {
    // En otros casos, muestra la página actual y las dos siguientes.
    pagesToShow.push(currentPageNumber - 1, currentPageNumber, currentPageNumber + 1);
  }

  return (
    <div>
      <div className={styles.divPage}>
        <button
          className={styles.buttonPage}
          onClick={() => pagination(currentPageNumber - 1)}
          disabled={currentPageNumber === 1}
        >
          {'<'}
        </button>
        {pagesToShow.map((pageNumber) => (
          <div className={styles.items} key={pageNumber}>
            <button
              className={`${styles.buttonPage} ${pageNumber === currentPageNumber ? styles.active : ''}`}
              onClick={() => pagination(pageNumber)}
            >
              {pageNumber}
            </button>
          </div>
        ))}
        <button
          className={styles.buttonPage}
          onClick={() => pagination(currentPageNumber + 1)}
          disabled={currentPageNumber === pageNumbers}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
