
const { response } = require('express');
const { validationResult } = require('express-validator');

const validarCampos = ( req, res = response, next ) => {

    const validarError = validationResult( req );

    if( !validarError.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: validarError.mapped()
        });
    }

    next();
}

module.exports = {
    validarCampos
}