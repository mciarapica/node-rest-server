const Usuario = require('../models/usuario')
const res = require('express').response;
const bcrypt = require('bcryptjs');



const usuariosGet = async(req, res) => {
    
    //Leo parámetro, limite de registros, 5 por default
    const {skip = 0, limit = 5} = req.query;

    //Recupero la colección de registros
    const filter = {eliminado:false};
    const [total, usuarios] = await Promise.all([
        Usuario.count(filter),
        Usuario.find(filter)
        .limit(limit)
        .skip(skip)]
    ) 

    res.json({
        total,
        usuarios
    })
}

const usuariosPost =  async (req, res) => {
    //Leo algunos campos del body
    const {nombre, correo, contraseña, rol} = req.body;
    
    //instancio un registro (document) de usuario
    const usuario = new Usuario({nombre, correo, contraseña, rol});
    
    //encripto la contraseña
    const salt = bcrypt.genSaltSync()
    usuario.contraseña = bcrypt.hashSync(contraseña,salt);

    try {
        //grabo en la base
        await usuario.save();

        //respuesta exitosa
        res.json({
            mensaje: 'Usuario creado con éxito',
            usuario
        })

    } catch (error) {
        
        //devuelvo el error
        res.status(500).json(error)
    }
}        
  
 const usuariosPut = async (req, res) => {

    const {id} = req.params;

    //Aparto los campos que no quiero pisar con el put y tomo el resto para actualizar
    const {_id ,contraseña, google, correo, ...resto} = req.body;

    //encripto la contraseña si viene informada
    if (contraseña) { 
    const salt = bcrypt.genSaltSync()
    resto.contraseña = bcrypt.hashSync(contraseña,salt);
    }

    try {
        //Actualizo usuario
        const usuario = await Usuario.findByIdAndUpdate(id, resto);

        //respuesta exitosa
        res.json({
            mensaje: 'Usuario actualizado con éxito',
            usuario
        })

    } catch (error) {
        
        //devuelvo el error
        res.status(500).json(error)
    }


    }

  const usuariosDelete = async (req, res) => {

    const {id} = req.params;
    try {
        //Baja lógica
        const usuario = await Usuario.findByIdAndUpdate(id,{eliminado:true});

        //respuesta exitosa
        res.json({
            usuario
        })

    } catch (error) {
        
        //devuelvo el error
        res.status(500).json(error)
    }
  }


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}