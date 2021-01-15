const { Schema, model, Model } = require('mongoose');

const UsuarioSchema = Schema({

    nombre  : { type: String, required: true },
    email   : { type: String, required: true, unique: true },
    password: { type: String, required: true },
    img     : { type: String },
    role    : { type: String, required: true, default: 'OPERADOR_ROLE', enum: ['USER_ROLE', 'OPERADOR_ROLE', 'ADMIN_ROLE'] },
    google  : { type: Boolean, default: false },

});

UsuarioSchema.method( 'toJSON', function() {
    const { __v, password, ...object } = this.toObject();

    return object;
});

module.exports = model( 'Usuario', UsuarioSchema );