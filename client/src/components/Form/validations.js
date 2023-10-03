
const validations = (form, name,  errors) => {

    //Nombre:
    if(name === 'name'){
        if (!form.name.length) { 
            errors.name = "Ingrese un nombre";
        } else if (form.name.length > 20) {
            errors.name = 'El nombre no puede superar los 20 caracteres.'
        } else if (!/^[a-zA-Z]+$/.test(form.name)) { 
            errors.name = "Hay un error en el nombre";
        } else {
            errors.name = ''; // Restablecer el error a cadena vacía si no hay error.
        }
    }
    

    // Cualidades:
    if(name === 'hp') {
        const hp = parseInt(form.hp)
        if (isNaN(hp) || hp < 1 || hp > 255) {
            errors.hp = 'Debe seleccionar un número entre 1 y 255'
        } else {
            errors.hp = '';
        }

    }
    
    if(name === 'attack'){
        const attack = parseInt(form.attack)
        if (isNaN(attack) || attack < 1 || attack > 255) {
            errors.attack = 'Debe seleccionar un número entre 1 y 255'
        } else {
            errors.attack = '';
        }
    }

    if(name === 'defense'){
        const defense = parseInt(form.defense)
        if (isNaN(defense) || defense < 1 || defense > 255) {
            errors.defense = 'Debe seleccionar un número entre 1 y 255'
        } else {
            errors.defense = '';
        } 
    }


    if(name === 'speed'){
        const speed = parseInt(form.speed)
        if (isNaN(speed) || speed < 1 || speed > 255) {
            errors.speed = 'Debe seleccionar un número entre 1 y 255'
        } else {
            errors.speed = '';
        }
    }


    if(name === 'height'){
        const height = parseInt(form.height)
        if (isNaN(height) || height < 1 || height > 255) {
            errors.height = 'Debe seleccionar un número entre 1 y 255'
        } else {
            errors.height = '';
        }
        
    }


    if(name === 'weight'){
        const weight = parseInt(form.weight)
        if (isNaN(weight) || weight < 1 || weight > 255) {
            errors.weight = 'Debe seleccionar un número entre 1 y 255'
        } else {
            errors.weight = '';
        } 
    }

    // Imagen:

    if(name === 'image'){
        if (!form.image) {
            errors.image = 'Debe ingresar una imágen'
        } else if (!/^https?:\/\/\S+$/.test(form.image)) {
            errors.image = "Ingrese una URL válida";
        } else {
            errors.image = '';
        }
    }

    // Tipo:
    
    if (form.types.length === 0) {
        errors.types = 'Debe seleccionar al menos un tipo'
    } else if (form.types.length >= 2) {
        errors.types = 'No puede seleccionar más de 2 tipos'
    } else {
        errors.types = '';
    } 

    return errors;
}

export default validations;