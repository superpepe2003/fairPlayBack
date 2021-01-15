/*
    Ruta: /api/clientes
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { listarClientes, agregarCliente, modificarCliente, eliminarCliente, listarClientesTodos } = require('../controller/clientes_controller');
const { validarCampos } = require('../middlewares/validar');
const { validarToken } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/', validarToken, listarClientes );
router.get( '/todos/', validarToken, listarClientesTodos );
router.post( '/',
            [ 
                validarToken,
                check('nombreCompleto', 'El nombre es obligatorio').not().isEmpty(),
                validarCampos
            ],
            agregarCliente );

router.put( '/:id',
            [ 
                validarToken,
                check('nombreCompleto', 'El nombre del Cliente es obligatorio').not().isEmpty(),
                validarCampos
            ], 
            modificarCliente );

router.delete( '/:id', validarToken, eliminarCliente );

module.exports = router;