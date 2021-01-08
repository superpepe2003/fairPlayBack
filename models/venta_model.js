
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
    productos: [
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
    ],
    turnos: [
        {
            turno: {
                type: Schema.Types.ObjectId,
                ref: 'Turno'
            },
            monto: {
                type: Number
            }
        }
    ]
});

module.exports = model('Venta', VentasSchema);