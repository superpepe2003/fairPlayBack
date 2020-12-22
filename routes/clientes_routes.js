/*
    Ruta: /api/clientes
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { listarClientes, agregarCliente, modificarCliente, eliminarCliente, listarClientesTodos } = require('../controller/clientes_controller');
const { validarCampos } = require('../middlewares/validar');

const router = Router();

router.get( '/', listarClientes );
router.get( '/todos/', listarClientesTodos );
router.post( '/',
            [
                check('nombreCompleto', 'El nombre es obligatorio').not().isEmpty(),
                validarCampos
            ],
            agregarCliente );

router.put( '/:id',
            [
                check('nombreCompleto', 'El nombre del Cliente es obligatorio').not().isEmpty(),
                validarCampos
            ], 
            modificarCliente );

router.delete( '/:id', eliminarCliente );

module.exports = router;