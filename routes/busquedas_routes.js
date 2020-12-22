//
//  /api/search
//

const { Router } = require('express');
const { getColeccion } = require('../controller/busquedas_controller');


const router = Router();

router.get('/:tabla/:busqueda', getColeccion );
//router.get('/:tabla/:fechainicial/:fechafinal', getColeccionFecha);//

module.exports = router;