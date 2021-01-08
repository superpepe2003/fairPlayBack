/*
    Ruta: /api/categorias
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { listarTurnos, listarTodosTurnos, buscarTurnos, agregarTurno, modificarTurno, eliminarTurno } = require('../controller/turnos_controller');
const { validarCampos } = require('../middlewares/validar');

const router = Router();

router.get( '/', listarTurnos );
router.get( '/todos/', listarTodosTurnos );
router.get( '/buscar/', buscarTurnos );
router.post( '/',
            [
                check('cancha', 'La cancha es obligatoria').not().isEmpty(),
                check('fecha', 'La fecha es obligatoria').not().isEmpty(),
                validarCampos
            ],
            agregarTurno );

router.put( '/:id',
            [
                // check('cancha', 'La cancha es obligatoria').not().isEmpty(),
                // check('fecha', 'La fecha es obligatoria').not().isEmpty(),
                // validarCampos
            ], 
            modificarTurno );

router.delete( '/:id', eliminarTurno );

module.exports = router;