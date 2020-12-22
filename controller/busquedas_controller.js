
const { response } = require('express');

const Producto = require('../models/producto_model');
const Cliente = require('../models/cliente_model');

const getColeccion = async( req, res = response ) => {

    const tabla = req.params.tabla;
    const buscar = req.params.busqueda;

    const regex = new RegExp( buscar, 'i' );

    let data = [];

    try {

        switch (tabla) {
            case 'productos':
                data = await Producto.find({ $or: [ {nombre: regex }, {codBarra: regex} ] });
                break;
            case 'clientes':
                data = await Cliente.find({ nombreCompleto: regex });
                break;
            default:
                return res.status(400).json({
                    ok: false,
                    msg: 'la tabla tiene que ser usuarios/medicos/hospitales'
                });
                break;
        }

        res.json({
            ok: true,
            resultados: data
        });
        
    } catch (error) {
        
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        })

    }


}

module.exports = {
    getColeccion
}