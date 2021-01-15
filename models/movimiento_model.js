const { Schema, model } = require('mongoose');

const MovimientoSchema = Schema({
    
    descripcion: {
        type: String
    },
    monto: {
        type: Number,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    }, 
    tipo: {
        type: Number,
    }
});

MovimientoSchema.method( 'toJSON', function (){

    const { __v, ...object } = this.toObject();
    return object;

});

module.exports = model('Movimiento', MovimientoSchema);