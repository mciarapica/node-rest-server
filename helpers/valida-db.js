const Rol = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async(nombre = '') => {

    const existeRol = await Rol.findOne({ nombre });
    if ( !existeRol ) {
        throw new Error(`El rol ${ nombre } no está registrado en la BD`);
    }
}

const esCorreoValido = async(correo = '') => {
    
    const existeCorreo = await Usuario.findOne({ correo });
    if ( existeCorreo ) {
        throw new Error(`El correo ${ correo } ya se encuentra registrado en la BD`);
    }
}

const esIdValido = async(id) => {
    
    const existeId = await Usuario.findById(id);
    if ( !existeId ) {
        throw new Error(`El id ${ id } no está registrado en la BD`);
    }
}

module.exports = {esRolValido, esCorreoValido, esIdValido}