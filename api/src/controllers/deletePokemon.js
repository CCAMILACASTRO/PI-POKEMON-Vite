const { Pokemon } = require('../db')


const deletePokemon = async(id) => { // eliminar un pokemon de la base de datos.

    if(id.length <= 4 ) { //Me aseguro que no sea un id que provenga desde la API.
        throw Error('No se puede eliminar un Pokemon de la API')

    } else { 
        const dbPokemon = await Pokemon.findByPk(id) 

        if(!dbPokemon ) {
            throw Error(`No se puede eliminar el Pokemon con este id: ${id}`)
        }

    await dbPokemon.destroy()
    return { message: 'El Pokemon fue eliminado exitosamente', pokemon: dbPokemon}
    }
}



module.exports = { deletePokemon }