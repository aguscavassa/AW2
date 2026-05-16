import {Router} from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';

const router = Router();
const jsonParser = bodyParser.json();

router.post('/add/:id', jsonParser, (req, res) => {
    const { productos } = req.body;
    if (!productos || !Array.isArray(productos)) {
        res.status(400).json({ error: 'Faltan datos' });
        return;
    }
    const data = JSON.parse(fs.readFileSync('./server/json/ventas.json', 'utf-8'));
    const newVenta = {
        id: data.ventas.length + 1,
        id_usuario: parseInt(req.params.id),
        fecha: new Date().toISOString(),
        efectivo: req.body.efectivo || false,
        productos
    };
    data.ventas.push(newVenta);
    fs.writeFileSync('./server/json/ventas.json', JSON.stringify(data));
    res.status(201).json(newVenta);
});

export default router;