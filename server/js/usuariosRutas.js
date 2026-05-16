import {Router} from 'express';
import fs from 'fs';
const router = Router();

router.get('/:usuario', async (req, res) => {
    const { usuario } = req.params;
    const data = JSON.parse(fs.readFileSync('./server/json/usuarios.json', 'utf-8'));
    const user = data.usuarios.forEach(element => {
        if (element.usuario === usuario) {
            res.status(200).json(element);
            return;
        }
    });
});

export default router;