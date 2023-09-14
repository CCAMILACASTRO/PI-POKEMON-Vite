// const axios = require('axios')
// const URL = 'https://pokeapi.co/api/v2/pokemon/'
const { Pokemon } = require('../db')

const deletePokemon = async(id) => { //Funcion para eliminar un pokemon de la base de datos.

    if(id.length <= 4 ) { //Me aseguro que no sea un id que provenga desde la API.
        throw Error('No se puede eliminar un Pokemon de la API')

    } else { //si el id es mas largo que 4 caracteres...
        const dbPokemon = await Pokemon.findByPk(id) //Busco un pokemon por su id de la base de datos.

        if(!dbPokemon ) { ///Si no existe ese pokemon con ese id...
            throw Error(`No se puede eliminar el Pokemon con este id: ${id}`)
        }

    await dbPokemon.destroy()
    return { message: 'El Pokemon fue eliminado exitosamente', pokemon: dbPokemon}
    }
}



module.exports = { deletePokemon }