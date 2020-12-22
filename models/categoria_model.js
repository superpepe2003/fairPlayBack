
const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({
    
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    descripcion: {
        type: String
    }

});

module.exports = model('Categoria', CategoriaSchema);