
const { response } = require("express");
const Categoria = require('../models/categoria_model');


const listarCategorias = async(req, res = response ) => {

    try {

        categoriasDB = await Categoria.find({});

        res.json({
            ok: true,
            total: categoriasDB.length,
            categorias: categoriasDB
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        })
    }

}

const agregarCategoria = async (req, res = response ) => {

    const { nombre } = req.body;

    try {

        const existeCategoria = await Categoria.findOne({ nombre });

        if( existeCategoria ) {
            return res.status(400).json({
                ok: false,
                msg: 'Categoria ya existe'
            });
        }

        const categoria = new Categoria( req.body );

        const categoriaDB = await categoria.save();

        res.json({
            ok: true,
            categoria: categoriaDB
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        })
    }

}

const modificarCategoria = async(req, res = response ) => {

    const id = req.params.id;

    try {

        const categoriaDB = await Categoria.findById( id );

        if( !categoriaDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe la categoria por ese id'
            });
        }

        categoriaActualizada = await Categoria.findByIdAndUpdate( id, req.body, { new: true });

        res.json({
            ok: true,
            categoria: categoriaActualizada
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        })
    }

}

const eliminarCategoria = async(req, res = response ) => {

    const id = req.params.id;

    try {
        
        const categoriaDB = await Categoria.findById( id );

        if( !categoriaDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe la categoria por ese id'
            });
        }

        await Categoria.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Categoria Borrada'
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        })
    }

}

module.exports = {
    listarCategorias,
    agregarCategoria,
    modificarCategoria,
    eliminarCategoria
}