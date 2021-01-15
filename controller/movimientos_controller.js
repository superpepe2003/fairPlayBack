const { response } = require("express");
const Movimiento = require('../models/movimiento_model');
const Venta = require('../models/Venta_model');

const moment = require('moment');


const listarMovimientos = async(req, res = response ) => {

    const desde = Number(req.query.desde) || 0;
    const hasta = Number(req.query.hasta) || 5;
    const tipo = req.query.tipo || -1;

    try {

        let movimientosDB = null;
        let total = 0;

        if( tipo.length >= 0 ) {

            [movimientosDB, total] = await Promise.all([
                Movimiento.find({ tipo }).skip(desde).limit(hasta),
                Movimiento.countDocuments()
            ]);

        } else {
            [movimientosDB, total] = await Promise.all([
                Movimiento.find({ }).skip(desde).limit(hasta),
                Movimiento.countDocuments()
            ]);

        }

        res.json({
            ok: true,
            total: total,
            movimientos: movimientosDB
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador',
            error
        });
    }

}


const listarMovimientosFechas = async(req, res = response ) => {

    fecha1 = moment(req.query.fechaInicial, 'YYYY-MM-DD').hours(0).minutes(0).seconds(0).toDate();
    
    let fecha2 = null;
    
    if ( !req.query.fechaFinal ) {
        fecha2 = moment(fecha1, 'YYYY-MM-DD').add(1, 'days').hours(23).minutes(59).seconds(59).toDate();
    } else {
        fecha2 = moment(req.query.fechaFinal, 'YYYY-MM-DD').hours(23).minutes(59).seconds(59).toDate();
    }

    const tipo = req.query.tipo || -1;

    try {

        let movimientosDB = null;
        if( tipo.length >= 0 ){
            movimientosDB = await Movimiento.find( { $and: [{ "fecha": { "$gte":  fecha1, "$lt": fecha2 }},  {tipo} ] });
        } else {
            movimientosDB = await Movimiento.find(  { "fecha": { "$gte":  fecha1, "$lt": fecha2 }} );
        }

        const totalEnCaja = await total( fecha2 );

        res.json({
            ok: true,
            total: movimientosDB.length,
            totalEnCaja,
            movimientos: movimientosDB
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador',
            error
        });
    }

};

const total = async( fecha ) => {

        const gastos = await Movimiento.aggregate( [ 
            {
                $match:  { $and: [ { "fecha": { "$lt": fecha } }, { tipo: 0} ] }  
            },
            {
                $group: {
                  _id : null,
                  total: {
                    $sum: "$monto"
                  }
                }
              }
        ]);

        const ingresos = await Movimiento.aggregate( [ 
            {
                $match:  { $and: [ { "fecha": { "$lt": fecha } }, { tipo: 1} ] }  
            },
            {
                $group: {
                  _id : null,
                  total: {
                    $sum: "$monto"
                  }
                }
              }
        ]);

        const ventas = await Venta.aggregate([
            {
                $match: { "fecha": { "$lt": fecha } }   
            },
            {
                $group: {
                  _id : null,
                  total: {
                    $sum: "$monto"
                  }
                }
              }
        ]);

        let total = 0;
        if( ventas[0] ) {
            total += ventas[0].total;
        }
        if( ingresos[0] ) {
            total += ingresos[0].total;
        }
        if( gastos[0] ) {
            total -= gastos[0].total;
        }

       return total;

};

const agregarMovimiento = async (req, res = response ) => {

    const body = req.body;

    try {

        const movimiento = new Movimiento( req.body );

        const movimientosDB = await movimiento.save();

        res.json({
            ok: true,
            movimientos: movimientosDB
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador',
            errors: error
        })
    }

}

const modificarMovimiento = async(req, res = response ) => {

    const id = req.params.id;

    try {

        const MovimientosDB = await Movimiento.findById( id );

        if( !MovimientosDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el movimiento por ese id'
            });
        }

        movimientoModificado = await Movimiento.findByIdAndUpdate( id, req.body, { new: true });

        res.json({
            ok: true,
            movimiento: movimientoModificado
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        })
    }

}

const eliminarMovimiento = async(req, res = response ) => {

    const id = req.params.id;

    try {
        
        const MovimientosDB = await Movimiento.findById( id );

        if( !MovimientosDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el Movimiento por ese id'
            });
        }

        await Movimiento.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Movimiento Borrado'
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        })
    }

}

module.exports = {
    listarMovimientos,
    listarMovimientosFechas,
    agregarMovimiento,
    modificarMovimiento,
    eliminarMovimiento
}