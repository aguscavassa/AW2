import { Router } from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';
import {crearProducto, obtenerProductos, obtenerProducto} from '../actions/productos.actions.js';
const router = Router();
const jsonParser = bodyParser.json();

router.get('/all', async (req, res) => {
    try {
        const productos = await obtenerProductos();
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const producto = await obtenerProducto(id);
        if (!producto) {
            res.status(404).json({ error: 'Producto no encontrado' });
            return;
        }
        res.status(200).json(producto);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
});

router.post('/add', jsonParser, async (req, res) => {
    console.log(req.body);
    const {nombre, categoria, desc, precio, imagen} = req.body;
    const result = await crearProducto(nombre, categoria, desc, precio, imagen);
    res.status(201).json(result);
});

export default router;