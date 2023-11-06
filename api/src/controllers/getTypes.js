const axios = require('axios')
const { Type } = require('../db')
const URL = 'https://pokeapi.co/api/v2/type/'

const getAllTypes = async () => {
    
    try {
        const response = await axios.get(`${URL}`);
        
        const typesApi = response.data.results.map((type) => type.name); 
        
        const types = await Promise.all( 
          typesApi.map(async (typeName) => { 
            const [type] = await Type.findOrCreate({ 
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