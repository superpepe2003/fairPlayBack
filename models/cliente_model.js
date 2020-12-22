
const { Schema, model } = require('mongoose');

const ClienteSchema = Schema({

    nombreCompleto : {
        type: String,
        required: true
    },
    telefono: {
        type: String
    },
    instagram: {
        type: String
    },
    fechaNac: {
        type: Date
    },
    img: {
        type: String
    }

});

ClienteSchema.method( 'toJSON', function (){

    const { __v, ...object } = this.toObject();
    return object;

});

module.exports = model('Cliente', ClienteSchema);