// =========================================
// RUTA: /api/login
// =========================================

const { Router } = require('express');
const { login, googleSigIn, renewToken } = require('../controller/auth_controller');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar');
const { validarToken } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/',[
                check('email', 'El email es obligatorio').isEmail(),
                check('password', 'El password es obligatorio').not().isEmpty(),
                validarCampos
            ], 
            login );


router.post('/google',[
                check('token', 'El token de Google es obligatorio').not().isEmpty(),
                validarCampos
            ], 
            googleSigIn );


router.get('/renew', 
            validarToken,
            renewToken );


module.exports = router;