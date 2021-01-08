
const { response } = require("express");
const Venta = require('../models/Venta_model');
const Turno = require('../models/Turno_model');
const moment = require('moment');
const db = require('mongoose');

const listarVentas = async(req, res = response ) => {

    const fecha = moment(req.query.fechaInicial, 'YYYY-MM-DD').hours(0).minutes(0).seconds(0).toDate();
    const fecha2 = moment(req.query.fechaFinal, 'YYYY-MM-DD').hours(23).minutes(59).seconds(59).toDate();
    
    console.log(fecha);
    console.log(fecha2);

    try {

        ventasDB = await Venta.find({ "fecha": { "$gte":  fecha, "$lt": fecha2 }})
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
        });
    }

};

const agregarVenta = async (req, res = response ) => {

    const venta = req.body;

    try {
        const session = db.startSession();
        (await session).startTransaction();
        
        venta.turnos.forEach( async (r) =>  {
            let turnoDB = await Turno.findById( r.turno );
            
            console.log(turnoDB);

            if( turnoDB ){
                turnoDB.estado = "cobrado";
                turnoModificado = await Turno.findByIdAndUpdate( turnoDB._id, turnoDB, { new: true } );
            }
            
        });
        
        const _venta = new Venta( venta );
        
        const ventaDB = await _venta.save();

        (await session).commitTransaction();
        (await session).endSession();

        res.json({
            ok: true,
            Venta: ventaDB
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        });
    }

};

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
        });
    }

};

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
        });
    }

};

module.exports = {
    listarVentas,
    agregarVenta,
    modificarVenta,
    eliminarVenta
};