import express from 'express';
import fs from 'fs';
import dotenv from 'dotenv';
import productosRutas from './js/productosRutas.js';
import usuariosRutas from './js/usuariosRutas.js';

dotenv.config();

const app = express();

app.get('/', (req, res) => {
  res.send('Hola! :D');
});

app.use('/api/productos', productosRutas);
app.use('/api/usuarios', usuariosRutas);

app.listen(process.env.PORT, () => {
  console.log(`Servidor en puerto ${process.env.PORT}!`);
});