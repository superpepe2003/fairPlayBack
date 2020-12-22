/*
    Ruta: /api/categorias
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { listarCategorias, agregarCategoria, modificarCategoria, eliminarCategoria } = require('../controller/categorias_controller');
const { validarCampos } = require('../middlewares/validar');

const router = Router();

router.get( '/', listarCategorias );
router.post( '/',
            [
                check('nombre', 'El nombre de Categoria es obligatorio').not().isEmpty(),
                validarCampos
            ],
            agregarCategoria );

router.put( '/:id',
            [
                check('nombre', 'El nombre de Categoria es obligatorio').not().isEmpty(),
                validarCampos
            ], 
            modificarCategoria );

router.delete( '/:id', eliminarCategoria );

module.exports = router;