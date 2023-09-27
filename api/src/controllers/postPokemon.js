const { Pokemon, Type } = require('../db')

const postPokemon = async (createPokemon) => {  //objeto con los datos del pokemon creado en el formulario. 

    
    const { name, image, types, hp, attack, defense, speed, height, weight, createdInDb } = createPokemon;
    
    let typesDb = await Type.findOne({where: { name: types}})

    if (!name || !image || !types || !hp || !attack || !defense) { //props obligatorias
        throw Error  ('Faltan datos');
        
    } else if (!typesDb) {
        throw Error ('El tipo de pokemon seleccionado no existe')
    }

    const pokemonExist = await Pokemon.findOne({ 
        where: { name: name }
    });

    if (pokemonExist) {   //verifica si el pokemon existe en la base de datos.

        throw Error ('El pokemón ya existe, elija otro nombre.');
    }

    const pokemon = await Pokemon.create({ name, image, hp, attack, defense, speed, height, weight, createdInDb }); 

    let addTypes = await Type.findAll({ //Busca todos los tipos de pokemones en el modelo Type.
        where: { name: types }
    });

    await pokemon.addTypes(addTypes); // Relacion Pokemon y Type

    let newPokemon = await Pokemon.findByPk(pokemon.id, { //Busca el pokemon x id + nombre del tipo 
        include: {
            model: Type,
            attributes: ["name"],
            through: {
                attributes: []
            }
        }
    });

    return { message: 'El pokemon fue creado exitosamente', pokemon: newPokemon }; 
        
};

module.exports = { postPokemon }