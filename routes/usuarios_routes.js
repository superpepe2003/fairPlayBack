// =========================================
// RUTA: /api/usuarios
// =========================================

const { Router } = require('express');
const { getUsuarios, crearUsuarios, updateUsuarios, deleteUsuario } = require('../controller/usuarios_controller');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar');
const { validarToken, validarAdmin } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/', 
            [ validarToken, validarAdmin ],
            getUsuarios );

router.post( '/', 
    [
        validarToken, 
        validarAdmin,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos
    ], 
    crearUsuarios );

router.put( '/:id',
            [
                validarToken, 
                validarAdmin,
                check('nombre', 'El nombre es obligatorio').not().isEmpty(),
                check('email', 'El email es obligatorio').isEmail(),
                validarCampos,
            ], updateUsuarios );

router.delete( '/:id', 
               [ validarToken, validarAdmin ], 
               deleteUsuario);

module.exports = router;