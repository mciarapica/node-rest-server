const res = require('express').response;
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

const login =  async (req, res) => {
    
    const {correo, password} = req.body;
    
    try {

        //verificar si el mail existe
        const usuario = await Usuario.findOne({correo});

        if ( !usuario ) {
            return res.status(400).json({
                mensaje: 'Usuario / password incorrectos',
                detalle: 'Correo Inválido'
            })
        } 

        //verificar si el usuario esta activo
        if ( usuario.eliminado ) {
            return res.status(401).json({
                mensaje: 'Usuario / password incorrectos',
                detalle: 'Usuario Inactivo'
            })
        } 

        //verificar la contraseña
        const passwordOK = bcryptjs.compareSync(password,usuario.contraseña);

        if ( !passwordOK ) {
            return res.status(400).json({
                mensaje: 'Usuario / Password incorrectos',
                detalle: 'Contraseña Incorrecta'
            })
        }

        //Generar el JWT  
        const token = generarJWT(usuario.id);

        if (token) {
            return res.status(200).json({
            usuario: usuario,
            token: token
            })
        } else {
            return res.status(400).json({
                mensaje: 'No se pudo generar el Token'
            })
        } 

    } catch (error) {
        
        //devuelvo el error
        return res.status(500).json({
            mensaje: error
        })
    }
}   

const googleSingIn =  async (req, res) => {

    const {id_token} = req.body;

    try {

        const { email, name, picture } = await googleVerify( id_token );

        const correo = email;

        //verificar si el usuario existe
        let usuario = await Usuario.findOne({ correo });


        if ( !usuario ) {
            //Creo el usuario
            const data = {
                correo: email,
                nombre: name,
                img: picture,
                contraseña: 'blabla',
                google: true
            }

            usuario = new Usuario( data );
            await usuario.save();     
        } 

        // Verifico si esta activo
        if ( usuario.eliminado ) {
            return res.status(401).json({
                mensaje: 'Usuario / password incorrectos',
                detalle: 'Usuario Inactivo'
            })
        }

        //Generar el JWT  
        const token = generarJWT(usuario.id);

        if (token) {
            return res.status(200).json({
            usuario: usuario,
            token: token
            })
        } else {
            return res.status(400).json({
                mensaje: 'No se pudo generar el Token'
            })
        } 

    } catch ( error ) {
        return res.status(400).json({
                mensaje: 'El token no se pudo verificar'
            })
    }
}

module.exports = {
    login,
    googleSingIn
}