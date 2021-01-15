const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const Usuario = require('../models/usuario_model');
const { getMenuFrontEnd } = require('../helpers/menu-frontend');

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {
        
        // Verificar Email
        const usuarioDB = await Usuario.findOne({ email });

        if( !usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'Email/Contraseña no válida'
            });
        }

        // Verificar contraseña
        const validPassword = bcrypt.compareSync( password, usuarioDB.password );

        console.log(usuarioDB);

        if( !validPassword ) {
            
            res.status(400).json({
                ok: false,
                msg: 'Email/Contraseña no válida'
            });
            
        }

        // Generar un TOKEN - JWT
        const token = await generarJWT( usuarioDB._id );
        res.json({
            ok: true,
            token,
            menu: getMenuFrontEnd( usuarioDB.role )
        });

        
    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
};

const googleSigIn = async( req, res = response ) => {

    const googleToken = req.body.token;

    try {
        const { name, email, picture } = await googleVerify( googleToken );

        // Verificar si ya existe con ese mail un usuario
        const usuarioDB = await Usuario.findOne({ email });
        let usuario;


        if( !usuarioDB ){
            // Si no existe el usuario
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            // existe usuario
            usuario = usuarioDB;
            usuario.google = true;
            //usuario.password = '@@@';
        }

        await usuario.save();
        const token = await generarJWT( usuario.id );
        res.json({
            ok: true,
            token,
            menu: getMenuFrontEnd( usuario.role )
        });

    } catch (error) {
        
        res.status(401).json({
            ok: false,
            msg: 'token no es correcto',
            error
        });

    }
    
};

const renewToken = async( req, res=response ) => {

    const uid = req.uid;

    // Generar nuevo token
    const token = await generarJWT( uid );

    // Obterner el usuario por UID
    usuarioDB = await Usuario.findById( uid );

    res.json( {
        ok: true,
        token, 
        usuario: usuarioDB,
        menu: getMenuFrontEnd( usuarioDB.role )
    });
};

module.exports = {
    login,
    renewToken,
    googleSigIn
};