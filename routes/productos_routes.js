/*
    Ruta: /api/productos
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { getProductos, crearProductos, modificarProductos, borrarProductos } = require('../controller/productos_controller');
const { validarCampos } = require('../middlewares/validar');

const router = Router();

router.get( '/', getProductos );
router.post( '/', 
             [ 
                check('nombre', 'El nombre del producto es necesario').not().isEmpty(),
                check('pVenta', 'El precio de venta es requerido').not().isEmpty(),
                validarCampos
             ],  
             crearProductos );
router.put( '/:id', 
            [
                check('nombre', 'El nombre del producto es necesario').not().isEmpty(),
                check('pVenta', 'El precio de venta es requerido').not().isEmpty(),
                validarCampos
            ],
            modificarProductos );

router.delete( '/:id', borrarProductos );

module.exports = router;