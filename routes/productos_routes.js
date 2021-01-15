/*
    Ruta: /api/productos
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { getProductos, listarPorCodigo, crearProductos, modificarProductos, borrarProductos } = require('../controller/productos_controller');
const { validarCampos } = require('../middlewares/validar');
const { validarToken } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/', validarToken, getProductos );
router.get('/:codigo', validarToken, listarPorCodigo );
router.post( '/', 
             [  
                validarToken,
                check('nombre', 'El nombre del producto es necesario').not().isEmpty(),
                check('pVenta', 'El precio de venta es requerido').not().isEmpty(),
                validarCampos
             ],  
             crearProductos );
router.put( '/:id', 
            [ 
                validarToken,
                check('nombre', 'El nombre del producto es necesario').not().isEmpty(),
                check('pVenta', 'El precio de venta es requerido').not().isEmpty(),
                validarCampos
            ],
            modificarProductos );

router.delete( '/:id', validarToken, borrarProductos );

module.exports = router;