
const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({
    
    codBarra: {
        type: String, 
        unique: true
    },
    nombre: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String
    },
    pVenta: {
        type: Number,
        required: true
    },
    pCompra: {
        type: Number
    },
    stock: {
        type: Number
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria'
    },
});

ProductoSchema.method( 'toJSON', function (){

    const { __v, ...object } = this.toObject();
    return object;

});

module.exports = model('Producto', ProductoSchema);