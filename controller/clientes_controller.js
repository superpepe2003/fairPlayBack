
const { response } = require("express");
const Cliente = require('../models/cliente_model');


const listarClientes = async(req, res = response ) => {

    const desde = Number(req.query.desde) || 0;
    const hasta = Number(req.query.hasta) || 5;

    try {

        const [clientesDB, total] = await Promise.all([
            Cliente.find({}).skip(desde).limit(hasta),
            Cliente.countDocuments()
        ]);

        res.json({
            ok: true,
            total: total,
            clientes: clientesDB
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        })
    }

}


const listarClientesTodos = async(req, res = response ) => {

    try {

        const [clientesDB, total] = await Promise.all([
            Cliente.find({}),
            Cliente.countDocuments()
        ]);

        res.json({
            ok: true,
            total: total,
            clientes: clientesDB
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        })
    }

}

const agregarCliente = async (req, res = response ) => {

    const body = req.body;

    console.log(body);

    try {

        const cliente = new Cliente( req.body );

        const ClienteDB = await cliente.save();

        res.json({
            ok: true,
            Cliente: ClienteDB
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador',
            errors: error
        })
    }

}

const modificarCliente = async(req, res = response ) => {

    const id = req.params.id;

    try {

        const ClienteDB = await Cliente.findById( id );

        if( !ClienteDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el cliente por ese id'
            });
        }

        console.log(req.body);

        clienteActualizada = await Cliente.findByIdAndUpdate( id, req.body, { new: true });

        console.log(clienteActualizada);
        res.json({
            ok: true,
            Cliente: clienteActualizada
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        })
    }

}

const eliminarCliente = async(req, res = response ) => {

    const id = req.params.id;

    try {
        
        const ClienteDB = await Cliente.findById( id );

        if( !ClienteDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el cliente por ese id'
            });
        }

        await Cliente.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Cliente Borrado'
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        })
    }

}

module.exports = {
    listarClientes,
    listarClientesTodos,
    agregarCliente,
    modificarCliente,
    eliminarCliente
}