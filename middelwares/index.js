const validarCampos = require('../middelwares/validar-campos');
const validarJWT = require('../middelwares/validar-jwt');
const validarRol = require('../middelwares/validar-rol');

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validarRol
}
