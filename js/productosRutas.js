import { Router } from 'express';
import fs from 'fs';
const router = Router();

router.get('/all', (req, res) => {
  const data = JSON.parse(fs.readFileSync('./json/productos.json', 'utf-8'));
  res.json(data);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const data = JSON.parse(fs.readFileSync('./json/productos.json', 'utf-8'));
    const producto = data.productos.forEach(element => {
        if (element.id === parseInt(id)) {
            res.status(200).json(element);
            return;
        }
    });
    res.status(404).json({ error: 'Producto no encontrado' });
});

router.post('/add', (req, res) => {
    console.log(req.body);
    const { nombre, precio } = req.body;
    if (!nombre || !precio) {
        res.status(400).json({ error: 'Faltan datos' });
        return;
    }
    const data = JSON.parse(fs.readFileSync('./json/productos.json', 'utf-8'));
    const newProducto = {
        id: data.productos.length + 1,
        nombre,
        precio
    };
    data.productos.push(newProducto);
    fs.writeFileSync('./json/productos.json', JSON.stringify(data));
    res.status(201).json(newProducto);
});

export default router;