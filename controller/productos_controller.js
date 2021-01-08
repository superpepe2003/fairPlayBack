
const { response } = require('express');
const Producto = require('../models/producto_model');


const getProductos = async( req, res = response) => {

    const desde = Number(req.query.desde) || 0;
    const hasta = Number(req.query.hasta) || 5;

    try {

        const [productosDB, total] = await Promise.all([
                Producto.find({}).skip(desde).limit(hasta),
                Producto.countDocuments()
            ]);

        res.json({
            ok: true,
            total: total,
            productos: productosDB
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        });
    }
    
};

const listarPorCodigo = async( req, res = response) => {

    const codigo = req.params.codigo;

    try {

        const productosDB = await Producto.find({codBarra: codigo});

        res.json({
            ok: true,
            producto: productosDB[0]
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        });
    }

};

const crearProductos = async( req, res= response) => {

    const { codBarra } = req.body;

    try {

        const existeCodigoBarra =  await Producto.findOne({ codBarra });

        if( existeCodigoBarra ) {
            return res.status(400).json({
                ok: false,
                msg: 'Codigo de Barra ya existe'
            });
        }

        const producto =  new Producto( req.body );

        const productoDB = await producto.save();

        res.json({
            ok: true,
            producto: productoDB
        });
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Comuníquese con un Admin'
        });
    }

};

const modificarProductos = async( req, res = response) => {

    const id = req.params.id;

    try {

        const productoDB = await Producto.findById( id );

        if( !productoDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el producto por ese id'
            });
        }

        const productoActualizado =  await Producto.findByIdAndUpdate( id, req.body, { new: true });
        
        res.json({
            ok: true,
            producto: productoActualizado
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

};

const borrarProductos = async(req, res=response) => {

    const id = req.params.id;

    try {
        
        const productoDB = await Producto.findById( id );

        if( !productoDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el producto por ese id'
            });
        }

        await Producto.findByIdAndDelete( id );
        
        
         res.json({
             ok: true,
             msg: 'Producto Borrado'
         });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        });
    }

};


module.exports = {
    getProductos,
    listarPorCodigo,
    crearProductos,
    modificarProductos,
    borrarProductos
};