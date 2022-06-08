const { request, response } = require('express'); 
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');


//Valido que el token recibido en el header Authorization sea válido
const validarJWT = async (req = request, res = response, next) => {
    
    const token = req.header('Authorization');
    
    if ( !token ) {
        return res.status(401).json(
            {
                mensaje: 'Token no válido: no se envió token'
            }
        )
    } 

    try {
        //Recupero el payload
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        //Valido el usuario
        const usuario = await Usuario.findById( uid );
        
        if ( !usuario ) {
            return res.status(401).json({
                mensaje: 'Token no válido: el usuario no existe en la base'
            })
        }

        if ( usuario.eliminado ) {
            return res.status(401).json({
                mensaje: 'Token no válido: usuario inactivo'
            })
        }

        req.usuario = usuario; 
        next() ;

    } catch (error) {

        console.log(error);
        return res.status(401).json({
            mensaje: 'Token no válido'
        })
    }

}


module.exports = {
    validarJWT
}