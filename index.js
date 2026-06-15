import express from 'express';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import productosRutas from './server/rutas/productos.rutas.js';
import usuariosRutas from './server/rutas/usuarios.rutas.js';
import ventasRutas from './server/rutas/ventas.rutas.js';

dotenv.config();

const app = express();

app.use(express.static(path.join(path.resolve(), '/web')));

app.use('/api/productos', productosRutas);
app.use('/api/usuarios', usuariosRutas);
app.use('/api/ventas', ventasRutas);

app.listen(process.env.PORT || 3000, async () => {
  await import('./server/actions/productos.actions.js').then(({ crearNuevosProductos }) => crearNuevosProductos());
  console.log(`Servidor en puerto ${process.env.PORT}!`);
});