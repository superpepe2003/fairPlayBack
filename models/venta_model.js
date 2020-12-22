
const { Schema, model } = require('mongoose');

const VentasSchema = Schema({
    fecha: {
        type: Date,
        required: true,
        default: new Date()
    },
    monto: {
        type: Number,
        required: true
    },
    detalle: [
        {
            cantidad: {
                type: Number
            },
            monto: {
                type: Number
            },
            producto: {
                type: Schema.Types.ObjectId,
                ref: 'Producto'
            }
        }
    ]
});

module.exports = model('Venta', VentasSchema);