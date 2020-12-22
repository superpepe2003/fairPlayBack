
const { Schema, model } = require('mongoose');

const TurnoSchema = Schema({

    cancha: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    hora: {
        type: Number,
        required: true
    },
    dia: {
        type: String
    },
    precio: {
        type: Number
    },
    cliente: {
        type: Schema.Types.ObjectId,
        ref: 'Cliente'
    },
    estado: {
        type: String
    },
    tipo: {
        type: String
    },
    descripcion: {
        type: String
    }

});

TurnoSchema.method( 'toJSON', function (){

    const { __v, ...object } = this.toObject();
    return object;

});

module.exports = model( 'Turno', TurnoSchema );