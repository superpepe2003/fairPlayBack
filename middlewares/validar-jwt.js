const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario_model');


const validarToken = ( req, res, next ) => {

    const token = req.header('x-token');

    if( !token ){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }

    try {
        
        const { uid } = jwt.verify( token, process.env.JWT_SECRET );
        req.uid = uid;
        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token incorrecto'
        });
    }

};



const validarAdmin = async( req, res, next ) => {

    const uid = req.uid;

    try {
        const usuarioDB = await Usuario.findById( uid );

        if( !usuarioDB ){
            return res.status(400).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        console.log(usuarioDB);
        
        if( usuarioDB.role !== 'ADMIN_ROLE'){
            return res.status(403).json({
                ok: false,
                msg: 'No tiene privilegios de administrador'
            });
        }
        
        next();

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

};

module.exports = {
    validarToken,
    validarAdmin
};