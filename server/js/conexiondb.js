import mongoose from "mongoose";
import dotenv from 'dotenv';
import Producto from '../schemas/productos.schema.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';

let cached = global.mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
    if (cached.conn) return cached.conn;

    if (!MONGODB_URI) throw new Error('MONGODB_URI is not defined');

    cached.promise = mongoose.connect(MONGODB_URI, {
        dbName: 'tienda',
        bufferCommands: false
    });

    cached.conn = await cached.promise;

    
    return cached.conn;
}