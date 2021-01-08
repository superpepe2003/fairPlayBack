
const { response } = require("express");
const Turno = require('../models/Turno_model');
const moment = require('moment');

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TRAE TODOS LOS TURNOS DE LA FECHA ENTRE LAS 0 HR Y 24, TAMBIEN LOS TURNOS FIJOS QUE TENGAN EL MISMO DIA //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

const listarTurnos = async(req, res = response ) => {

    const fecha = moment(req.query.fecha, 'YYYY-MM-DD').hours(0).minutes(0).seconds(0).toDate();
    let fecha2 = null;
    
    if ( !req.query.fecha2 ) {
        fecha2 = moment(fecha, 'YYYY-MM-DD').add(1, 'days').hours(0).minutes(0).seconds(0).toDate();
    } else {
        fecha2 = moment(req.query.fecha2, 'YYYY-MM-DD').hours(0).minutes(0).seconds(0).toDate();
    }

    const estado = req.query.estado || '';

    try {

        const turnosDB = await Turno.find({ $and: [{ "fecha": { "$gte":  fecha, "$lt": fecha2 }
                                             }, { estado: 'reservado' }]})
                                    .populate('cliente', 'nombreCompleto');

        let turnosCobradosDB = [];
        if( estado.length > 0 ) {
            turnosCobradosDB = await Turno.find({ $and: [{ "fecha": { "$gte":  fecha, "$lt": fecha2 }
                                                      }, { estado }]})
                                                .populate('cliente', 'nombreCompleto');
        }

        // const turnosFijo = await Turno.find( { $and: [ {"dia" : moment(fecha).day() },
        //                                          {"fecha" : {$ne: fecha}},
        //                                          {"tipo" : "fijo"}] } )
        //                              .populate('cliente', 'nombreCompleto');
                  

        turnos = [...turnosDB, ...turnosCobradosDB ];
                
        res.json({
            ok: true,
            total: turnos.length,
            turnos: turnos
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador',
            error
        });
    }

};


const listarTurnosFijos = async(req, res = response ) => {

    const fecha = moment(req.query.fecha, 'YYYY-MM-DD').hours(0).minutes(0).seconds(0).toDate();
    let fecha2 = null;
    
    if ( !req.query.fecha2 ) {
        fecha2 = moment(fecha, 'YYYY-MM-DD').add(1, 'days').hours(0).minutes(0).seconds(0).toDate();
    } else {
        fecha2 = moment(req.query.fecha2, 'YYYY-MM-DD').hours(0).minutes(0).seconds(0).toDate();
    }

    const estado = req.query.estado || 'reservado';

    try {

        const turnosFijo = await Turno.find( { $and: [ {"dia" : moment(fecha).day() },
                                                 {"fecha" : {$ne: fecha}},
                                                 {"tipo" : "fijo"}] } )
                                     .populate('cliente', 'nombreCompleto');
                  

        // turnos = [...turnosDB, ...turnosFijo ];
                
        res.json({
            ok: true,
            total: turnosFijo.length,
            turnos: turnosFijo
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador',
            error
        });
    }

};


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BUSCA TURNOS POR CANCHA, HORA, FECHA Y ESTADO QUE SEA RESERVA SI NO TRAE NADA, A SU VEZ BUSCA LOS FIJOS //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

const buscarTurnos = async( req, res =  response ) => {

    const cancha = req.query.cancha;
    const hora = req.query.hora;
    const fecha = moment(req.query.fecha, 'YYYY-MM-DD').hours(0).minutes(0).seconds(0).toDate();
    const estado = req.query.estado || '';

    try {

        const turnosDB = await Turno.find( { $and: [ { estado: 'reservado' }, {cancha }, { hora }, { fecha } ] })
                            .populate('cliente', 'nombreCompleto');

        let turnosCobradosDB = [];
        if( estado.length > 0 ) {
            turnosCobradosDB = await Turno.find( { $and: [ { estado }, { cancha }, { hora }, { fecha } ] })
                        .populate('cliente', 'nombreCompleto');
        }

        // const turnosFijo = await Turno.find( { $and: [ { estado }, { cancha }, { hora },
        //                                          {"dia" : moment(fecha).day() },
        //                                          {"fecha" : {$ne: fecha}},
        //                                          {"tipo" : "fijo"} ] } )
        //                         .populate('cliente', 'nombreCompleto');    

        turnos = [...turnosDB, ...turnosCobradosDB];

        res.json({
            ok: true,
            total: turnos.length,
            turnos: turnos
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador',
            error
        });
    }

};



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
        });
    }

};

const agregarTurno = async (req, res = response ) => {

    try {

        req.body.fecha = moment(req.body.fecha).hours(0).minutes(0).seconds(0).toDate();

        req.body.dia = moment(req.body.fecha).day();
    

        const turnosExiste = await Turno.find( { $and: [ { cancha: req.body.cancha }, 
            { hora: req.body.hora }, { fecha:  req.body.fecha }, { estado: 'reservado' }] });
 
        if( turnosExiste.length > 0 ) {
            return res.status(404).json({
                ok: false,
                msg: 'El turno en ese día y horario existe'
            });
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
        });
    }

};

const modificarTurno = async(req, res = response ) => {

    const id = req.params.id;

    try {

        if( req.body.fecha ) {
            req.body.fecha = moment(req.body.fecha).hours(0).minutes(0).seconds(0).toDate();
            req.body.dia = moment(req.body.fecha).day();
        }

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
        });
    }

};

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
        });
    }

};

module.exports = {
    listarTurnos,
    listarTodosTurnos,
    buscarTurnos,
    agregarTurno,
    modificarTurno,
    eliminarTurno
};