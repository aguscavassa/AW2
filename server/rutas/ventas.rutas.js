import {Router} from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import { verificarToken } from '../js/verificacion.js';
import {crearVenta, eliminarVenta} from '../actions/ventas.actions.js';

const router = Router();
const jsonParser = bodyParser.json();

router.post('/add', jsonParser, verificarToken, async (req, res) => {
    let userId = res.locals.userId;
    const { productos, efectivo } = req.body;
    if (!productos || !Array.isArray(productos)) {
        res.status(400).json({ error: 'Faltan datos' });
        return;
    }
    const newVenta = await crearVenta(userId, productos, efectivo);
    res.status(201).json(newVenta);
});

router.delete('/:id', verificarToken, async (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ error: 'No se proporcionó el ID de la venta' });
        return;
    }
    const deletedVenta = await eliminarVenta(id);
    if (!deletedVenta) {
        res.status(404).json({ error: 'Venta no encontrada' });
        return;
    }
    res.status(200).json(deletedVenta);
});

export default router;