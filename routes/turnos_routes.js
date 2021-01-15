/*
    Ruta: /api/categorias
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { listarTurnos, listarTodosTurnos, buscarTurnos, agregarTurno, modificarTurno, eliminarTurno } = require('../controller/turnos_controller');
const { validarCampos } = require('../middlewares/validar');
const { validarToken } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/', validarToken, listarTurnos );
router.get( '/todos/', validarToken, listarTodosTurnos );
router.get( '/buscar/', validarToken, buscarTurnos );
router.post( '/',
            [
                validarToken,
                check('cancha', 'La cancha es obligatoria').not().isEmpty(),
                check('cliente', 'El cliente es obligatorio').not().isEmpty(),
                check('fecha', 'La fecha es obligatoria').not().isEmpty(),
                validarCampos
            ],
            agregarTurno );

router.put( '/:id',
            [
                validarToken,
                // check('cancha', 'La cancha es obligatoria').not().isEmpty(),
                // check('fecha', 'La fecha es obligatoria').not().isEmpty(),
                // validarCampos
            ], 
            modificarTurno );

router.delete( '/:id', validarToken, eliminarTurno );

module.exports = router;