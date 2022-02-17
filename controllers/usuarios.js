const res = require('Express').response;


const usuariosGet = (req, res) => {
    res.status(200).json({
        id: 90,
        descripcion: 'Lalalala',
        mensaje: 'Peticion exitosa'})
    } 

const usuariosPost =  (req, res) => {
    const {filtro} = req.query;
    const {nombre, edad} = req.body;
    res.status(200).json({
        id: 91,
        nombre,
        edad,
        filtro,
        mensaje: 'Registro insertado con éxito'})
  }        
  
 const usuariosPut = (req, res) => {

    const {id} = req.params
    res.status(200).json({
        id,
        mensaje: 'Registro modificado con éxito'})
  }

  const usuariosDelete = (req, res) => {
    res.status(200).json({
        id: 91,
        mensaje: 'Registro eliminado con éxito'})
  }

  const usuariosPatch = (req, res) => {
    res.status(200).json({
        id: 91,
        mensaje: 'Registro modificado con éxito'})
  }

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}