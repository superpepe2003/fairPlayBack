/*
    Ruta: /api/categorias
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { listarVentas, agregarVenta, modificarVenta, eliminarVenta } = require('../controller/ventas_controller');
const { validarCampos } = require('../middlewares/validar');

const router = Router();

router.get( '/', listarVentas );
router.post( '/',
            [
                check('fecha', 'La Fecha es obligatoria').not().isEmpty(),
                validarCampos
            ],
            agregarVenta );

router.put( '/:id',
            [
                check('fecha', 'La Fecha es obligatoria').not().isEmpty(),
                validarCampos
            ], 
            modificarVenta );

router.delete( '/:id', eliminarVenta );

module.exports = router;