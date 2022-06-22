const { Router } = require('express');
const { check } = require('express-validator');
const {validarCampos} = require('../middelwares');
const router = Router();
const {login,googleSingIn} = require('../controllers/auth');


router.post('/login', login);
router.post('/google', [
    check('id_token', 'id token es necesario').not().isEmpty(),
    validarCampos
], googleSingIn);


module.exports = router;