/*
    Ruta: /api/ventas
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { listarVentas, agregarVenta, modificarVenta, eliminarVenta } = require('../controller/ventas_controller');
const { validarCampos } = require('../middlewares/validar');
const { validarToken, validarAdmin } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/', validarToken, listarVentas );
router.post( '/',
            [
                validarToken,
                check('fecha', 'La Fecha es obligatoria').not().isEmpty(),
                validarCampos
            ],
            agregarVenta );

router.put( '/:id',
            [
                validarToken,
                check('fecha', 'La Fecha es obligatoria').not().isEmpty(),
                validarCampos
            ], 
            modificarVenta );

router.delete( '/:id', 
                [ validarToken, validarAdmin],
                eliminarVenta );

module.exports = router;