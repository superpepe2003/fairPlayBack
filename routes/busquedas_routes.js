//
//  /api/search
//

const { Router } = require('express');
const { getColeccion } = require('../controller/busquedas_controller');
const { validarToken } = require('../middlewares/validar-jwt');


const router = Router();

router.get('/:tabla/:busqueda', validarToken, getColeccion );
//router.get('/:tabla/:fechainicial/:fechafinal', getColeccionFecha);//

module.exports = router;