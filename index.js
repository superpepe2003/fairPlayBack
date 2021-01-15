const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { dbConnection } = require('./database/config');

// Crear el servidor
const app = express();

// Configurar el CORS
app.use(cors( { origin: true, credentials: true } ));

// Lectura del parseo del body
app.use( express.json() );

// Base de Datos
dbConnection();

// Rutas
app.use('/api/usuarios', require('./routes/usuarios_routes'));
app.use('/api/login', require('./routes/auth_routes'));
app.use('/api/productos', require('./routes/productos_routes'));
app.use('/api/categorias', require('./routes/categorias_routes'));
app.use('/api/clientes', require('./routes/clientes_routes'));
app.use('/api/ventas', require('./routes/ventas_routes'));
app.use('/api/turnos', require('./routes/turnos_routes'));
app.use('/api/search', require('./routes/busquedas_routes'));
app.use('/api/movimientos', require('./routes/movimientos_routes'));

app.listen( process.env.PORT, () => {
    console.log(`Servidor online puerto ${ process.env.PORT }`);
});