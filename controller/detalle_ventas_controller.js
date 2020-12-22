
const { response } = require("express");
const DetalleVenta = require('../models/detalle_venta_model');


const listarDetalleVentas = async(req, res = response ) => {

    try {

        detalleVentasDB = await DetalleVenta.find({});

        res.json({
            ok: true,
            total: detalleVentasDB.length,
            detalleVentas: detalleVentasDB
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        })
    }

}

const agregarDetalleVenta = async (req, res = response ) => {

    try {

        const detalleVenta = new DetalleVenta( req.body );

        const detalleVentaDB = await detalleVenta.save();

        res.json({
            ok: true,
            detalleVenta: detalleVentaDB
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        })
    }

}

const modificarDetalleVenta = async(req, res = response ) => {

    const id = req.params.id;

    try {

        const detalleVentaDB = await DetalleVenta.findById( id );

        if( !detalleVentaDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el detalle de venta por ese id'
            });
        }

        detalleVentaActualizada = await DetalleVenta.findByIdAndUpdate( id, req.body, { new: true });

        res.json({
            ok: true,
            detalleVenta: detalleVentaActualizada
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        })
    }

}

const eliminarDetalleVenta = async(req, res = response ) => {

    const id = req.params.id;

    try {
        
        const detalleVentaDB = await DetalleVenta.findById( id );

        if( !detalleVentaDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el detalle de venta por ese id'
            });
        }

        await DetalleVenta.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'DetalleVenta Borrada'
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        })
    }

}

module.exports = {
    listarDetalleVentas,
    agregarDetalleVenta,
    modificarDetalleVenta,
    eliminarDetalleVenta
}