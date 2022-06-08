const { request, response } = require('express'); 

const validarRol = ( ...roles ) =>{

    return (req = request, res = response, next) => {

        if ( !req.usuario ) {
            return res.status(500).json({
                mensaje: 'Se intentó validar el Rol del usuario sin pasar por la validación del Token'
            })
        }

        if ( !roles.includes(req.usuario.rol) ) {
            return res.status(401).json({
                mensaje: 'El rol del usuario no tiene los permisos suficientes para realizar la acción'
            })
        }

        next();    
    }
}



module.exports = {
    validarRol
}