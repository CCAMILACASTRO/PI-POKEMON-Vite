const { Pokemon, Type } = require('../db')

const postPokemon = async (createPokemon) => {  //me llega por body , en forma de objeto,  los datos del pokemon creado en el formulario. 


    const { name, image, types, hp, attack, defense, speed, height, weight, createdInDb } = createPokemon;

    let typesDb = await Type.findOne({where: { name: types}})

    if (!name || !image || !types) { //Si no manda las props obligatorias lanza un error.

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

    const pokemon = await Pokemon.create({ name, image, hp, attack, defense, speed, height, weight, createdInDb }); // crea un nuevo pokemon con estos atributos.

    let addTypes = await Type.findAll({ //Busca todos los tipos de pokemones en el modelo Type.
        where: { name: types }
    });

    await pokemon.addTypes(addTypes); // le agrega al nuevo pokemon los tipos del modelo Type.

    let newPokemon = await Pokemon.findByPk(pokemon.id, { //Busca el pokemon x id y le agrega el nombre del tipo que le corresponde
        include: {
            model: Type,
            attributes: ["name"],
            through: {
                attributes: []
            }
        }
    });

    return { message: 'El pokemon fue creado exitosamente', pokemon: newPokemon }; // retorna pokemon creado y mensaje.
        
};

module.exports = { postPokemon }