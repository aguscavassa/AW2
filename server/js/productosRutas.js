import { Router } from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';
const router = Router();
const jsonParser = bodyParser.json();

router.get('/all', (req, res) => {
  const data = JSON.parse(fs.readFileSync('./server/json/productos.json', 'utf-8'));
  res.json(data);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const data = JSON.parse(fs.readFileSync('./server/json/productos.json', 'utf-8'));
    const producto = data.productos.forEach(element => {
        if (element.id === parseInt(id)) {
            res.status(200).json(element);
            return;
        }
    });
});

router.post('/add', jsonParser, (req, res) => {
    console.log(req.body);
    const { nombre, precio } = req.body;
    if (!nombre || !precio) {
        res.status(400).json({ error: 'Faltan datos' });
        return;
    }
    const data = JSON.parse(fs.readFileSync('./server/json/productos.json', 'utf-8'));
    const newProducto = {
        id: data.productos.length + 1,
        nombre,
        precio
    };
    data.productos.push(newProducto);
    fs.writeFileSync('./server/json/productos.json', JSON.stringify(data));
    res.status(201).json(newProducto);
});

export default router;