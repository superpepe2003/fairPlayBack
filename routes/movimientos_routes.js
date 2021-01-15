const { Router } = require('express');
const { check } = require('express-validator');
const { listarMovimientos, listarMovimientosFechas, agregarMovimiento, modificarMovimiento, eliminarMovimiento } = require('../controller/movimientos_controller');
const { validarCampos } = require('../middlewares/validar');
const { validarToken, validarAdmin } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/', [ validarToken, validarAdmin ],  listarMovimientos );
//router.get( '/total', total );
router.get( '/busqueda/', [ validarToken, validarAdmin],  listarMovimientosFechas );
router.post( '/',
            [
                validarToken, 
                validarAdmin,
                check('fecha', 'La Fecha es obligatoria').not().isEmpty(),
                validarCampos
            ],
            agregarMovimiento );

router.put( '/:id',
            [
                validarToken, 
                validarAdmin,
                check('fecha', 'La Fecha es obligatoria').not().isEmpty(),
                validarCampos
            ], 
            modificarMovimiento );

router.delete( '/:id', [ validarToken, validarAdmin ], eliminarMovimiento );

module.exports = router;