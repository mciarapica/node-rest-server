const { Router } = require('express');
const { check } = require('express-validator');
const {validarCampos} = require('../middelwares/validar-campos');
const {esRolValido, esCorreoValido, esIdValido} = require('../helpers/valida-db');
const {usuariosGet, usuariosPost, usuariosPut, usuariosDelete} = require('../controllers/usuarios');
const router = Router();

router.get('/', usuariosGet );

router.put('/:id', 
[
    check('id','No es un id válido').isMongoId(),
    check('id').custom(esIdValido),
    check('rol').custom(esRolValido),
    validarCampos
]
,usuariosPut );

router.post('/', 
[
    check('nombre','El nombre es obligatorio').not().isEmpty(),        
    check('contraseña','La contraseña debe tener como mínimo 6 caracteres').isLength({min:6}),   
    check('correo','El correo no es válido').isEmail(),   
    check('correo').custom(esCorreoValido),
    check('rol').custom(esRolValido),
    validarCampos 
]
,usuariosPost);

router.delete('/:id', 
[
    check('id','No es un id válido').isMongoId(),
    check('id').custom(esIdValido),
    validarCampos
] ,
usuariosDelete );


module.exports = router;