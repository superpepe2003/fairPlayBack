
const { response } = require("express");
const Turno = require('../models/Turno_model');
const moment = require('moment');


const listarTurnos = async(req, res = response ) => {

    const fecha = moment(req.query.fecha).hours(0).minutes(0).seconds(0);

    const estado = req.query.estado || 'reserva';

    console.log(estado);

    const fecha2 = moment(fecha)
                            .add(2, "days" )
                            .hours(0).minutes(0).seconds(0)
                            .toDate();

    try {

        turnosDB = await Turno.find({ $and: [{ "fecha":
                        { "$gte":  fecha, "$lt": fecha2 }
                    }, { estado }]}).populate('cliente', 'nombreCompleto');
        // turnosDB = await Turno.find({ "fecha":
        //                 { "$gte":  fecha, "$lt": fecha2 }
        //             }).populate('cliente', 'nombreCompleto');
                
        res.json({
            ok: true,
            total: turnosDB.length,
            turnos: turnosDB
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador',
            error
        })
    }

}

const buscarTurnos = async( req, res =  response ) => {

    const cancha = req.query.cancha;
    const hora = req.query.hora;
    const fecha = moment(req.query.fecha, 'YYYY-MM-DD').hours(0).minutes(0).seconds(0);
    const estado = req.query.estado || 'reserva';


    try {

        turnosDB = await Turno.find( { $and: [ { estado }, {cancha }, { hora }, { fecha } ] })
                            .populate('idCliente', 'nombreCompleto');


        res.json({
            ok: true,
            total: turnosDB.length,
            turnos: turnosDB
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador',
            error
        })
    }

}

const listarTodosTurnos = async(req, res = response ) => {


    try {

        turnosDB = await Turno.find({ })
                            .populate('idCliente', 'nombreCompleto');
                
        res.json({
            ok: true,
            total: turnosDB.length,
            turnos: turnosDB
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador',
            error
        })
    }

}

const agregarTurno = async (req, res = response ) => {

    try {

        req.body.fecha = moment(req.body.fecha).hours(0).minutes(0).seconds(0).toDate();
    

        const turnosExiste = await Turno.find( { $and: [ { cancha: req.body.cancha }, 
            { hora: req.body.hora }, { fecha:  req.body.fecha }, { estado: 'reservado' }] });
 
        console.log(turnosExiste.length)
        if( turnosExiste.length > 0 ) {
            return res.status(404).json({
                ok: false,
                msg: 'El turno en ese día y horario existe'
            })
        }

        const turno = new Turno( req.body );

        const turnoDB = await turno.save();

        res.json({
            ok: true,
            turno: turnoDB
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        })
    }

}

const modificarTurno = async(req, res = response ) => {

    const id = req.params.id;

    try {

        req.body.fecha = moment(req.body.fecha).hours(0).minutes(0).seconds(0).toDate();

        const turnoDB = await Turno.findById( id );

        if( !turnoDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el turno por ese id'
            });
        }

        turnoActualizada = await Turno.findByIdAndUpdate( id, req.body, { new: true });

        res.json({
            ok: true,
            turno: turnoActualizada
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        })
    }

}

const eliminarTurno = async(req, res = response ) => {

    const id = req.params.id;

    try {
        
        const turnoDB = await Turno.findById( id );

        if( !turnoDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el turno por ese id'
            });
        }

        await Turno.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Turno Borrada'
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        })
    }

}

module.exports = {
    listarTurnos,
    listarTodosTurnos,
    buscarTurnos,
    agregarTurno,
    modificarTurno,
    eliminarTurno
}