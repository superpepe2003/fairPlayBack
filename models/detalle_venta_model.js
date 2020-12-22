
const { Schema, model } = require('mongoose');

const detalleVentaSchema = Schema({
    
    idVenta: {
        type: Schema.Types.ObjectId,
        ref: 'Venta'
    },
    idProducto: {
        type: Schema.Types.ObjectId,
        ref: 'Producto'
    },
    cantidad: {
        type: Number
    },
    precio: {
        type: Number
    }

});

module.exports = model('DetalleVenta', detalleVentaSchema );