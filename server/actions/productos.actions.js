import { connectToDatabase } from "../js/conexiondb.js";
import Producto from "../schemas/productos.schema.js";

export const crearProducto = async(nombre, categoria, desc, precio, imagen) => {
    try{
        await connectToDatabase();
        const res = await Producto.create({nombre, categoria, desc, precio, imagen});
        return JSON.parse(JSON.stringify(res));
    } catch (error) {
        console.error(error);
    }
}

export const obtenerProductos = async() =>  {
    try {
        await connectToDatabase();
        const res = await Producto.find();
        return JSON.parse(JSON.stringify(res));
    } catch (error) {
        console.error(error);
    }
}

export const obtenerProducto = async(id) => {
    try {
        await connectToDatabase();
        const res = await Producto.findById(id);
        return JSON.parse(JSON.stringify(res));
    } catch (error) {
        console.error(error);
    }
}

export const eliminarProducto = async(id) => {
    try {
        await connectToDatabase();
        const res = await Producto.findByIdAndDelete(id);
        return JSON.parse(JSON.stringify(res));
    } catch (error) {
        console.error(error);
    }
}

export const crearNuevosProductos = async() => {
    try {
        await connectToDatabase();
        const count = await Producto.countDocuments();
        if (count === 0) {
            await Producto.insertMany([
                {
                    "nombre": "Camiseta Tour",
                    "categoria": "Camisetas",
                    "desc": "Camiseta de algodón de alta calidad",
                    "precio": 19.99,
                    "imagen": "camisetatour.jpg",
                },
                {
                    "nombre": "Pantalones Vintage",
                    "categoria": "Pantalones",
                    "desc": "Pantalones vaqueros ajustados",
                    "precio": 39.99,
                    "imagen": "pantalonesvintage.webp",
                },
                {
                    "nombre": "Zapatillas Star",
                    "categoria": "Calzado",
                    "desc": "Zapatillas casuales cómodas",
                    "precio": 59.99,
                    "imagen": "zapatillasstar.webp",
                },
                {
                    "nombre": "Campera Urbana Style",
                    "categoria": "Camperas",
                    "desc": "Campera de estilo urbano",
                    "precio": 49.99,
                    "imagen": "camperaurbana.png",
                }
            ]);
        }
    } catch (error) {
        console.error(error);
    }
}