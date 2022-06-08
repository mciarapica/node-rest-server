const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const {login} = require('../controllers/auth');


router.post('/login', login);


module.exports = router;