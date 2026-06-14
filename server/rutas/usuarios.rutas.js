import {Router} from 'express';
import fs from 'fs';
import {crearUsuario, obtenerUsuario, eliminarUsuario} from '../actions/usuarios.actions.js';
import {usuarioTieneVentas} from '../actions/ventas.actions.js';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { verificarToken } from '../js/verificacion.js';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 123456789;

const jsonParser = bodyParser.json();

const router = Router();

router.post('/login', jsonParser, async (req, res) => {
    const { user, password } = req.body;
    try {
        const usuario = await obtenerUsuario(user);
        if (!usuario) {
            res.status(404).json({ error: 'Usuario no encontrado' });
            return;
        }
        const passwordMatch = await bcrypt.compare(password, usuario.password);
        if (!passwordMatch) {
            res.status(401).json({ error: 'Contraseña incorrecta' });
            return;
        }
        const token = jwt.sign({ id: usuario._id }, JWT_SECRET, { expiresIn: 86400 });
        res.status(200).json(token);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
});

router.post('/add', jsonParser, async (req, res) => {
    const { user, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await crearUsuario(user, hashedPassword);
        if (result.error) {
            res.status(500).json(result);
            return;
        }
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
});

router.delete('/:id', verificarToken, async (req, res) => {
    const userId = req.params.id;
    try {
        const ventas = await usuarioTieneVentas(userId);
        if (ventas) {
            res.status(400).json({ error: 'No se puede eliminar el usuario porque tiene ventas asociadas' });
            return;
        }
        const result = await eliminarUsuario(userId);
        if (result.error) {
            res.status(500).json(result);
            return;
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
});

export default router;