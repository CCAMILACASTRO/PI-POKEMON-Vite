const axios = require('axios')
const { Type } = require('../db')
const URL = 'https://pokeapi.co/api/v2/type/'

const getAllTypes = async () => {
    
    try {
        const response = await axios.get(`${URL}`);
        
        const typesApi = response.data.results.map((type) => type.name); //mapeo y de cada tipo tomo la prop name.
        
        const types = await Promise.all( // detalles individuales de cada tipo de pokemon.
          typesApi.map(async (typeName) => { //recorro el array de tipos.
            const [type] = await Type.findOrCreate({ //busca o crea con estos atributos
              where: { name: typeName },
              defaults: typeName,
            });
            return type;
          })
        );
    
        return types;

    } catch (error) {
        return error;
    }
}

module.exports = { getAllTypes }