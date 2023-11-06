const { Pokemon, Type } = require('../db')

const postPokemon = async (createPokemon) => {   

    
    const { name, image, types, hp, attack, defense, speed, height, weight, createdInDb } = createPokemon;
    
    let typesDb = await Type.findOne({where: { name: types}})

    if (!name || !image || !types || !hp || !attack || !defense) { 
        throw Error  ('Faltan datos');
        
    } else if (!typesDb) {
        throw Error ('El tipo de pokemon seleccionado no existe')
    }

    const pokemonExist = await Pokemon.findOne({ 
        where: { name: name }
    });

    if (pokemonExist) {   

        throw Error ('El pokemón ya existe, elija otro nombre.');
    }

    const pokemon = await Pokemon.create({ name, image, hp, attack, defense, speed, height, weight, createdInDb }); 

    let addTypes = await Type.findAll({ 
        where: { name: types }
    });

    await pokemon.addTypes(addTypes); 

    let newPokemon = await Pokemon.findByPk(pokemon.id, { 
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