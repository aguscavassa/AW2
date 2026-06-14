import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 123456789;

export function verificarToken(req, res, next) {
    console.log(req.headers.authorization);
    jwt.verify(req.headers.authorization, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(401).json({ error: 'No autorizado' });
            return;
        }
        console.log('Token valido');
        res.locals.userId = decoded.id;
        next();
    });
}