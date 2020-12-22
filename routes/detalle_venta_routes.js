/*
    Ruta: /api/categorias
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { listarDetalleVentas, agregarDetalleVenta, modificarDetalleVenta, eliminarDetalleVenta } = require('../controller/detalle_ventas_controller');

const router = Router();

router.get( '/', listarDetalleVentas );
router.post( '/',
            agregarDetalleVenta );

router.put( '/:id', 
            modificarDetalleVenta );

router.delete( '/:id', eliminarDetalleVenta );

module.exports = router;