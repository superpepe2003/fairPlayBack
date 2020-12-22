
const { response } = require("express");
const Venta = require('../models/Venta_model');


const listarVentas = async(req, res = response ) => {

    try {

        ventasDB = await Venta.find({})
                        .populate('detalle.productoId');

        res.json({
            ok: true,
            total: ventasDB.length,
            ventas: ventasDB
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        })
    }

}

const agregarVenta = async (req, res = response ) => {

    try {

        const venta = new Venta( req.body );

        const ventaDB = await venta.save();

        res.json({
            ok: true,
            Venta: ventaDB
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        })
    }

}

const modificarVenta = async(req, res = response ) => {

    const id = req.params.id;

    try {

        const ventaDB = await Venta.findById( id );

        if( !ventaDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe la venta por ese id'
            });
        }

        ventaActualizada = await Venta.findByIdAndUpdate( id, req.body, { new: true });

        res.json({
            ok: true,
            venta: ventaActualizada
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        })
    }

}

const eliminarVenta = async(req, res = response ) => {

    const id = req.params.id;

    try {
        
        const ventaDB = await Venta.findById( id );

        if( !ventaDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe la venta por ese id'
            });
        }

        await Venta.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Venta Borrada'
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        })
    }

}

module.exports = {
    listarVentas,
    agregarVenta,
    modificarVenta,
    eliminarVenta
}