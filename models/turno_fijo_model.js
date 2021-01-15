const { Schema, model } = require('mongoose');

const TurnoFijoSchema = Schema({

    cancha: {
        type: String,
        required: true
    },
    hora: {
        type: Number,
        required: true
    },
    dia: {
        type: String
    },
    cliente: {
        type: Schema.Types.ObjectId,
        ref: 'Cliente'
    }

});

TurnoFijoSchema.method( 'toJSON', function (){

    const { __v, ...object } = this.toObject();
    return object;

});

module.exports = model( 'TurnoFijo', TurnoFijoSchema );