const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario_model');
const { generarJWT } = require('../helpers/jwt');
const usuario = require('../models/usuario_model');

const getUsuarios = async (req, res) => {

    const desde = Number(req.query.desde) || 0;

    const [ usuarios, total ] = await Promise.all([
        Usuario
            .find({}, 'nombre email role google img')
            .skip( desde )
            .limit(5),
        Usuario.countDocuments()
    ]);

    res.json({
        ok: true,
        usuarios,
        total
    });
    
};


const crearUsuarios = async(req, res = response) => {

    const { email, password, nombre} =  req.body;

    try {

        const existeEmail = await Usuario.findOne({ email });

        if( existeEmail ){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya existe'
            });
        }

        const usuario = new Usuario( req.body );

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        await usuario.save();

        const token = await generarJWT(usuario._id);

        res.json({
            ok: true,
            usuario,
            token
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado en la Base de Datos'
        });
    }

    
};

const updateUsuarios = async( req, res = response) => {

    // TODO: Validar token y comprobar si el usuario es correcto

    const uid = req.params.id;
    
    try {

        const usuarioDB = await Usuario.findById( uid );

        if( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        // Actualizaciones
        const { password, email, ...campos} = req.body;

        if( usuarioDB.email !== email ){
            const existeEmail = await Usuario.findOne({ email });
            if( existeEmail ){
                console.log( 'estoy' );
                return res.status(401).json({
                    ok: false,
                    msg: 'El email que quiere modificar esta en uso'
                });
            }            
        }

        // if ( !usuarioDB.google ) {
        campos.email = email;
        // } else if ( usuarioDB.email !== email ) {
        //     return res.status(400).json({
        //         ok: false,
        //         msg: 'Usuario de google no pueden cambiar su correo'
        //     });
        // }

        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true } );
        

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });
        
    } catch (error) {
        console.log('Error ', error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
};

const deleteUsuario = async( req, res = response) => { 

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById( uid );

        if( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        await Usuario.findByIdAndDelete( uid );

        res.json({
            ok: true,
            msg: 'Usuario eliminado'
        });
        
    } catch (error) {
        console.log('Error ', error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }

};

module.exports = {
    getUsuarios,
    crearUsuarios,
    updateUsuarios,
    deleteUsuario
};