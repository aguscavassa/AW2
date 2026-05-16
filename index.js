import express from 'express';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import productosRutas from './server/js/productosRutas.js';
import usuariosRutas from './server/js/usuariosRutas.js';
import ventasRutas from './server/js/ventasRutas.js';

dotenv.config();

const app = express();

app.use(express.static(path.join(path.resolve(), '/web')));

app.use('/api/productos', productosRutas);
app.use('/api/usuarios', usuariosRutas);
app.use('/api/ventas', ventasRutas);

app.listen(process.env.PORT, () => {
  console.log(`Servidor en puerto ${process.env.PORT}!`);
});